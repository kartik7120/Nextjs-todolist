import { Button, Card, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";
import { useSWRConfig } from "swr";

interface Props {
    header: string | undefined,
    body: string | undefined,
    id: number
}

export default function ListCard(props: Props) {
    const router = useRouter();
    const { mutate } = useSWRConfig();

    async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        try {
            const query = await fetch("/api/lists", {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: props.id
                })
            })

            const result = await query.json();
            mutate("/api/lists");
            return result;
        } catch (error) {
            throw new Error("An error occured while deleting a list");
        }
    }

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
                <Button type="button" color="error" size="md" icon={<BsTrash />} onClick={handleClick} />
            </Tooltip>
        </Card.Footer>
    </Card>
}