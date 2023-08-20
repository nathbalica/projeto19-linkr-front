import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Publication from "../../components/Publication/Publication";
import Posts from "../../components/Posts/Posts";
import apis from "../../services/apis";
import useAuth from "../../hooks/useAuth";
import {
    ContainerTimeline,
    TextTimeline,
    NoPostsMessage,
    ContainerFeed,
    ContainerHashtags,
    ContainerContent,
} from "./styles"; // Importe o ContainerHashtags
import Hashtags from "../../components/Hashtags/Hashtags";
import { Helmet } from "react-helmet";

export default function Timeline() {
    const [timeline, setTimeline] = useState([]);
    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    useEffect(() => {
        if (token) {
            getTimeline();
        }
    }, [token]);

    const updatePosts = () => {
        getTimeline();
    };

    const getTimeline = () => {
        apis.timeline(token)
            .then((data) => {
                setTimeline(data);
            })
            .catch((error) => {
                console.error("Erro ao buscar timeline:", error);
            });
    };

    return (
        <ContainerTimeline>
            <Header />
            <ContainerContent>
                <ContainerFeed>
                    <TextTimeline>timeline</TextTimeline>
                    <Publication />
                    {timeline.length === 0 ? (
                        <NoPostsMessage>
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
