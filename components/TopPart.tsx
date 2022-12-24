import { Button, Text } from "@nextui-org/react";
import { Modal, Input } from "@nextui-org/react";
import React from "react";
import { BsCardList } from "react-icons/bs";

export default function TopPart() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    function closeHandler() {
        setVisible(false);
    }

    return <>
        <Modal blur closeButton open={visible} onClose={closeHandler}>
            <Modal.Header>
                <Text weight="medium" size="$lg">Create Todo</Text>
            </Modal.Header>
            <Modal.Body>
                <Input rounded
                    bordered clearable
                    labelPlaceholder="Name of Todo list" size="md" color="primary" contentLeft={<BsCardList />} />
                <Button size="lg" color="warning">Create Todo</Button>
            </Modal.Body>
        </Modal>
        <Text h1 weight="bold">Create your Todo List</Text>
        <Button size="lg" onClick={handler}>Create Todo</Button>
    </>
}