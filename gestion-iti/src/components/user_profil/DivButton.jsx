import { Button } from "@/components/ui/button"
import styles from "./DivButton.module.css"

function DivButton(){
    return(<div>
        <Button size="xl" className={styles.BtonSave} >Sauvegarder</Button>
    </div>)

}export default DivButton
