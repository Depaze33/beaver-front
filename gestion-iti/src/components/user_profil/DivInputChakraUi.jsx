import InputChakraUi from "@/components/user_profil/InputChakraUi.jsx"
import { Input } from "@chakra-ui/react"
import styles from "@/components/user_profil/DivInputChakraUi.module.css"


function DivInputChakraUi({user}) {

    console.log({user})
    return (<div className={styles.Inputs}> 
        
        <span>
        <label htmlFor="">Nom</label>
            <Input type="text" value={user.lastName}/>
        </span>
        <span>
        <label htmlFor="">Prénom</label>
            <Input type="text" value={user.firstName} />
        </span>
        <span>
        <label htmlFor="">Date de Naissance</label>
            <Input type="text" value={user.birthdate} />
        </span>

        <span>
        <label htmlFor="">Pseudo</label>
            <Input type="text" value={user.pseudo} />
        </span>
        <span>
        <label htmlFor="">mail</label>
            <Input type="text" value={user.mail} />
        </span>
        <span>
        <label htmlFor="">Mot de passe</label>
            <Input type="text" value={user.password} />
        </span>
        <span>
        <label htmlFor="">Téléphone</label>
            <Input type="text" value={user.tel} />
        </span>
              
    </div>

    )

}

export default DivInputChakraUi