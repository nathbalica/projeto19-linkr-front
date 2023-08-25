import apis from "../../services/apis";
import DeleteAlert from "../Alert/DeleteAlert";
import RepostAlert from "../Alert/RepostAlert";
import CommentSection from "../Comments/CommentSection";
import React, { useState, useEffect } from "react";
import { HashtagLink } from "./styles";
import {
    Body,
    ContainerPosts,
    EditBoxContainer,
    Perfil,
    HeartIconOutline,
    HeartIconFull,
    Likes,
    CommentsCount,
    CommentsIcon,
    RepostBar,
    RepostBarIcon,
    ShareCount,
    ShareIcon,
    Content,
    NameUser,
    PostDescription,
    LinkPost,
    Avatar,
    Title,
    PostButtons,
    DeleteIcon,
    EditIcon,
    TextAreaContent,
    LoadingContainer,
    Articles,
    MetaDataInfos,
    MetaDataImage,
} from "./styles";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import reactStringReplace from "react-string-replace";

export default function Posts({ post }) {
    const [postData, setPostData] = useState(post);
    const [metaData, setMetaData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);
    const [showRepost, setShowRepost] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedContent, setEditedContent] = useState("");
    
    const [showComments, setShowComments] = useState(false);

    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    const handleProfileClick = () => {
        navigate(`/user/${postData.user_id}`); // Navigate to the user's profile
    };

    useEffect(() => {
        if (postData.link) {
            setLoading(true);
            apis.getMetaData(postData.link)
                .then((res) => {
                    if (res) {
                        setMetaData({
                            title: res.title || "",
                            description: res.description || "",
                            images:
                                res.images && res.images.length > 0
                                    ? res.images[0]
                                    : "",
                            url: postData.link,
                        });
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [postData.link]);

    function closeDelete() {
        setShowDelete(false);
        return;
    };

    function closeRepost() {
        setShowRepost(false);
        return;
    }

    function clickRepost() {
        setShowRepost(true);
        return;
    }

    function clickDelete() {
        setShowDelete(true);
        return;
    }

    function toggleLike(id, liked) {
        if (token) {
            if (liked) {
                apis.dislike(id, token).then(newCount => {
                    setPostData(prevData => ({
                        ...prevData,
                        like_count: newCount,
                        liked: false
                    }));
                }).catch(error => {
                    console.error("Error disliking post:", error);
                });
            } else {
                apis.like(id, token).then(newCount => {
                    setPostData(prevData => ({
                        ...prevData,
                        like_count: newCount,
                        liked: true
                    }));
                }).catch(error => {
                    console.error("Error liking post:", error);
                });
            }
        }
    }

    const toggleEdit = () => {
        setIsEditOpen(!isEditOpen);
        if (!isEditOpen) {
            setEditedContent(postData.content);
        }
    };

    const toggleComments = async (post_id) => {
        setShowComments(!showComments);
    }

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    const sendEdit = () => {
        if (editedContent.trim() === "") {
            return;
        }
        if (token) {
            apis.editPost(postData.id, editedContent, token)
                .then(() => {
                    setIsEditOpen(false);
                    updatePost();
                })
                .catch((error) => {
                    console.error("Erro ao editar post:", error);
                });
        }
    };

    const updatePost = async () => {
        setLoading(true);
        try { 
            const data = await apis.getPost(postData.id, token)
            const newData = {
                repost: postData.repost,
                repost_by_me: postData.repost_by_me,
                created_at: postData.created_at,
                ...data
            }
            setPostData(newData);
            setLoading(false);
            console.log(newData);
        } catch (error) {
            console.error("Erro ao buscar timeline:", error);
            setLoading(false);
        };
    };

    const pressEnter = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendEdit();
        }
    };

    const pressEsc = (event) => {
        if (event.key === "Escape") {
            setIsEditOpen(false);
            setEditedContent(postData.content);
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", pressEsc);
        return () => {
            document.removeEventListener("keydown", pressEsc);
        };
    }, []);

    return (
        <Body>
            {postData.repost && (
                <RepostBar>
                    <RepostBarIcon />
                    <p>Re-posted by 
                        <span style={{ fontWeight: "bold" }}>
                            {'\u00A0'}{postData.repost_by_me ? "you" : postData.reposter_username}
                        </span>
                    </p>
                </RepostBar>
            )}
            <ContainerPosts data-test="post">
                {showDelete && (
                    <DeleteAlert
                        closeDelete={closeDelete}
                        token={token}
                        post_id={postData.id}
                        updatePost={updatePost}
                    />
                )}
                {showRepost && (
                    <RepostAlert
                        closeRepost={closeRepost}
                        token={token}
                        post_id={postData.id}
                        updatePost={updatePost}
                    />
                )}
                <Perfil>
                    <Avatar src={postData.profile_image} onClick={handleProfileClick} />
                    {postData.liked ? (
                        <HeartIconFull
                            onClick={() => toggleLike(postData.id, postData.liked)}
                        />
                    ) : (
                        <HeartIconOutline
                            onClick={() => toggleLike(postData.id, postData.liked)}
                        />
                    )}
                    <Likes>
                        {postData.like_count} {postData.like_count == 1 ? "like" : "likes"}
                    </Likes>
                    <CommentsIcon onClick={() => toggleComments(postData.id)}/>
                    <CommentsCount>
                        {postData.comments_count} {postData.comments_count == 1 ? "comment" : "comments"}
                    </CommentsCount>
                    <ShareIcon 
                        onClick={clickRepost}
                        data-test="repost-btn"
                    />
                    <ShareCount>
                        {postData.repost_count} {postData.repost_count == 1 ? "re-post" : "re-posts"}
                    </ShareCount>
                </Perfil>
                <Content>
                    <Title>
                        <NameUser data-test="username" onClick={handleProfileClick}>
                            {postData.username}
                        </NameUser>
                        {postData.owned && (
                            <PostButtons>
                                <EditIcon
                                    onClick={toggleEdit}
                                    data-test="edit-btn"
                                />
                                <DeleteIcon
                                    onClick={clickDelete}
                                    data-test="delete-btn"
                                />
                            </PostButtons>
                        )}
                    </Title>
                    {isEditOpen ? (
                        <EditBoxContainer>
                            <TextAreaContent
                                value={editedContent}
                                onChange={handleContentChange}
                                cols={50}
                                onKeyDown={pressEnter}
                                data-test="edit-input"
                                autoFocus
                            />
                        </EditBoxContainer>
                    ) : (
                        <PostDescription data-test="description">
                            {reactStringReplace(postData.content, /(#\w+)/g, (match, i) => (
                                <span className="hashtag" key={i}>
                                <HashtagLink to={`/hashtag/${match.slice(1)}`}>{match}</HashtagLink>
                            </span>
                            ))}
                        </PostDescription>
                    )}

                    {loading ? (
                        <LoadingContainer>
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="48"
                                visible={true}
                            />
                        </LoadingContainer>
                    ) : (
                        <LinkPost data-test="link">
                            {metaData && (
                                <a
                                    href={metaData.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Articles>
                                        <MetaDataInfos>
                                            <h2>
                                                {metaData.title.length >
                                                    (window.innerWidth >= 768
                                                        ? 114
                                                        : 70)
                                                    ? metaData.title.substring(
                                                        0,
                                                        window.innerWidth >= 768
                                                            ? 114
                                                            : 70
                                                    ) + "..."
                                                    : metaData.title}
                                            </h2>
                                            <h3>
                                                {metaData.description.length >
                                                    (window.innerWidth >= 768
                                                        ? 240
                                                        : 120)
                                                    ? metaData.description.substring(
                                                        0,
                                                        window.innerWidth >= 768
                                                            ? 240
                                                            : 120
                                                    ) + "..."
                                                    : metaData.description}
                                            </h3>
                                            <p>
                                                {metaData.url.length >
                                                    (window.innerWidth >= 768
                                                        ? 200
                                                        : 80)
                                                    ? metaData.url.substring(
                                                        0,
                                                        window.innerWidth >= 768
                                                            ? 200
                                                            : 80
                                                    ) + "..."
                                                    : metaData.url}
                                            </p>
                                        </MetaDataInfos>
                                        {metaData.images && (
                                            <MetaDataImage>
                                                <img
                                                    alt="a"
                                                    src={metaData.images}
                                                />
                                            </MetaDataImage>
                                        )}
                                    </Articles>
                                </a>
                            )}
                        </LinkPost>
                    )}
                </Content>
            </ContainerPosts>
            {showComments && (
                <CommentSection 
                    post_id={postData.id}
                    token={token}
                    handleProfileClick={handleProfileClick}
                />
            )}
        </Body>
    );
}