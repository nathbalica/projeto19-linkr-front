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

export default function Timeline() {
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { userAuth } = useAuth()

    // const token = localStorage.getItem("userAuth")
    //     ? JSON.parse(localStorage.getItem("userAuth")).token
    //     : null;

    useEffect(() => {
        if (userAuth.token) {
            async function getTimeline() {
                apis.timeline(userAuth.token)
                    .then((data) => {
                        setTimeline(data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar timeline:", error);
                        setLoading(false);
                        setError(true);
                    });
            };
            getTimeline();
        }
    }, [userAuth.token]);

    const updatePosts = () => {
        setLoading(true);
        getTimeline();
    };

    const getTimeline = () => {
        apis.timeline(userAuth.token)
            .then((data) => {
                setTimeline(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar timeline:", error);
                setLoading(false);
                setError(true);
            });
    };

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
  width: 350px;
}
@media screen and (min-width: 768px) {
   display: none;
}
 `
