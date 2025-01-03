import {useRef, useState} from 'react';
import {Textarea} from '@chakra-ui/react';
import {Checkbox} from "@/components/ui/checkbox"
import {Field} from '@/components/ui/field';
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
import {Button} from '@/components/ui/button.jsx';
import PropTypes from "prop-types";
import RecommendationList from "@/components/Recommendation/RecommendationList/RecommendationList.jsx";
import URL_API from '../../apiConfig/urlApi';

/**
 *
 * @param location
 * @returns {JSX.Element} display pop up on map
 * @constructor
 */
const CreateRecommendation = ({location}) => {
    const [comment, setComment] = useState('');
    const [notationReco, setNotationReco] = useState(true);
    const internetRef = useRef(false);
    const accesPRMRef = useRef(true);




    const handleSubmit = async () => {

        const locationType = location.tags.amenity === "restaurant" || location.tags.amenity === "fast_food"
            ? "RESTAURANT"
            : location.tags.amenity === "bar"
                ? "LEISURE"
                : "HOSTEL";

        // creation du json location (si nouveau)
        const locationJson =
            {
                "locationType": locationType || "inconnu",
                "name": location.tags.name || "inconnu",
                "adress": location.tags.street || "inconnu",
                "postalCode": location.tags.postcode || "inconnu",
                "city": location.tags.city || "inconnu",
                "geolocalisation": `${location.lat},${location.lon}`,
                "notationLoc": 5,
                "mapApiId": location.id,
                "internet": internetRef.current,
                "accesPRM": accesPRMRef.current,
                "favorite": true

            };
        let stringJsonUser = localStorage.getItem('user');
        let user = JSON.parse(stringJsonUser);
        const recommendationJson = {
            comment,
            notationReco,
            location: locationJson,
            user:
                {id: user.id}

        };
        console.log(user.id);
        console.log(comment)
        try {
            const response = await fetch(`${URL_API}/api/recommendations`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(recommendationJson),
            });

            //TODO mettre une indications pour l'utilisateur
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
        <DialogRoot size="cover" placement="center" motionPreset="slide-in-bottom">
            <DialogTrigger asChild>
                <Button>Recommander</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter une Recommandation</DialogTitle>
                    <DialogCloseTrigger/>
                </DialogHeader>
                <DialogBody>
                    <Note/>
                    <Field label="Commentaire" required helperText="Max 500 caractères.">
                        <Textarea
                            placeholder="Écrivez votre commentaire..."
                            variant="outline"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Field>
                    {/* Ajout des Checkbox */}

                    <Checkbox
                        defaultChecked={internetRef.current}
                        onChange={(e) => (internetRef.current = e.target.checked)}
                    >
                        Accès Internet
                    </Checkbox>
                    <Checkbox
                        defaultChecked={accesPRMRef.current}
                        onChange={(e) => (accesPRMRef.current = e.target.checked)}
                    >
                        Accès PMR
                    </Checkbox>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={
                        handleSubmit
                        }>Envoyer</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

CreateRecommendation.propTypes = {
    location: PropTypes.object}

export default CreateRecommendation;
