import "../../App.css";
import styles from './Signup.module.css';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Input, Button, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";

function Signup() {
    const [error, setError] = useState(null);          // For managing errors
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        cguChecked: false,
    }); // For managing form inputs and checkbox state

    const navigate = useNavigate(); // Hook to manage navigation

    const isFormValid = () => {
        const { email, password, lastName, firstName, cguChecked } = formData;
        return (
            email.trim() !== "" &&
            password.trim() !== "" &&
            lastName.trim() !== "" &&
            firstName.trim() !== "" &&
            cguChecked
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, cguChecked: e.target.checked });
    };

    const signUpButtonClick = () => {
        if (!isFormValid()) return;

        const API_URL = 'http://localhost:8000/auth/signup';

        const requestBody = {
            email: formData.email,
            password: formData.password,
            lastName: formData.lastName,
            firstName: formData.firstName,
        };

        fetch(API_URL,
            {
                body: JSON.stringify(requestBody),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                setError(error); // Store the error in the state
                console.log(error);
            });
    };

    return (
        <div className={styles.form}>
            <div>
                <Field className={styles.field} label="Nom de famille" required>
                    <Input
                        className={styles.input}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Dupont"
                    />
                </Field>
            </div>
            <div>
                <Field className={styles.field} label="Prénom" required>
                    <Input
                        className={styles.input}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Michel"
                    />
                </Field>
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
            <div>
                <Checkbox
                    isChecked={formData.cguChecked}
                    onChange={handleCheckboxChange}
                    
                >
                    j&apos;accepte les {" "}
                    <Link colorPalette="teal" href="https://google.com" isExternal>
                        CGU *
                    </Link>
                </Checkbox>
            </div>
            <Button
                onClick={signUpButtonClick}
                isDisabled={!isFormValid()}
                className={!isFormValid() ? styles.disabledButton : styles.activeButton}
            >
                Inscription
            </Button>
            {error && <p className={styles.error}>Erreur : {error.message}</p>}
            <p className={styles.loginPrompt}>
                Déjà inscrit ?{" "}
                <Link
                    onClick={() => navigate('/login')}
                    color="teal.500"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                >
                    Vous connecter !
                </Link>
            </p>
        </div>
    );
}

export default Signup;
