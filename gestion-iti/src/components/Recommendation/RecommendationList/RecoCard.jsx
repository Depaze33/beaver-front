import { Card } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const RecoCard = () => {
    return (
        <Card.Root >
            <Card.Body gap="2">
                <Avatar
                    src="https://picsum.photos/200/300"
                    name="Nue Camp"
                    size="lg"
                    shape="rounded"
                />
                <Card.Title mt="2">Restaurant Afpa</Card.Title>
                <Card.Description>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus error explicabo fugit,
                        nesciunt nisi ullam veritatis. Accusantium blanditiis consectetur harum numquam optio provident,
                        quaerat repellendus similique, temporibus, unde vel veritatis.
                    </div>
                    <div>Dolore earum fuga illo ipsum labore, nisi nobis, quod repellendus reprehenderit sunt vitae
                        voluptas. Aliquam cum, cupiditate est minus mollitia nam nihil quibusdam sit, suscipit ullam
                        veniam veritatis, vitae voluptatibus!
                    </div>
                    <div>Dolore eligendi harum necessitatibus nisi quod? Aliquam, aperiam atque deleniti earum eligendi
                        excepturi facilis id incidunt iste nam neque nostrum obcaecati officiis possimus provident qui
                        quis quo quos similique veniam!
                    </div>
                    <div>Atque aut dignissimos doloremque molestiae obcaecati officia perferendis, vel voluptatibus.
                        Cumque earum fuga id laboriosam rerum, vero voluptas! Aliquam at consequuntur doloribus sint ut?
                        Doloribus est in qui rerum sint.
                    </div>
                    <div>Consequuntur dolorem doloremque illo inventore iste magni nesciunt placeat quasi suscipit,
                        vitae. Ad beatae, est! Accusantium, eveniet explicabo? A corporis cum delectus dolores libero
                        molestias officiis perferendis similique totam voluptates!
                    </div>
                    <div>Eius, id illo minus modi mollitia numquam tempore unde veniam? Atque, dicta dolore ducimus
                        eveniet ex facere facilis ipsam, libero magnam maxime repellat repellendus sint tempora tempore
                        vel voluptate voluptatibus.
                    </div>
                    <div>Ab amet commodi deserunt doloremque, ipsum reiciendis unde veritatis? Amet aperiam ea, ex
                        expedita facilis id ipsa ipsum nobis perferendis placeat quidem quo quos reiciendis, repudiandae
                        temporibus? Eveniet exercitationem, obcaecati.
                    </div>
                    <div>Aliquam cupiditate earum facere ipsam maiores nulla possimus rem voluptate. Molestiae quo
                        temporibus tenetur? Aliquam animi architecto culpa ipsam natus nulla odit perferendis placeat
                        quidem, quod repudiandae saepe, vel, veritatis.
                    </div>
                    <div>Ad autem deserunt dignissimos doloremque ex expedita illum laudantium maiores molestiae
                        mollitia nemo neque, non nostrum omnis quas quia soluta ullam velit vero voluptas. Consectetur
                        facilis fugiat maxime quos reprehenderit?
                    </div>
                    <div>Atque aut autem beatae consequatur cum, dolorem eaque, exercitationem facilis ipsam nobis quae
                        quasi quibusdam quo quos rem? Ab debitis dolorum laborum modi molestiae odio omnis praesentium
                        rem ut vel.
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