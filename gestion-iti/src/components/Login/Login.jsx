import "../../App.css";
import styles from './Login.module.css';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Input, Button, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    }); // For managing input values
    const [error, setError] = useState(null);     // For managing errors

    const navigate = useNavigate(); // Hook to manage navigation

    const isFormValid = () => {
        const { email, password } = formData;
        return email.trim() !== "" && password.trim() !== "";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const logInButtonClick = () => {
        if (!isFormValid()) return;

        const API_URL = 'http://localhost:8000/auth/login';

        const requestBody = {
            email: formData.email,
            password: formData.password,
        };

        fetch(API_URL, {
            body: JSON.stringify(requestBody),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
                navigate('/'); // Redirect to the dashboard on successful login
            })
            .catch((error) => {
                setError(error);     // Store the error in the state
                console.log(error);
            });
    };

    return (
        <div className={styles.form}>
            <div>
                <Field className={styles.field} label="Email" required>
                    <Input
                        className={styles.input}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="exemple@mail.com"
                    />
                </Field>
            </div>
            <div>
                <Field className={styles.field} label="Mot de passe" required>
                    <PasswordInput
                        className={styles.input}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Azerty*123"
                    />
                </Field>
            </div>
            <Button
                onClick={logInButtonClick}
                isDisabled={!isFormValid()}
                className={!isFormValid() ? styles.disabledButton : styles.activeButton}
            >
                Connexion
            </Button>
            {error && <p className={styles.error}>Erreur : {error.message}</p>}
            <p className={styles.signupPrompt}>
                Pas encore inscrit ?{" "}
                <Link
                    onClick={() => navigate('/signup')}
                    color="teal.500"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                >
                    Créer un compte !
                </Link>
            </p>
        </div>
    );
}

export default Login;
