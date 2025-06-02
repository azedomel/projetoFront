import { useNavigate } from "react-router";
import styles from "./Menu.module.css"
import { useState } from "react";

import menuImg from "../assets/menuImg.png"

export const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const goToDashboard = () => navigate('/dashboard')
    const goToUsers = () => navigate('/usersList')

    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

 return(
    <nav className={open ? styles.navBar : styles.navBarClosed}>
        <img src={menuImg} onClick={() => setOpen(prev => !prev)} />
        <p onClick={goToDashboard}>Dashboard</p>
        <p >Criar usuário</p>
        <p onClick={goToUsers}>Lista de usuário</p>
        <p>Criar produto</p>
        <p>Lista de produto</p>
        <p onClick={logOut}>Sair</p>
    </nav>
 )
}