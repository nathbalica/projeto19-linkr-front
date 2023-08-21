import apis from "../../services/apis";
import DeleteAlert from "../Alert/DeleteAlert";
import React, { useState, useEffect } from "react";
import {
    ContainerPosts,
    EditBoxContainer,
    Perfil,
    HeartIconOutline,
    HeartIconFull,
    Likes,
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

export default function Posts({ post, updatePosts }) {
    const [metaData, setMetaData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    useEffect(() => {
        if (post.link) {
            setLoading(true);
            apis.getMetaData(post.link)
                .then((res) => {
                    if (res) {
                        setMetaData({
                            title: res.title || "",
                            description: res.description || "",
                            images:
                                res.images && res.images.length > 0
                                    ? res.images[0]
                                    : "",
                            url: post.link,
                        });
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [post.link]);

    const closeAlert = () => {
        setShowAlert(false);
        return;
    };
    function clickDelete() {
        setShowAlert(true);
        return;
    }

    function toggleLike(id, liked) {
        if (token) {
            if (liked) {
                apis.dislike(id, token).then(() => {
                    updatePosts();
                });
            } else {
                apis.like(id, token).then(() => {
                    updatePosts();
                });
            }
        }
    }

    const toggleEdit = () => {
        setIsEditOpen(!isEditOpen);
        if (!isEditOpen) {
            setEditedContent(post.content);
        }
    };

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    const sendEdit = () => {
        if (editedContent.trim() === "") {
            return;
        }
        if (token) {
            apis.editPost(post.id, editedContent, token)
                .then(() => {
                    setIsEditOpen(false);
                    updatePosts();
                })
                .catch((error) => {
                    console.error("Erro ao editar post:", error);
                });
        }
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
            setEditedContent(post.content);
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", pressEsc);
        return () => {
            document.removeEventListener("keydown", pressEsc);
        };
    }, []);

    return (
        <ContainerPosts data-test="post">
            {showAlert && (
                <DeleteAlert
                    closeAlert={closeAlert}
                    token={token}
                    post_id={post.id}
                    updatePosts={updatePosts}
                />
            )}
            <Perfil>
                <Avatar src={post.profile_image} />
                {post.liked ? (
                    <HeartIconFull
                        onClick={() => toggleLike(post.id, post.liked)}
                    />
                ) : (
                    <HeartIconOutline
                        onClick={() => toggleLike(post.id, post.liked)}
                    />
                )}
                <Likes>
                    {post.like_count} {post.like_count === 1 ? "like" : "likes"}
                </Likes>
            </Perfil>
            <Content>
                <Title>
                    <NameUser data-test="username">{post.username}</NameUser>
                    {post.owned && (
                        <PostButtons>
                            <EditIcon onClick={toggleEdit} />
                            <DeleteIcon onClick={clickDelete} />
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
                            autoFocus
                        />
                    </EditBoxContainer>
                ) : (
                    <PostDescription data-test="description">
                        {post.content}
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
                    <LinkPost>
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
    );
}
