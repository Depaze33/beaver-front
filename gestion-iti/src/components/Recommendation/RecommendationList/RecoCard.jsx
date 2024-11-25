import { Card } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import './RecoCard.css'
const RecoCard = () => {
    return (
        <Card.Root>
            <Card.Body gap="2">
                <Avatar
                    src="https://picsum.photos/200/300"
                    name="Nue Camp"
                    size="lg"
                    shape="rounded"
                />
                <div className="distance">
                    <div>Distance</div>
                    <div>1234 m</div>
                </div>
                <Card.Title mt="2">Restaurant AFPA</Card.Title>
                <Card.Description>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus error explicabo fugit,
                        nesciunt nisi ullam veritatis. Accusantium blanditiis consectetur harum numquam optio provident,
                        quaerat repellendus similique, temporibus, unde vel veritatis.
                    </div>


                </Card.Description>


            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button variant="outline">👍</Button>
                <Button>👎</Button>
            </Card.Footer>
        </Card.Root>
    )
}


export default RecoCard