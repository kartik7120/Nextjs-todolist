import { Button, Container, FormElement, Text, Textarea } from "@nextui-org/react";
import { Modal, Input } from "@nextui-org/react";
import React from "react";
import { BsCardList } from "react-icons/bs";
import useSWRMutation from "swr/mutation";

async function deleteAllTodos(key: string) {
    try {
        const query = await fetch(key, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Contert-Type": "application/json"
            }
        })

        const result = await query.json();
        return result;

    } catch (error) {
        throw new Error("Error occured while deleting all the todos")
    }
}

export default function TopPart() {

    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const handler = () => setVisible(true);
    const handler2 = () => setVisible2(true);
    const [list, setList] = React.useState("");
    const [desc, setDesc] = React.useState("");

    const { isMutating, data, trigger } = useSWRMutation(`api/lists`, deleteAllTodos);

    async function createList() {
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
            } catch (error) {
                console.log(error);
                throw new Error("Error occured while creating a list,please try again");
            }
        }
    }

    function closeHandler() {
        setVisible(false);
    }

    function closeHandler2() {
        setVisible2(false);
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
            <Modal blur closeButton open={visible2} onClose={closeHandler2}>
                <Modal.Header>
                    <Text weight="medium" size="$lg">Are You Sure ?</Text>
                </Modal.Header>
                <Modal.Body>
                    <Button size="lg" onClick={() => trigger()}>Yes</Button>
                    <Button size="lg" color="default" onClick={closeHandler2}>No</Button>
                </Modal.Body>
            </Modal>
        </form>
        <Container wrap="wrap" direction="column" justify="space-between" alignItems="center" responsive>
            <Text h1 weight="bold">Create your Todo List</Text>
            <Container justify="flex-start" alignItems="flex-start" display="flex" wrap="wrap">
                <Button size="lg" onClick={handler}>Create Todo</Button>
                <Button size="lg" color="error" onClick={handler2}>Clear all todo lists</Button>
            </Container>
        </Container>
    </>
}