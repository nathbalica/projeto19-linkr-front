import { Helmet } from "react-helmet-async";
import apis from "../../services/apis";
import DeleteAlert from "../Alert/DeleteAlert";
import React, { useState } from "react";
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
} from "./style";

export default function Posts({ post, updatePosts }) {
    console.log(post);
    const [showAlert, setShowAlert] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedContent, setEditedContent] = useState("");

    const closeAlert = () => {
        setShowAlert(false);
        return;
    };
    function clickDelete() {
        setShowAlert(true);
        return;
    }

    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

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
                {isEditOpen && (
                    <EditBoxContainer>
                        <TextAreaContent
                            value={editedContent}
                            onChange={handleContentChange}
                            cols={50}
                            onKeyDown={pressEnter}
                            autoFocus
                        />
                    </EditBoxContainer>
                )}
                <PostDescription data-test="description">
                    {post.content}
                </PostDescription>

                <LinkPost data-test="link">{post.link}</LinkPost>
            </Content>
        </ContainerPosts>
    );
}
