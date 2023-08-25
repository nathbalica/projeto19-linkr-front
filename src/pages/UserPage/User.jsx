import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import apis from "../../services/apis";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContainerHashtags, ContainerTimeline, ContainerContent, ContainerFeed, TextTimeline, LoadingContainer, NoPostsMessage } from "../TimelinePage/styles";
import { RotatingLines } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import Hashtags from "../../components/Hashtags/Hashtags";

export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user_id } = useParams();
    const {userAuth } = useAuth()
    
    async function getUserData(){
        setLoading(true);
        apis.getUser(user_id, userAuth.token)
            .then((res) => {
                const { username, profile_image, posts } = res.data;
                setUserData({ username, profile_image });
                setUserPosts(posts);
                setLoading(false);
            })
            .catch((error) => {
                setError("An error occurred while fetching user data.");
                setLoading(false);
            });
    };

    useEffect(() => {
        getUserData()
    }, [user_id, userAuth.token]);

    const updatePosts = () => {
        if(loading) {
            return;
        }
        setLoading(true);
        getUserData();
    };

    return (
        <ContainerTimeline>
            <Header />
            <ContainerContent>
                <ContainerFeed>
                    <TextTimeline>{userData.username}'s posts</TextTimeline>
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
                    ) : userPosts.length === 0 ? (
                        <NoPostsMessage>No posts for this user...</NoPostsMessage>
                    ) : (
                        userPosts.map((post, index) => (
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


