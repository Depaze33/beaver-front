import { useEffect, useState } from 'react';
import DivAvatarUser from '@/components/user_profil/DivAvatarUser.jsx';
import { Input, Button } from "@chakra-ui/react";
import styles from "@/components/user_profil/DivInputChakraUi.module.css"
import { Toaster, toaster } from "@/components/ui/toaster"

function UserPage() {
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  // Change dynamiquement le state "user" en fonction de ce qui est saisi par l'utilisateur
  const changeUserField = (newValue, fieldName) => {
    //copie d'un utilisateur  = {...user}
    let copyUser = { ...user };

    // mise à jour de l'utilisateur copié en fonction du nom du champ passé en parametre
    copyUser[fieldName] = newValue;

    // mise à jour du "state" user pour rafraîchissement de l'interface graphique
    // en cas de chagement d'état il y a un "re-rendering" du composant graphique
    setUser(copyUser);
  }

  useEffect(() => {
    //Le fetch agit en 2 temps ; 1 obtention du header de la reponse,2 Obtention du body de la reponse(JSON); Then peret de resoudre les promesses;
    fetch("http://localhost:8000/api/users/673b0c1bed6e66efdc49204c").
      then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Erreur réseau ou utilisateur non trouvé");
        //chainage de la 2e methode then
      }).then((dataUserJson) => {
        setUser(dataUserJson);
      })
      .catch((error) => {
        console.error("Une erreur est survenue :", error);
      })
  }, []);

  const updateUser = id => {
    //TODO: changer user aver les information de connexion (Florian)

    // 1 on récupère dans des variables les valeurs qui nous intéressent à partir du state "user" par décopsition du json: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const {firstName, lastName, birthdate, pseudo, mail, tel} = user;

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
        // TODO add toaster Success
        // toaster.promise(Promise.resolve(data), {
        //   success: {
        //     title: "Successfully updated!",
        //     description: "User data has been updated successfully.",
        //   },
        //   loading: {
        //     title: "Updating...",
        //     description: "Please wait while the data is being updated.",
        //   },
        //   error: {
        //     title: "Update failed",
        //     description: "An error occurred during the update process.",
        //   },
        // });
        toaster.create({
          title: "Utilisateur mis à jour",
          description: "Les données utilisateur ont bien été mise à jour",
          type : "success"
        })
      })
      .catch((error) => {
        // Gestion des erreurs
        toaster.create({
          title: "Echec de la mise à jour",
          description: "Une erreur à eu lieu lors de la mise à jour",
          type : "error"
        });
      })
  }
  console.log(user)
  return (<div>
    {/* {user} transfert le Json contenant les infos de User dans les elements enfants */}
    <Toaster />
    <DivAvatarUser user={user} />
    <div className={styles.Inputs}>
      <span>
        {/* value={user.lastName==null ? '': user.lastName}  si la valeur est null affiche null sinon user.lastName*/}
        <label htmlFor="">Nom</label>
        <Input name="lastName" type="text" value={user.lastName == null ? '' : user.lastName} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">Prénom</label>
        <Input name="firstName" type="text" value={user.firstName == null ? '' : user.firstName} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">Date de Naissance</label>
        <Input name="birthdate" type="text" value={user.birthdate == null ? '' : user.birthdate} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>

      <span>
        <label htmlFor="">Pseudo</label>
        <Input name="pseudo" type="text" value={user.pseudo == null ? '' : user.pseudo} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">mail</label>
        <Input name="mail" type="text" value={user.mail == ! null ? '' : user.mail} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
      <span>
        <label htmlFor="">Nouveau mot de passe</label>
        <Input name="newPassword" type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </span>
      <span>
        <label htmlFor="">Confirmation de mot de passe</label>
        <Input name="confirmationPassword" type="text" value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} />
      </span>
      <span>
        <label htmlFor="">Téléphone</label>
        <Input name="tel" type="text" value={user.tel == ! null ? '' : user.tel} onChange={(e) => changeUserField(e.target.value, e.target.name)} />
      </span>
    </div>

    <Button size="xl" className={styles.BtonSave} onClick={() => {
      updateUser(user.id)

    }}>Sauvegarder</Button>

    <Button size="xl" className={styles.BtonSave} >DeleteAccount</Button>
  </div>
  )

}








export default UserPage;
