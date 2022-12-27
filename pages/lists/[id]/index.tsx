import { Button, Checkbox, Col, Container, Loading, Modal, Row, Text } from "@nextui-org/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ListItem } from "../../../models/ListItem";
import ListHeader from "../../../components/ListHeader";
import List, { ListInterface } from "../../../models/List";
import { BsTrash } from "react-icons/bs";
import useSWRMutation from "swr/mutation";
import styles from "../../../styles/list.module.css";
import React, { useEffect, useState } from "react";
import { Tiro_Gurmukhi } from "@next/font/google";
import { AiOutlineInfoCircle } from "react-icons/ai";
interface Props {
    data: ListInterface,
    title: string,
    listId: string
}

async function MarkList(key: string, { arg }: { arg: any }) {
    try {
        const query = await fetch(key, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId: arg.itemId,
                state: arg.state
            })
        })

        const result = await query.json();
        return result;
    } catch (error) {
        throw new Error("Error occured while marking list items");
    }
}

async function fetchList(key: string, { arg }: { arg: any }) {
    try {
        const query = await fetch(key);
        const result = await query.json();
        return result;
    } catch (error) {
        throw new Error("Error occured while fetching list items");
    }
}

async function deleteItem(key: string, { arg }: { arg: any }) {
    try {
        const query = await fetch(`/api/lists/${arg.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId: arg.itemId,
            })
        });

        const result = await query.json();
        return result;

    } catch (error) {
    }
}

export default function SingleList() {
    const { query, isReady } = useRouter();
    const [shouldFetch, setShouldFetch] = useState(false);

    const { data, error, isMutating: loading, trigger: tri } = useSWRMutation<ListInterface>(`/api/lists/${query.id}`, fetchList);
    const { trigger: tri2, isMutating: mut } = useSWRMutation<ListInterface>(`/api/lists/${query.id}`, MarkList);
    useEffect(() => {
        console.log(`value of isReady = ${isReady} and value of id = ${query.id}`)
        if (isReady) {
            setShouldFetch((oldstate) => {
                tri();
                return true;
            });
        }
    }, [isReady, query, tri])


    const { isMutating, data: newData, trigger } = useSWRMutation(`/api/list/${query.id}`, deleteItem);
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    if (loading) {
        return <Loading />
    }


    return <Container responsive>
        <ListHeader id={data && data._id} title={data && data.title || "Untitled"} />
        <Container>
            <Text size="$lg" weight="medium">{data && data.description || "No Description available for this Todo"}</Text>
        </Container>
        <div className={styles.wrapper}>
            {data && data.items?.map((item, index: number) => {
                return <>
                    <Modal closeButton open={visible} onClose={closeHandler}>
                        <Modal.Header>
                            <Text size="$2xl" h2>{item.title}</Text>
                        </Modal.Header>
                        <Modal.Body>
                            <Text size="$xl">
                                Description of todo:
                            </Text>
                            <Text>{item.description}</Text>
                        </Modal.Body>
                    </Modal>
                    <Checkbox isDisabled={mut} onClick={() => {
                        tri2({ itemId: item._id, state: item.checked });
                    }} lineThrough defaultSelected={item.checked} value={item.title + ',' + item._id} key={item._id}>
                        <div className={styles.wrapper2}>
                            <Text size="$3xl">{item.title}</Text>
                            <Button color="error" onClick={() => {
                                trigger({ id: query.id, itemId: item._id })
                            }}>{isMutating ? <Loading /> : <BsTrash />}</Button>
                            <Button color="primary" onClick={handler}><AiOutlineInfoCircle /></Button>
                        </div>
                    </Checkbox>
                </>
            })}
        </div>
    </Container>
}