import "../../App.css";
import styles from './Login.module.css';

import { useRef, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { Input, Button } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"


function Login() {

    const [data, setData] = useState([]);      // Stores the list of clients from the API
    const [error, setError] = useState(null);     // For managing errors

    const inputEmail = useRef(null);
    const inputPassword = useRef(null);

    const navigate = useNavigate(); // Hook to manage navigation

    const logInButtonClick = () => {
        const API_URL = 'http://localhost:8000/auth/login';

        const requestBody = {
            "email": inputEmail.current.value,
            "password": inputPassword.current.value
        };

        fetch(API_URL,
            {
                body: JSON.stringify(requestBody),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            .then((response) => {
                if (!response.ok) { // Check if response is OK
                    throw new Error(`Erreur : ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);
                localStorage.setItem('token', data.token);
                setData(data);      // Store the list of clients in the state
                navigate('/allaccounts'); // Redirect to the dashboard on successful login
            })
            .catch((error) => {
                setError(error);     // Store the error in the state
                console.log(error);
            });
    }

    return (
        <div className={styles.form}>
            <div>
                <Field className={styles.field} label="Email" required>
                <Input  className={styles.input} ref={inputEmail} placeholder="exemple@mail.com" />
                </Field>
            </div>
            <div>
                <Field className={styles.field} label="Mot de passe" required>
                <PasswordInput className={styles.input} ref={inputPassword} placeholder="Azerty*123"/>
                </Field>
            </div>
            <Button onClick={logInButtonClick}>Connexion</Button>
            {error && <p className={styles.error}>Erreur : {error.message}</p>}
        </div>

    )
}

export default Login;