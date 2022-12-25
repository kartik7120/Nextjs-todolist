import { Button, Card, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";

interface Props {
    header: string | undefined,
    body: string | undefined,
    id: number
}

export default function ListCard(props: Props) {
    const router = useRouter();
    return <Card css={{ mw: "300px", margin: "$5" }} variant='bordered' isHoverable isPressable onPress={
        () => {
            router.push(`/${props.id}`)
        }
    }>
        <Card.Header>
            {props.header}
        </Card.Header>
        <Card.Divider />
        <Card.Body>
            {props.body}
        </Card.Body>
        <Card.Footer>
            <Tooltip content="Delete List">
                <Button type="button" color="error" size="md" icon={<BsTrash />} />
            </Tooltip>
        </Card.Footer>
    </Card>
}