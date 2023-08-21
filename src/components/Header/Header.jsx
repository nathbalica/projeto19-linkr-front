import avatar from "../../assets/abyssinian.jpg"
import { useState, useEffect, useRef } from "react";
import { ContainerHeader, LogoName, UserContainer, ArrowUp, ArrowDown, Avatar, LogoutMenu } from "./style";

import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import useAuth from "../../hooks/useAuth"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { userAuth } = useAuth()
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogoClick = () => {
        navigate("/timeline"); // Navigate to the timeline
    };

    const closeMenu = (event) => {
        if (!menuRef.current || !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeMenu);
        return () => {
            document.removeEventListener("mousedown", closeMenu);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem("userAuth");
        navigate("/");
    };
    let profile_image;
    const stored = JSON.parse(localStorage.getItem("userAuth"));
    if (stored && stored.profile_image) {
        profile_image = stored.profile_image;
    } else {
        profile_image = avatar;
    }

    return (
        <ContainerHeader>
            <LogoName onClick={handleLogoClick}>linkr</LogoName>
            <SearchBar token={userAuth.token} />
            <UserContainer>
                {isMenuOpen ? (
                    <ArrowUp onClick={toggleMenu} />
                ) : (
                    <ArrowDown onClick={toggleMenu} />
                )}
                <Avatar data-test="avatar" src={profile_image} />
            </UserContainer>
            {isMenuOpen && (
                <LogoutMenu data-test="menu" ref={menuRef}>
                    <p onClick={logout} data-test="logout">
                        Logout
                    </p>
                </LogoutMenu>
            )}
        </ContainerHeader>
    );
}
