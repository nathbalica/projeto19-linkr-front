import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { ContainerHashtags, ContainerTimeline, ContainerContent, ContainerFeed, TextTimeline, LoadingContainer, NoPostsMessage } from "../TimelinePage/styles";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Posts from "../../components/Posts/Posts"; // Assuming the Posts component import
import apis from "../../services/apis";
import useAuth from "../../hooks/useAuth";
import Hashtags from "../../components/Hashtags/Hashtags";

export default function HashtagPage() {
    const { hashtag } = useParams(); // Get the hashtag from the URL parameter
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const { userAuth } = useAuth()

    console.log(userAuth.token)

    useEffect(() => {
        async function fetchPostsByHashtag() {
            setLoading(true);
            setError(null);

            try {

                const res = await apis.getPostTags(hashtag, userAuth.token);
                setTimeline(res.data); // Assuming the response data is the array of posts
            } catch (error) {
                console.error("Error fetching posts by hashtag:", error);
                setError("An error occurred while fetching posts.");
            } finally {
                setLoading(false);
            }
        }

        fetchPostsByHashtag();
    }, [hashtag, userAuth.token]);

    return (
        <ContainerTimeline>
            <Header />
            <ContainerContent>
                <ContainerFeed>
                    <TextTimeline>#{hashtag}</TextTimeline>
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
                    ) : error ? (
                        <NoPostsMessage>{error}</NoPostsMessage>
                    ) : timeline.length === 0 ? (
                        <NoPostsMessage>No posts for this hashtag...</NoPostsMessage>
                    ) : (
                        timeline.map((post, index) => (
                            <Posts key={index} post={post} />
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
