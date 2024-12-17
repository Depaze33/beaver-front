import AvatarUser from "@/components/user_profil/AvatarUser.jsx"
import styles from "./DivAvatarUser.module.css"

function DivAvatarUser({user}){


    const name = JSON.parse(JSON.stringify(user));
    
    return(<div className={styles.AvatarUser}>
        {/* TODO changer les baliser de titre par des span */}
        <AvatarUser/>
        <span className="nom">{user.lastName} </span>
        <span className="prenom">{user.firstName}</span>
    </div>
    )
}

export default DivAvatarUser;