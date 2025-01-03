import "../../App.css";
import styles from './Login.module.css';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Input, Button, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useUser } from "../contexts/UserContext";
import URL_API from "../../apiConfig/urlApi";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUser } = useUser();

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

        const requestBody = {
            email: formData.email,
            password: formData.password,
        };

        fetch(`${URL_API}/api/auth/login`, {
            body: JSON.stringify(requestBody),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur : ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            })
            .catch((error) => {
                setError(error);
                
            });
    };

    return (
        <div className={styles.form}>
            <div className={styles.title}>
                <p className={styles.bigP}>Bonjour,</p>
                <p>bienvenue sur{" "}
                    <img src="../../../public/BeaverNameTag.svg" alt="Logo" className={styles.logoNameTag} />
                </p>
            </div>
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
                    className={styles.colorPrimary}
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
