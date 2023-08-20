import { styled } from "styled-components";
import Header from "../../components/Header/Header";
import Publication from "../../components/Publication/Publication";
import Posts from "../../components/Posts/Posts";
import apis from "../../services/apis";
import { useEffect, useState } from "react";

export default function Timeline() {
    const [timeline, setTimeline] = useState([]);
    const token = localStorage.getItem("userAuth")
        ? JSON.parse(localStorage.getItem("userAuth")).token
        : null;

    useEffect(() => {
        console.log(token);
        if (token) {
            apis.timeline(token)
                .then((data) => {
                    setTimeline(data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar timeline:", error);
                });
        }
    }, [token]);
    return (
        <ContainerTimeline>
            <Header />
            <TextTimeline>timeline</TextTimeline>
            <Publication />
            {timeline.map((post, index) => (
                <Posts key={index} post={post} />
            ))}
        </ContainerTimeline>
    );
}

const ContainerTimeline = styled.div `
  background-color: #333;
  min-height: calc(100vh - 72px); /* Use min-height em vez de height */
  padding-bottom: 20px; 
  margin-top: 72px;
`
const TextTimeline = styled.h1`
  padding: 20px;
  
  color: #FFF;
  font-family: Oswald;
  font-size: 33px;
  font-style: normal;
  font-weight: 700;
  line-height: normal; 
`
