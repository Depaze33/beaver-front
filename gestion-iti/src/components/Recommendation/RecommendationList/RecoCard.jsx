import {Button} from "@/components/ui/button"
import { Image } from '@chakra-ui/react';
import PropTypes from "prop-types";
import './RecoCard.css'

const RecoCard = ({img, type, title, distance, comment}) => {

    return (


        <div className="card">
            <div className="card-principal">
                <div className="card-img">
                    <img src={img} alt={title} style={{width: '60%'}}/>
                </div>
                <div className="card-body">
                    <div className="card-type">
                        <h3>{type}</h3>
                    </div>
                    <div className="card-element">
                        <div className="card-title">
                            <h3>{title}</h3>
                        </div>
                        <div className="card-comment">
                            <p>{comment}</p>
                        </div>
                    </div>
                </div>
                <div className="card-distance">
                    <span>Distance: {distance} m</span>
                </div>
            </div>
            <div className="card-footer" >
                <Button className="like">
                    <Image
                        src="/heart-logo.png"
                        alt="heart logo"
                        boxSize="20px"
                    />
                </Button>
            </div>
        </div>

    )
}
RecoCard.propTypes = {
    img: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    distance: PropTypes.number,
    comment: PropTypes.string
};

export default RecoCard