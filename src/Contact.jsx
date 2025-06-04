import styles from './contact.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Contact() {
    const Navigate = useNavigate();
    const defaultPhoneNumber = "554199999999";
    const  [formData, setFormData] = useState({
     name: "",
     message: "",
    });
   
    const goToMenu = () => Navigate('/')

   const handleChange = (e) => {
     const {name, value} = e.target;
     setFormData({...formData, [name]: value})
   }
   
   const handleZap = () => {
     const {name, message} = formData
   
     const URLzap = `https://api.whatsapp.com/send?phone=${defaultPhoneNumber}&text=Nome:%20${name}%0D%0AMensagem:%20${message}%0D%0A`
    window.open(URLzap, "_blank")
   }

     return (
       <>
       <section>

            <div style={styles.div}>
            <h2>Contato</h2>
            <input placeholder="insira seu nome: " type="text" id='name' name="name" value={formData.name} onChange={handleChange} required />
            <textarea placeholder="insira seu message: " id="message" name="message" value={formData.message} onChange={handleChange} cols={30} rows={10} required></textarea>
                <button onClick={handleZap}>ENVIAR MENSAGEM</button>
                <button onClick={goToMenu}>VOLTAR</button>
            </div>
        </section>
       </>
     )
   }

export default Contact