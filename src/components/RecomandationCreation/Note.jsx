import { useState } from "react";
import PropTypes from "prop-types";

const Note = ({ locationId }) => {
    const [notes, setNotes] = useState({});

    const handleNoteChange = (id, note) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            [id]: note,
        }));
    };

    return (
        <div>
            <p>Rate this place:</p>
            <div style={{ display: "flex", gap: "5px" }}>
                {["👍", "👎"].map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => handleNoteChange(locationId, emoji)}
                        style={{
                            fontSize: "1.5rem",
                            background: notes[locationId] === emoji ? "#ddd" : "transparent",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            {notes[locationId] && <p>Note: {notes[locationId]}</p>}
        </div>
    );
};

// PropTypes pour Note
Note.propTypes = {
    locationId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]), // locationId doit être une chaîne ou un nombre
};

export default Note;


