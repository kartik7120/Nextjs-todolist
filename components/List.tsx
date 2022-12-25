import { Card } from "@nextui-org/react";

interface Props {
    header: string | undefined,
    body: string | undefined
}

export default function ListCard(props: Props) {
    return <Card  css={{mw:"300px",margin:"$5"}} variant='bordered' isHoverable isPressable >
        <Card.Header>
            {props.header}
        </Card.Header>
        <Card.Divider />
        <Card.Body>
            {props.body}
        </Card.Body>
    </Card>
}