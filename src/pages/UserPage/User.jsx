import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import apis from "../../services/apis";
import { ContainerTimeline, ContainerContent, ContainerFeed, TextTimeline, LoadingContainer, NoPostsMessage } from "../TimelinePage/styles";
import { RotatingLines } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import Hashtags from "../../components/Hashtags/Hashtags";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";

export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user_id } = useParams();
    const { userAuth } = useAuth()

    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    const isOwnProfile = userAuth.id === Number(user_id);

    useEffect(() => {
        async function getUserData() {
            setLoading(true);
            try {
                const res = await apis.getUser(user_id, userAuth.token);
                const { username, profile_image, posts } = res.data;
                setUserData({ username, profile_image });
                setUserPosts(posts); // Update userPosts state
            } catch (error) {
                setError("An error occurred while fetching user data.");
            }
            setLoading(false);
        }
        getUserData();
    }, [user_id, userAuth.token]);

    useEffect(() => {
        async function checkFollowingStatus() {
            try {
                const response = await apis.isFollowingUser(user_id, userAuth.token);
                setIsFollowing(response);
            } catch (error) {
                console.error("Error checking follow status:", error);
            }
        }

        checkFollowingStatus();
    }, [user_id, userAuth.token]);

    const handleFollowToggle = async () => {
        setFollowLoading(true);
        try {
            if (isFollowing) {
                await apis.unfollowUser(user_id, userAuth.token);
            } else {
                const response = await apis.followUser(user_id, userAuth.token);

                if (response.status === 400) {
                    alert(response.data.error); // Mostra mensagem de erro do backend.
                    setFollowLoading(false);
                    return;
                }
            }
            setIsFollowing(!isFollowing);
        } catch (error) {
            alert('Não foi possível executar a operação.');
        } finally {
            setFollowLoading(false);
        }
    };

    const updatePosts = async () => {
        setLoading(true);
        try {
            const res = await apis.getUser(user_id, userAuth.token);
            const { username, profile_image, posts } = res.data;
            setUserData({ username, profile_image });
            setUserPosts(posts); // Update userPosts state
        } catch (error) {
            setError("An error occurred while fetching user data.");
        }
        setLoading(false);
    };

    return (
        <ContainerTimeline>
            <Header />
            <ContainerContent>
                <ContainerFeed>
                    <ContainerUser>
                        <TextTimeline>{userData.username}'s posts</TextTimeline>
                    </ContainerUser>
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

                <UserFollow hasButton={!isOwnProfile}>
                    {!isOwnProfile && (
                        <FollowButton
                            $isFollowing={isFollowing}
                            onClick={handleFollowToggle}
                            disabled={followLoading}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </FollowButton>
                    )}
                    <Hashtags />
                </UserFollow>
            </ContainerContent>
        </ContainerTimeline>
    );
}

const UserFollow = styled.div`
    display: none;
    @media screen and (min-width: 768px) {
        min-height: 406px; /* Pode ajustar conforme necessário */
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-top: ${props => props.hasButton ? "61px" : "134px"};
    }

`
const ContainerUser = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FollowButton = styled.button`
    @media screen and (max-width: 768px) {
    display: none;
    }
    @media screen and (min-width: 768px) {
        width: 112px;
        height: 31px;
        background-color: ${props => props.$isFollowing ? "#FFF" : "#1877F2"};
        color: ${props => props.$isFollowing ? "#1877F2" : "#FFF"};
        padding: 5px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: ${props => props.$isFollowing ? "#E6E6E6" : "#1458B2"};
            color: ${props => props.$isFollowing ? "#1458B2" : "#FFF"};
        }

        &:disabled {
            background-color: #B0B0B0; /* Cinza para estado desabilitado */
            cursor: not-allowed;
        }
        margin-bottom: 42px;
    }
`