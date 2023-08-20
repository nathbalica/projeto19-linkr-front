import { styled } from "styled-components";
import { Helmet } from "react-helmet-async";
import { BsPencilFill } from "react-icons/bs";
import { IoHeartOutline, IoHeart, IoTrash } from "react-icons/io5";
import apis from "../../services/apis";
import DeleteAlert from "../Alert/Alert";
import React, { useState } from "react";

export default function Posts({ post, updatePosts }) {
    const [showAlert, setShowAlert] = useState(false);
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

    function sendRequest(id, token) {
        if (token) {
            apis.deletePost(id, token)
                .then(() => {
                    updatePosts();
                })
                .catch((error) => {
                    console.error("Não foi possível apagar post:", error);
                });
        }
    }

    return (
        <ContainerPosts>
            {showAlert && (
                <DeleteAlert
                    closeAlert={closeAlert}
                    sendRequest={() => sendRequest(post.id, token)}
                    token={token}
                    post_id={post.id}
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
                    <NameUser>{post.username}</NameUser>
                    <DeleteIcon onClick={clickDelete} />
                </Title>
                <PostDescription>{post.content}</PostDescription>

                <LinkPost>{post.link}</LinkPost>
            </Content>
        </ContainerPosts>
    );
}

const ContainerPosts = styled.div`
    height: auto;
    display: flex;
    background: #171717;
    padding: 15px;
    margin-bottom: 20px;
    flex-shrink: 0;
    @media screen and (min-width: 768px) {
        width: 100%;
        height: 276px;
        border-radius: 16px;
    }
`;

const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 15px;
`;

const Title = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DeleteIcon = styled(IoTrash)`
    color: white;
    cursor: pointer;
    font-size: 20px;
`;

const HeartIconOutline = styled(IoHeartOutline)`
    color: white;
    margin-top: 17px;
    font-size: 20px;
    cursor: pointer;
`;

const HeartIconFull = styled(IoHeart)`
    color: red;
    margin-top: 17px;
    font-size: 20px;
    cursor: pointer;
`;

const Likes = styled.p`
    color: #fff;
    text-align: center;
    font-family: Lato;
    font-size: 9px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
`;

const NameUser = styled.h2`
    color: #fff;
    font-family: Lato;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const PostDescription = styled.p`
    margin-top: 10px;
    color: #b7b7b7;
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const LinkPost = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 115px;
    background: blue;
    border-radius: 11px;
    border: 1px solid #4d4d4d;
    background: rgba(196, 196, 196, 0);
`;

const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff; /* Cor de fundo caso a imagem tenha áreas transparentes */
    object-fit: cover; /* Garante que a imagem preencha o círculo */
`;
