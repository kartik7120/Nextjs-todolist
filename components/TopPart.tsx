import { Button, FormElement, Text, Textarea } from "@nextui-org/react";
import { Modal, Input } from "@nextui-org/react";
import React from "react";
import { BsCardList } from "react-icons/bs";

export default function TopPart() {

    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const [list, setList] = React.useState("");
    const [desc, setDesc] = React.useState("");

    async function createList() {
        console.log('List form function');
        if (list !== "") {
            try {
                const query = await fetch(`http://localhost:3000/api/lists`, {
                    method: "POST",
                    body: JSON.stringify({
                        title: list,
                        description: desc
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });

                const result = await query.json();
                console.log(`result = ${result}`);
            } catch (error) {
                console.log(error);
                throw new Error("Error occured while creating a list,please try again");
            }
        }
    }

    function closeHandler() {
        setVisible(false);
    }

    return <>
        <form>
            <Modal blur closeButton open={visible} onClose={closeHandler}>
                <Modal.Header>
                    <Text weight="medium" size="$lg">Create Todo</Text>
                </Modal.Header>
                <Modal.Body>
                    <Input rounded
                        bordered clearable
                        value={list}
                        onChange={(e: React.ChangeEvent<FormElement>) => {
                            setList(e.target.value);
                        }}
                        labelPlaceholder="Name of Todo list" size="md" color="primary" contentLeft={<BsCardList />} />
                    <Textarea label="Description" bordered color="secondary"
                        placeholder="Enter the description of your list"
                        value={desc} onChange={(e: React.ChangeEvent<FormElement>) => {
                            setDesc(e.target.value);
                        }} />
                    <Button size="lg" color="warning" type="submit" onClick={() => {
                        setVisible(false);
                        createList();
                        setList("");
                        setDesc("");
                    }}>Create Todo</Button>
                </Modal.Body>
            </Modal>
        </form>
        <Text h1 weight="bold">Create your Todo List</Text>
        <Button size="lg" onClick={handler}>Create Todo</Button>
    </>
}