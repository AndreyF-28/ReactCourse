import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../Button/MyButton";
import { AuthContext } from "../../../context/context";

const Navbar = () => {
    // eslint-disable-next-line no-unused-vars
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;
