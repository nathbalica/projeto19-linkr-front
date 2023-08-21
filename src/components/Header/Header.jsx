import avatar from "../../assets/abyssinian.jpg"
import { useState } from "react";
import { ContainerHeader, LogoName, UserContainer, ArrowIcon, Avatar, LogoutMenu } from "./style";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../../hooks/useAuth"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { userAuth } = useAuth()


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogoClick = () => {
        navigate("/timeline"); // Navigate to the timeline
    };

    return (
        <ContainerHeader>
            <LogoName onClick={handleLogoClick}>linkr</LogoName>
            <SearchBar token={userAuth.token} />
            <UserContainer>
                <ArrowIcon onClick={toggleMenu} />
                <Avatar src={avatar} />
            </UserContainer>
            {isMenuOpen && <LogoutMenu>Logout</LogoutMenu>}
        </ContainerHeader>
    )
}



