import { Button, FormElement, Input, Loading, Modal, Navbar, Text, Textarea } from "@nextui-org/react";
import { SlOptions } from "react-icons/sl";
import { Popover } from '@nextui-org/react';
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
import useSWRMutation from "swr/mutation";

interface Props {
    title: string | undefined,
    id: string | undefined
}

async function createTodo(key: string, { arg }: { arg: any }) {
    try {
        console.log(arg);
        const query = await fetch(`/api/lists/${arg.id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: arg.title,
                description: arg.description
            })
        });

        const result = await query.json();
        return result;

    } catch (error) {

    }
}

export default function ListHeader(props: Props) {

    const [visible, setVisible] = React.useState(false);
    const { data, isMutating, trigger } = useSWRMutation(`/api/lists/${props.id}`, createTodo);
    const handler = () => setVisible(true);
    const [todo, setTodo] = React.useState("");
    const [desc, setDesc] = React.useState("");

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return <>
        <Modal closeButton open={visible} onClose={closeHandler}>
            <Modal.Header>
                <Text size="$2xl">Create a Todo</Text>
            </Modal.Header>
            <Modal.Body>
                <Input bordered placeholder="Enter Todo" color="primary" label="Enter Todo" clearable value={todo} onChange={(e: React.ChangeEvent<FormElement>) => {
                    setTodo(e.target.value);
                }} />
                <Textarea bordered placeholder="Enter Description for Todo" color="secondary" label="Description" value={desc} onChange={(e: React.ChangeEvent<FormElement>) => {
                    setDesc(e.target.value);
                }} />
            </Modal.Body>
            <Modal.Footer>
                <Button size="lg" onClick={() => {
                    trigger({ id: props.id, title: todo, description: desc });
                }} disabled={isMutating}>{isMutating ? <Loading /> : 'Create Todo'}</Button>
            </Modal.Footer>
        </Modal>
        <Navbar isBordered variant="floating">
            <Navbar.Brand>
                <Text size="$3xl" h1>{props.title}</Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Button shadow color="warning" size="lg" onClick={() => handler()}><AiOutlinePlus /></Button>
                <Popover>
                    <Popover.Trigger>
                        <Button color="default" ><SlOptions /></Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Button color="primary">Sort by Completed</Button>
                        <Button color="primary">Sort by Incomplete</Button>
                    </Popover.Content>
                </Popover>
            </Navbar.Content>
        </Navbar>
    </>
}