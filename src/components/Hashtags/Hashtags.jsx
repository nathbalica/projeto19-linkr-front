import { styled } from "styled-components"

export default function Hashtags() {
    return (
        <ContainerTrending>
            <HeaderTags>
                trending
            </HeaderTags>

            <TrendingsText>
                <Tag># javascript</Tag>
                <Tag># react</Tag>
                <Tag># react-native</Tag>
                <Tag># material</Tag>
                <Tag># web-dev</Tag>
                <Tag># mobile</Tag>
                <Tag># css</Tag>
                <Tag># html</Tag>
                <Tag># node</Tag>
                <Tag># sql</Tag>
            </TrendingsText>

        </ContainerTrending>
    )
}

const ContainerTrending = styled.div`
@media screen and (min-width: 768px) {
    width: 301px;
    height: 100%;
    
}
    
`

const TrendingsText = styled.div`
    color: white;
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
`;