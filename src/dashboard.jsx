import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Menu } from "./components/menu";
import { api } from  "./api/api"
import styles from "./Dashboard.module.css"

function Dashboard() {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(storedUser) navigate('/dashboard')
    }, [navigate])

    useEffect(() => {
        async function fechData() {
            try{
                const[usersRes, productRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/list'),
                ])
                setUserCount(usersRes.data.length)
                setProductCount(productRes.data.length)
            }catch(err){
                console.error("erro ao buscar dados do dashboard", err)

            }
        }
        fechData()
    }, [])

 return(
    <section>
        <Menu/>
        <div className={styles.wrapNav}>
            <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                <p>Criar Produto</p>
                </div>
            <div className={styles.wrapItem} onClick={() => navigate('/listProduct')}>
                <p>Lista de produtos - ({productCount} produtos)</p>
                </div>
            <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                <p>Criar usuário</p>
                </div>
            <div className={styles.wrapItem} onClick={() => navigate('/userList')}>
                <p>Lista de usuários - ({userCount} usuários)</p>
                </div>
            <div className={styles.wrapItem} onClick={() => navigate('/contact')}>
                <p>Entre em contato</p>
                </div>

        </div>
    </section>

 )
}
export default Dashboard