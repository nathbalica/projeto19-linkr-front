import { styled } from "styled-components"
import Header from "../../components/Header/Header"
import Publication from "../../components/Publication/Publication"
import Posts from "../../components/Posts/Posts"

export default function Timeline() {
  

  return (
    <ContainerTimeline>
      <Header />
      <TextTimeline>timeline</TextTimeline>
      <Publication />
      <Posts />
      <Posts />
    </ContainerTimeline>
  )
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