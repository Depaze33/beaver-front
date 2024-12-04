import React from 'react'


const handleNoteChange = (locationId, note) => {
    setNotes((prevNotes) => ({
        ...prevNotes,
        [locationId]: note,
    }));
};

const CreateRecommendation = () => {


    return (
        <div>
            <p>Rate this place:</p>
            <div style={{display: "flex", gap: "5px"}}>
                {["👍", "😐", "👎"].map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => handleNoteChange(location.id, emoji)}
                        style={{
                            fontSize: "1.5rem",
                            background: notes[location.id] === emoji ? "#ddd" : "transparent",
                            border: "none",
                            cursor: "pointer",

                        }}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            {notes[location.id] && <p>Note: {notes[location.id]}</p>}
        </div>
    )
}
export default CreateRecommendation
