import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Publication from "../../components/Publication/Publication";
import Posts from "../../components/Posts/Posts";
import apis from "../../services/apis";
import { RotatingLines } from "react-loader-spinner";
import {
    ContainerTimeline,
    TextTimeline,
    NoPostsMessage,
    ContainerFeed,
    ContainerHashtags,
    ContainerContent,
    LoadingContainer,
} from "./styles"; // Importe o ContainerHashtags
import Hashtags from "../../components/Hashtags/Hashtags";
import useAuth from "../../hooks/useAuth";
import SearchBar from "../../components/Header/SearchBar"
import { styled } from "styled-components";
import useInterval from 'use-interval';

export default function Timeline() {
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { userAuth } = useAuth()
    const [newPostsCount, setNewPostsCount] = useState(0);
    const [lastChecked, setLastChecked] = useState(new Date().toISOString());
    const [accumulatedNewPosts, setAccumulatedNewPosts] = useState([]);

    const getTimeline = async () => {
        try {
            const data = await apis.timeline(userAuth.token);
            setTimeline(data);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar timeline:", error);
            setLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        if (userAuth.token) {
            getTimeline();
        }
    }, [userAuth.token]);

    const updatePosts = () => {
        setLoading(true);
        setTimeline([...accumulatedNewPosts, ...timeline]);
        setAccumulatedNewPosts([]);
        setLoading(false);
        setNewPostsCount(0);
        setLastChecked(new Date().toISOString());
    };
    console.log(lastChecked)
    const checkForNewPosts = () => {
        apis.newPostsCount(userAuth.token, { lastChecked: lastChecked })
            .then((response) => {
                console.log("Count from server:", response);
                setNewPostsCount(response);

                if (response > 0) {
                    apis.getNewPosts(userAuth.token, { lastChecked: lastChecked })
                        .then((newPosts) => {
                            setAccumulatedNewPosts(newPosts);
                        })
                        .catch((error) => {
                            console.error("Erro ao buscar novos posts:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Erro ao verificar novos posts:", error);
            });
    };

    useInterval(checkForNewPosts, 15000);


    return (
        <ContainerTimeline>
            <Header />
            <ContainerContent>
                <ContainerFeed>
                    <SearchContainer>
                        <SearchBar token={userAuth.token} />
                    </SearchContainer>
                    <TextTimeline>timeline</TextTimeline>

                    <Publication updatePosts={updatePosts} />

                    {newPostsCount > 0 && (
                        <NewPostsButton onClick={updatePosts}>
                            {newPostsCount} new post(s). Click to load.
                        </NewPostsButton>
                    )}
                    {loading ? (
                        <LoadingContainer>
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="60"
                                visible={true}
                            />
                        </LoadingContainer>
                    ) : error ? ( // Display an error message when there's an error
                        <NoPostsMessage>
                            An error occurred while trying to fetch the posts,
                            please refresh the page
                        </NoPostsMessage>
                    ) : timeline.length === 0 ? (
                        <NoPostsMessage data-test="message">
                            There are no posts yet...
                        </NoPostsMessage>
                    ) : (
                        timeline.map((post, index) => (
                            <Posts
                                key={index}
                                post={post}
                                updatePosts={updatePosts}
                            />
                        ))
                    )}
                </ContainerFeed>

                <ContainerHashtags>
                    <Hashtags />
                </ContainerHashtags>
            </ContainerContent>
        </ContainerTimeline>
    );
}

const SearchContainer = styled.div`

@media screen and (max-width: 767px) {
  width: 100%;
  padding: 10px;
}
@media screen and (min-width: 768px) {
   display: none;
}
 `

const NewPostsButton = styled.button`
@media screen and (min-width: 768px) {
    width: 100%;
    margin: 15px 0;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #4a90e2;  // Cor de fundo azul
    color: white;  // Cor do texto branco
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #357ab7;  // Um azul mais escuro para o hover
    }
}
`;
