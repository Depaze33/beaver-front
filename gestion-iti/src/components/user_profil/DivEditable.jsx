import InputChakraUi from "@/components/user_profil/InputChakraUi.jsx";
import EditableField from "@/components/user_profil/EditableField.jsx";
import styles from "./DivEditable.module.css"




function DivEditable({ user }) {

  return (<div className={styles.editables}>

    <EditableField
      field={user.firstName}
    />

    <InputChakraUi value ={user.firstName}/>

    <span>{user.birthdate}</span>
    
    <EditableField
      field={user.lastName}
    />

    <EditableField
      field={user.birthdate}
    />
    <EditableField
      field={user.mail}
    />
    <EditableField
      field={user.password}
    />
    <EditableField
      field={user.tel}
    />
  </div>)
}

export default DivEditable



// return (<div className={styles.background}>
//   {fields.map((field, index) => <EditableField
//     field={(field=="Mot de passe") ? "*******" : field} //expression Ternaire pour raccourcir le if/else : syntaxe = condition ? exprSiVrai : exprSiFaux;
//     key={index} />)}
// </div>);
