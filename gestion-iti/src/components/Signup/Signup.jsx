import "../../App.css";
import styles from './Signup.module.css';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Input, Button, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";

function Signup() {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        cguChecked: false,
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [emailExists, setEmailExists] = useState(false); // Nouvel état pour vérifier si l'email existe
    const navigate = useNavigate();

    const regexValidations = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        name: /^[a-zA-ZÀ-ÿ]+(?:[-']?[a-zA-ZÀ-ÿ]+)*(?: [a-zA-ZÀ-ÿ]+(?:[-']?[a-zA-ZÀ-ÿ]+)*)*$/,
    };

    const isFormValid = () => {
        const { email, password, lastName, firstName, cguChecked } = formData;
        return (
            email.trim() !== "" &&
            regexValidations.email.test(email) &&
            password.trim() !== "" &&
            regexValidations.password.test(password) &&
            lastName.trim() !== "" &&
            regexValidations.name.test(lastName) &&
            firstName.trim() !== "" &&
            regexValidations.name.test(firstName) &&
            cguChecked
        );
    };

    const validateField = (name, value) => {
        let error = null;

        switch (name) {
            case "email":
                if (!regexValidations.email.test(value)) {
                    error = "Email invalide";
                }
                break;
            case "password":
                if (!regexValidations.password.test(value)) {
                    error = (
                        <>
                            Le mot de passe doit contenir au moins 8 caractères, une majuscule,<br />
                            une minuscule, un chiffre et un caractère spécial.
                        </>
                    );
                }
                break;
            case "lastName":
            case "firstName":
                if (!regexValidations.name.test(value)) {
                    error = "Ce champ ne peut contenir que des lettres et des espaces.";
                }
                break;
            default:
                break;
        }

        setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, cguChecked: e.target.checked });
    };

    // Fonction pour vérifier si l'email est déjà pris
    const checkEmailAvailability = (email) => {
        return fetch('http://localhost:8000/auth/check-email', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.exists) {
                setError("L'email est déjà utilisé.");
                return true; // Email déjà pris
            }
            return false; // Email disponible
        })
        .catch(() => {
            setError("Erreur lors de la vérification de l'email.");
            return false; // En cas d'erreur, considérer l'email comme disponible
        });
    };

    // Fonction appelée lors du clic sur le bouton d'inscription
    const signUpButtonClick = async () => {
        if (!isFormValid()) return;

        // Vérification si l'email est déjà utilisé
        const emailTaken = await checkEmailAvailability(formData.email);
        if (emailTaken) {
            setEmailExists(true);
            return; // L'email est déjà utilisé, on arrête l'inscription
        }

        setEmailExists(false); // Réinitialisation si l'email est disponible

        const API_URL = 'http://localhost:8000/auth/signup';

        const requestBody = {
            email: formData.email,
            password: formData.password,
            lastName: formData.lastName,
            firstName: formData.firstName,
        };

        fetch(API_URL, {
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
        .then(() => {
            navigate('/login');
        })
        .catch((error) => {
            setError("Erreur: L'email renseigné existe déjà !");
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
                    {validationErrors.lastName && (
                        <p className={styles.error}>{validationErrors.lastName}</p>
                    )}
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
                    {validationErrors.firstName && (
                        <p className={styles.error}>{validationErrors.firstName}</p>
                    )}
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
                    {validationErrors.email && (
                        <p className={styles.error}>{validationErrors.email}</p>
                    )}
                    {emailExists && (
                        <p className={styles.error}>Cet email est déjà utilisé.</p>
                    )}
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
                    {validationErrors.password && (
                        <p className={styles.error}>{validationErrors.password}</p>
                    )}
                </Field>
            </div>
            <div>
                <Checkbox
                    isChecked={formData.cguChecked}
                    onChange={handleCheckboxChange}
                >
                    J&apos;accepte les {" "}
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

            {/* Affichage de l'erreur sous le bouton */}
            {error && <p className={styles.error}>{error}</p>}

            <p className={styles.loginPrompt}>
                Déjà inscrit ?{" "}
                <Link
                    onClick={() => navigate('/login')}
                    color="teal.500"
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                >
                    Connectez vous !
                </Link>
            </p>
        </div>
    );
}

export default Signup;
