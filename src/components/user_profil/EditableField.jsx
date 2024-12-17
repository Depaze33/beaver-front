import { Editable, IconButton } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
import { useState } from "react";

const EditableField = ({field}) => {
    const [name, setName] = useState(field);
    
    console.log({name});

    return (
        <Editable.Root value={name}
            onValueChange={(e) => setName(e.value)}
            placeholder="Click to edit">
            <Editable.Preview />
            <Editable.Input />
            <Editable.Control>
                <Editable.EditTrigger asChild>
                    <IconButton variant="ghost" size="xs">
                        <LuPencilLine />
                    </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                    <IconButton variant="outline" size="xs">
                        <LuX />
                    </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                    <IconButton variant="outline" size="xs">
                        <LuCheck />
                    </IconButton>
                </Editable.SubmitTrigger>
            </Editable.Control>
        </Editable.Root>
    )
}
export default EditableField