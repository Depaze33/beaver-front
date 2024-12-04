import React, { useState } from 'react';
import { HStack, Textarea } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogRoot,
    DialogTrigger,
} from '@/components/ui/dialog';
import Note from '@/components/RecomandationCreation/Note.jsx';
import { Button } from '@/components/ui/button.jsx';

const CreateRecommendation = () => {
    const [comment, setComment] = useState('');
    const [notationReco, setNotationReco] = useState(true); // exemple booléen
    const userId = '673af1d2ed6e66efdc49202c'; // ID utilisateur exemple
    const locationId = '648a1b2c3d4e5f6789022222'; // ID emplacement exemple

    const handleSubmit = async () => {
        const payload = {
            comment,
            notationReco,
            user: {
                id: userId,
            },
            location: {
                id: locationId,
            },
        };

        try {
            const response = await fetch('http://localhost:8000/api/recommendations', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Response:', result);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <>
            <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
                <DialogTrigger asChild>
                    <Button>Recommandé</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter une Recommandation</DialogTitle>
                        <DialogCloseTrigger />
                    </DialogHeader>
                    <DialogBody>
                        <Note />
                        <Field label="Commentaire" required helperText="Max 500 caractères.">
                            <Textarea
                                placeholder="Écrivez votre commentaire..."
                                variant="outline"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Field>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={handleSubmit}>Envoyer</Button>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    );
};

export default CreateRecommendation;
