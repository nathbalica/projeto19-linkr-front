import { styled } from "styled-components";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import apis from "../../services/apis";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HashtagPage() {
    const [userData, setData] = useState({});
    const [userPosts, setPosts] = useState([]);
    const { user_id } = useParams();

    useEffect(() => {
        apis.getUser(user_id)
            .then((res) => {
                const { username, profile_image, posts } = res.data;
                console.log(res.data);
                setData({ username, profile_image });
                setPosts(posts);
            })
            .catch((error) => {
                console.error("Erro ao buscar posts do usuario:", error);
            });
    }, [user_id]);
    return (
        <ContainerTimeline>
            <Header />
            <TextTimeline>{userData.username}'s posts</TextTimeline>
            {userPosts.length > 0 ? (
                userPosts.map((post, index) => (
                    <Posts key={index} post={post} />
                ))
            ) : (
                <div>Usuário ainda não publicou nada...</div>
            )}
        </ContainerTimeline>
    );
}

const ContainerTimeline = styled.div`
    background-color: #333;
    min-height: 100vh; /* Use min-height em vez de height */
    padding-bottom: 20px;
`;
const TextTimeline = styled.h1`
    padding: 20px;
    color: #fff;
    font-family: Oswald;
    font-size: 33px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
