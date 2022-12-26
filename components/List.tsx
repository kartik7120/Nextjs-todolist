import { Button, Card, Modal, Text, Tooltip } from "@nextui-org/react";
import { Model } from "mongoose";
import { useRouter } from "next/router";
import { BsTrash } from "react-icons/bs";
import { useSWRConfig } from "swr";
import React from "react";

interface Props {
    header: string | undefined,
    body: string | undefined,
    id: number
}

export default function ListCard(props: Props) {
    const router = useRouter();
    const { mutate } = useSWRConfig();

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };


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

    return <>
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text size="$lg">
                    Are you sure ?
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Button type="button" color="default" size="md" onClick={closeHandler}>
                    No
                </Button>
                <Button type="button" color="primary" size="md" onClick={handleClick}>
                    Yes
                </Button>
            </Modal.Body>
        </Modal>

        <Card css={{ mw: "300px", margin: "$5" }} variant='bordered' isHoverable isPressable onPress={
            () => {
                router.push(`/lists/${props.id}`)
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
                    <Button type="button" color="error" size="md" icon={<BsTrash />} onClick={handler} />
                </Tooltip>
            </Card.Footer>
        </Card>
    </>
}