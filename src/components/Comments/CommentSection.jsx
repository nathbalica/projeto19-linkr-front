import apis from "../../services/apis";
import avatar from "../../assets/abyssinian.jpg"
import DeleteAlert from "../Alert/DeleteAlert";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { SlPaperPlane } from "react-icons/sl";

export default function CommentSection({ post_id, token, handleProfileClick }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    let profile_image;
    const stored = JSON.parse(localStorage.getItem("userAuth"));
    if (stored && stored.profile_image) {
        profile_image = stored.profile_image;
    } else {
        profile_image = avatar;
    }

    const fetchComments = async () => {
        const data = await apis.fetchComments(post_id, token);
        setComments(data);
        console.log(data);
    }

    useEffect(() => {
        fetchComments();
    }, [post_id, token]);

    const submitComment = async () => {
        if (newComment.trim() == "") {
            return;
        }
        try {
            await apis.postComment(post_id, token, newComment);
            setNewComment("");
            fetchComments();
        } catch(error) {
            console.error("Erro ao enviar comentário:", error);
        }
    }

    const typingComment = (event) => {
        setNewComment(event.target.value);
    };

    const pressEnter = (event) => {
        if (event.key === "Enter") {
            submitComment();
        }
    }

    return (
        <CommentsBox>
            {(comments && comments.length > 0) &&
                comments.map((c, index) => (
                    <CommentContainer key={index}>
                        <Comment>
                            <CommenterProfileImage src={c.commenter_profile_image} alt="Profile" />
                            <CommentContent>
                                <CommenterName>
                                    {c.commenter_name}
                                    {c.owner && <Author>{'\u00A0'}• post's author</Author>}
                                    {c.followed && <Following>{'\u00A0'}• following</Following>}
                                </CommenterName>
                                <CommentText>{c.content}</CommentText>
                            </CommentContent>
                        </Comment>
                        <Bar />
                    </CommentContainer>
                ))
            }
            <CommentInputContainer>
                <CommenterProfileImage src={profile_image} alt="Profile" />
                <CommentInputWrapper>
                    <CommentInput
                        type="text"
                        placeholder="write a comment..."
                        value={newComment}
                        onChange={typingComment}
                        onKeyDown={pressEnter}
                        hasText={newComment !== ''}
                    />
                    <SendIcon onClick={submitComment} />
                </CommentInputWrapper>
            </CommentInputContainer>
        </CommentsBox>
    )
}


const CommentsBox = styled.div`
    font-family: Lato;
    background-color: #1e1e1e;
    padding: 35px 20px 20px 20px;
    margin-top: -15px;
    border-radius: 0 0 13px 13px;
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 1;
`

const CommentInputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const CommentInputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border: 0;
    border-radius: 8px;
    background-color: #252525;
`;

const CommentInput = styled.input`
    flex: 1;
    border: 0;
    padding: 8px;
    font-family: Lato;
    font-size: 14px;
    font-weight: ${({ hasText }) => (hasText ? 'normal' : '400')};
    color: ${({ hasText }) => (hasText ? '#acacac' : '#575757')};
    background-color: #252525;
    outline: none;
    border-radius: 8px;
    &::placeholder {
        font-weight: 400;
        font-style: italic;
        color: #575757;
    }
`;

const SendIcon = styled(SlPaperPlane)`
    color: #f3f3f3;
    font-size: 15px;
    cursor: pointer;
    margin-right: 8px;
`;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Comment = styled.div`
    display: flex;
    align-items: flex-start;
`;

const CommenterProfileImage = styled.img`
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin-right: 15px;
    background-color: #ffffff; /* Cor de fundo caso a imagem tenha áreas transparentes */
    object-fit: cover; /* Garante que a imagem preencha o círculo */
`;

const CommentContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
`;

const CommenterName = styled.p`
    display: flex;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Author = styled.p`
    ::before {
        content: ' ';
    }
    color: #565656;
`
const Following = styled.p`
    ::before {
        content: ' ';
    }
    color: #565656;
`

const CommentText = styled.p`
    color: #acacac;
    font-size: 14px;
    margin-bottom: 5px;
`;

const Bar = styled.div`
    width: 100%;
    height: 1px;
    background-color: #353535;
    margin-top: 5px;
`;