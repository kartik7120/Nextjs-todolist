import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";

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
    </Card>
}