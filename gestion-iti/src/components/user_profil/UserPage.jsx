import { useEffect, useState } from 'react';
import DivAvatarUser from '@/components/user_profil/DivAvatarUser.jsx';
import { Input, Button } from "@chakra-ui/react";
import styles from "@/components/user_profil/DivInputChakraUi.module.css"
import { Toaster, toaster } from "@/components/ui/toaster"
import { PasswordInput } from "@/components/ui/password-input";
import { useNavigate } from 'react-router-dom';

// import { useUser } from "../contexts/UserContext";

function UserPage() {

  // Déclaration des states -> équivalent attributs d'une classe
  const [currentUser, setCurrentUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
 const navigate = useNavigate();
  
  // Déclaration des "useEffect" -> pour déclencher des actionsau montage/démontage/mise à jour des states 
  useEffect(() => {
    let stringJsonUser = localStorage.getItem('user');
    let user = JSON.parse(stringJsonUser);

    setCurrentUser(user);
  }, []);

  // Déclaration des fonctions diverses
  /**
   * Change dynamiquement le state "user" en fonction de ce qui est saisi par l'utilisateur
   * @param {*} newValue Nouvelle valeur récupérée lors du changement dans le input
   * @param {*} fieldName Nom du champ concerné par le changement
   */
  const changeUserField = (newValue, fieldName) => {
    //copie d'un utilisateur  = {...user}
    let copyUser = { ...currentUser };

    // mise à jour de l'utilisateur copié en fonction du nom du champ passé en parametre
    copyUser[fieldName] = newValue;

    // mise à jour du "state" user pour rafraîchissement de l'interface graphique
    // en cas de chagement d'état il y a un "re-rendering" du composant graphique
    setCurrentUser(copyUser);
  }

  const updateUser = id => {
    //TODO: changer user aver les information de connexion (Florian)

    // 1 on récupère dans des variables les valeurs qui nous intéressent à partir du state "user" par décopsition du json: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { firstName, lastName, birthdate, pseudo, mail, tel } = user;

    // 2 on re-crée un JSON à partir des variables créées au préalable (comme le DTO) 
    const patchUserJson = {
      "firstName": firstName,
      "lastName": lastName,
      "birthdate": birthdate,
      "pseudo": pseudo,
      "mail": mail,
      "tel": tel,
      "newPassword": newPassword,
      "confirmationPassword": confirmationPassword
    }

    fetch("http://localhost:8000/api/users/673b0c1bed6e66efdc49204c", {
      method: "PATCH",
      body: JSON.stringify(patchUserJson),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        // Vérification du statut HTTP de la réponse
        if (!response.ok) {
          // Affichage d'un message d'erreur en cas de problème avec la requête
          throw new Error(`Erreur: ${response.status} - ${response.statusText}`);
        }
        // Retourne la réponse en JSON si tout est OK
        return response.text();
      })
      .then((data) => {
        toaster.create({
          title: "Utilisateur mis à jour",
          description: "Les données utilisateur ont bien été mise à jour",
          type: "success"
        })
      })
      .catch((error) => {
        // Gestion des erreurs
        toaster.create({
          title: "Echec de la mise à jour",
          description: "Une erreur à eu lieu lors de la mise à jour",
          type: "error"
        });
      })
  }

  // Retour du JSX -> éaquivalent HTML pour représentation du composant graphique
  return Object.keys(currentUser).length > 1 ? (<div>
    {/* {user} transfert le Json contenant les infos de User dans les elements enfants */}
    <Toaster />
    <DivAvatarUser user={currentUser} />
    <div className={styles.Inputs}>
      <span>
        {/* value={user.lastName==null ? '': user.lastName}  si la valeur est null affiche null sinon user.lastName*/}
        <label htmlFor="">Nom</label>
        <Input name="lastName" type="text" value={currentUser.lastName == null ? '' : currentUser.lastName} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">Prénom</label>
        <Input name="firstName" type="text" value={currentUser.firstName == null ? '' : currentUser.firstName} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">Date de Naissance</label>
        <Input name="birthdate" type="text" value={currentUser.birthdate == null ? '' : currentUser.birthdate} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>

      <span>
        <label htmlFor="">Pseudo</label>
        <Input name="pseudo" type="text" value={currentUser.pseudo == null ? '' : currentUser.pseudo} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">mail</label>
        <Input name="mail" type="text" value={currentUser.mail == ! null ? '' : currentUser.mail} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">Nouveau mot de passe</label>
        <PasswordInput name="newPassword" type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </span>
      <span>
        <label htmlFor="">Confirmation de mot de passe</label>
        <PasswordInput name="confirmationPassword" type="text" value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} />
      </span>
      <span>
        <label htmlFor="">Téléphone</label>
        <Input name="tel" type="text" value={currentUser.tel == ! null ? '' : currentUser.tel} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
    </div>

    <Button size="xl" className={styles.BtonSave} onClick={() => {updateUser(currentUser.id) }}>Sauvegarder</Button>
    <Button size="xl" className={styles.BtonSave} onClick={() => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate('/login')
    }} >signOut</Button>
    <Button>Delete Account</Button>
    </div>) : "Utilisateur non authentifié" 
}

export default UserPage;
