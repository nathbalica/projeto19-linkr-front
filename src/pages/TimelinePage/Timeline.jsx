import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Publication from "../../components/Publication/Publication";
import Posts from "../../components/Posts/Posts";
import apis from "../../services/apis";
import useAuth from "../../hooks/useAuth";
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


export default function Timeline() {
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    useEffect(() => {
        if (token) {
            getTimeline();
        }
    }, [token]);

    const updatePosts = () => {
        setLoading(true);
        getTimeline();
    };

    const getTimeline = () => {
        apis.timeline(token)
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
                        <NoPostsMessage>An error occurred while trying to fetch the posts, please refresh the page</NoPostsMessage>
                    ) : timeline.length === 0 ? (
                        <NoPostsMessage>There are no posts yet...</NoPostsMessage>
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


