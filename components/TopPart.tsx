import { async } from "@firebase/util";
import { Button, FormElement, Text } from "@nextui-org/react";
import { Modal, Input } from "@nextui-org/react";
import React from "react";
import { BsCardList } from "react-icons/bs";

export default function TopPart() {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const [list, setList] = React.useState("");

    async function createList(e: React.FormEvent) {
        e.preventDefault();
        if (list !== "") {
            try {
                const query = await fetch(`http://localhost:3000/api/lists`, {
                    method: "POST",
                    body: JSON.stringify({
                        title: list
                    }),
                })

                const result = await query.json();
                console.log(result);

            } catch (error) {
                throw new Error("Error occured while creating a list,please try again")
            }
        }
    }

    function closeHandler() {
        setVisible(false);
    }

    return <>
        <form action="" onSubmit={createList} method="post">
            <Modal blur closeButton open={visible} onClose={closeHandler}>
                <Modal.Header>
                    <Text weight="medium" size="$lg">Create Todo</Text>
                </Modal.Header>
                <Modal.Body>
                    <Input rounded
                        bordered clearable
                        value={list}
                        onChange={(e: React.ChangeEvent<FormElement>) => {
                            setList(e.target.value)
                        }}
                        labelPlaceholder="Name of Todo list" size="md" color="primary" contentLeft={<BsCardList />} />
                    <Button size="lg" color="warning" type="submit">Create Todo</Button>
                </Modal.Body>
            </Modal>
        </form>
        <Text h1 weight="bold">Create your Todo List</Text>
        <Button size="lg" onClick={handler}>Create Todo</Button>
    </>
}