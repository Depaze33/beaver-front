import "../../App.css";
import styles from './Signup.module.css';

import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Input, Button } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"

function Signup() {

    const [error, setError] = useState(null);     // For managing errors

    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const inputLastName = useRef(null);
    const inputFirstName = useRef(null);

    const navigate = useNavigate(); // Hook to manage navigation

    const signUpButtonClick = () => {
        const API_URL = 'http://localhost:8000/auth/signup';

        const requestBody = {
            "email": inputEmail.current.value,
            "password": inputPassword.current.value,
            "lastName": inputLastName.current.value,
            "firstName": inputFirstName.current.value
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
                navigate('/login'); // Redirect to the dashboard on successful login
            })
            .catch((error) => {
                setError(error);     // Store the error in the state
                console.log(error);
            });
    }
    return (
        <div className={styles.form}>
            <div>
                <Field className={styles.field} label="Nom de famille" required>
                    <Input className={styles.input} ref={inputLastName} placeholder="Dupont" />
                </Field>
            </div>
            <div>
                <Field className={styles.field} label="Prénom" required>
                    <Input className={styles.input} ref={inputFirstName} placeholder="Michel" />
                </Field>
            </div>
            <div>
                <Field className={styles.field} label="Email" required>
                    <Input className={styles.input} ref={inputEmail} placeholder="exemple@mail.com" />
                </Field>
            </div>
            <div>
                <Field className={styles.field} label="Mot de passe" required>
                    <PasswordInput className={styles.input} ref={inputPassword} placeholder="Azerty*123" />
                </Field>
            </div>
            <Button onClick={signUpButtonClick}>Inscription</Button>
            {error && <p className={styles.error}>Erreur : {error.message}</p>}
        </div>

    )
}

export default Signup;