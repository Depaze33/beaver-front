import "../../App.css";
import styles from './Signup.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Button, Link } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogRoot,
    DialogTrigger,
} from "@/components/ui/dialog";

function Signup() {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        pseudo: "",
        cguChecked: false,
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [emailExists, setEmailExists] = useState(false);
    const [cguText, setCguText] = useState("");  // État pour stocker le texte des CGU
    const navigate = useNavigate();

    useEffect(() => {
        // Appel de l'API pour récupérer les CGU
        fetch("http://localhost:8000/api/cgu/6756a9b954680b52e9e9496a")  // Remplacez par l'URL de votre API
            .then(response => response.text())
            .then(data => {
                console.log(data);
                setCguText(data); // Récupère le texte des CGU
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des CGU", error);
                setError("Impossible de charger les CGU.");
            });
    }, []);

    const regexValidations = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        name: /^[a-zA-ZÀ-ÿ]+(?:[-']?[a-zA-ZÀ-ÿ]+)*(?: [a-zA-ZÀ-ÿ]+(?:[-']?[a-zA-ZÀ-ÿ]+)*)*$/,
        pseudo: /^[a-zA-Z0-9]+$/,
    };

    const isFormValid = () => {
        const { email, password, lastName, firstName, pseudo, cguChecked } = formData;
        return (
            email.trim() !== "" &&
            regexValidations.email.test(email) &&
            password.trim() !== "" &&
            regexValidations.password.test(password) &&
            lastName.trim() !== "" &&
            regexValidations.name.test(lastName) &&
            firstName.trim() !== "" &&
            regexValidations.name.test(firstName) &&
            (pseudo.trim() === "" || regexValidations.pseudo.test(pseudo)) &&
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
            case "pseudo":
                if (value.trim() !== "" && !regexValidations.pseudo.test(value)) {
                    error = "Le pseudo ne peut contenir que des lettres et des chiffres.";
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
                    return true;
                }
                return false;
            })
            .catch(() => {
                setError("Erreur lors de la vérification de l'email.");
                return false;
            });
    };

    const signUpButtonClick = async () => {
        if (!isFormValid()) return;

        const emailTaken = await checkEmailAvailability(formData.email);
        if (emailTaken) {
            setEmailExists(true);
            return;
        }

        setEmailExists(false);

        const API_URL = 'http://localhost:8000/auth/signup';

        const requestBody = {
            email: formData.email,
            password: formData.password,
            lastName: formData.lastName,
            firstName: formData.firstName,
            pseudo: formData.pseudo || undefined,
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

    // Fonction pour transformer les \n en balises <br /> et le texte entre ** en couleur teal et en gras
    const formatCguText = (text) => {
        // Diviser le texte par lignes
        const lines = text.split('\n');

        return lines.map((line, index) => {
            // Remplacer les **par texte** par du texte en couleur teal et en gras
            const formattedLine = line.split('**').map((part, i) => {
                if (i % 2 !== 0) {
                    // Si c'est un texte entre **, l'appliquer en couleur teal et en gras
                    return (
                        <span key={i} style={{ color: 'teal', fontWeight: 'bold' }}>
                            {part}
                        </span>
                    );
                }
                return part; // Sinon, juste retourner la partie sans modification
            });

            return (
                <span key={index}>
                    {formattedLine}
                    <br /> {/* Ajoute un saut de ligne après chaque ligne */}
                </span>
            );
        });
    };


    return (
        <div className={styles.form}>
            <div className={styles.title}>
                <p className={styles.bigP}>Bonjour,</p>
                <p>bienvenue sur <span className={styles.nametag}>placeholder !</span></p>
            </div>
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
                <Field className={styles.field} label="Pseudo" optional>
                    <Input
                        className={styles.input}
                        name="pseudo"
                        value={formData.pseudo}
                        onChange={handleInputChange}
                        placeholder="Pseudo123"
                    />
                    {validationErrors.pseudo && (
                        <p className={styles.error}>{validationErrors.pseudo}</p>
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
                    <DialogRoot scrollBehavior="inside" size="sm">
                        <DialogTrigger asChild>
                            <Link colorPalette="teal">
                                CGU *
                            </Link>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle color="teal">Conditions génerales d&apos;utilisation</DialogTitle>
                            </DialogHeader>
                            <DialogCloseTrigger />
                            <DialogBody>
                                {cguText ? (
                                    <div>{formatCguText(cguText)}</div> // Affichage des CGU récupérées
                                ) : (
                                    <p>Chargement des CGU...</p>
                                )}
                            </DialogBody>
                        </DialogContent>
                    </DialogRoot>
                </Checkbox>
            </div>
            <Button
                onClick={signUpButtonClick}
                isDisabled={!isFormValid()}
                className={!isFormValid() ? styles.disabledButton : styles.activeButton}
            >
                Inscription
            </Button>

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