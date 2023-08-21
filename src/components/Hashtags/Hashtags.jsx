import { styled } from "styled-components"
import { useEffect, useState } from "react";
import apis from "../../services/apis";
import { Link } from 'react-router-dom';


export default function Hashtags() {
    const [trendingHashtags, setTrendingHashtags] = useState([]);

    useEffect(() => {
        fetchTrendingHashtags();
    }, []);

    async function fetchTrendingHashtags() {
        try {
            const hashtags = await apis.getHashtags();
            setTrendingHashtags(hashtags);
        } catch (error) {
            console.error("Error fetching trending hashtags:", error);
        }
    }

    return (
        <ContainerTrending >
            <HeaderTags>trending</HeaderTags>
            <TrendingsText data-test="hashtag">
                {trendingHashtags.map((hashtag, index) => (
                    <Link key={index} to={`/hashtag/${hashtag.name.substring(1)}`}>
                        <Tag>{hashtag.name}</Tag>
                    </Link>
                ))}
            </TrendingsText>
        </ContainerTrending>
    );
}


const ContainerTrending = styled.div`
@media screen and (min-width: 768px) {
    width: 301px;
    height: 100%;
    
}
    
`
const TrendingsText = styled.div`
    background: #171717;
    border-top: 1px solid #484848; /* Adiciona o risco cinza de separação */
    padding-top: 10px; 
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    padding: 10px;
`

const HeaderTags = styled.div`
    color: #FFF;
    font-family: Oswald;
    font-size: 27px;
    font-style: normal;
    font-weight: 700;
    line-height: normal; 
    background: #171717;
    padding: 10px;

    border-top-right-radius: 16px;
    border-top-left-radius: 16px;
`

const Tag = styled.div`
  line-height: 1.5; /* Ajuste o espaçamento vertical entre as tags */
  cursor: pointer;
  color: white;
`;