import avatar from "../../assets/abyssinian.jpg"
import { useState } from "react";
import { ContainerHeader, LogoName, UserContainer, ArrowIcon, Avatar, LogoutMenu} from "./style";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <ContainerHeader>
            <LogoName>linkr</LogoName>
            <UserContainer>
                <ArrowIcon onClick={toggleMenu} />
                <Avatar src={avatar} />
            </UserContainer>
            {isMenuOpen && <LogoutMenu>Logout</LogoutMenu>}
        </ContainerHeader>
    )
}



