import avatar from "../../assets/abyssinian.jpg"
import { useState } from "react";
import { ContainerHeader, LogoName, UserContainer, ArrowIcon, Avatar, LogoutMenu } from "./style";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogoClick = () => {
        navigate("/timeline"); // Navigate to the timeline
    };

    return (
        <ContainerHeader>
            <LogoName onClick={handleLogoClick}>linkr</LogoName>
            <UserContainer>
                <ArrowIcon onClick={toggleMenu} />
                <Avatar src={avatar} />
            </UserContainer>
            {isMenuOpen && <LogoutMenu>Logout</LogoutMenu>}
        </ContainerHeader>
    )
}



