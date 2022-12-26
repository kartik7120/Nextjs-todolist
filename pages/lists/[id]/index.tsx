import { Button, Checkbox, Container, Loading, Text } from "@nextui-org/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ListItem } from "../../../models/ListItem";
import ListHeader from "../../../components/ListHeader";
import List, { ListInterface } from "../../../models/List";
import { BsTrash } from "react-icons/bs";
import useSWRMutation from "swr/mutation";

interface Props {
    data: ListInterface,
    title: string,
    listId: string
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
                itemId: arg.itemId
            })
        });

        const result = await query.json();
        return result;

    } catch (error) {
    }
}

export default function SingleList(props: Props) {
    const { query, isReady } = useRouter();

    const { data, error } = useSWR<ListInterface>(`/api/lists/${query.id}`);
    const { isMutating, data: newData, trigger } = useSWRMutation(`/api/list/${query.id}`, deleteItem)

    return <Container responsive>
        <ListHeader id={props.listId} title={props.title || "Untitled"} />
        <Container>
            <Text size="$lg" weight="medium">{props.data.description}</Text>
        </Container>
        <Checkbox.Group color="gradient" label="todos">
            {props.data.items?.map((item, index: number) => {
                return <Checkbox value={item.title + ',' + item._id} key={item._id}>
                    <Text size="$3xl">{item.title}</Text>
                    <Button color="error" onClick={() => {
                        trigger({ id: query.id, itemId: item._id })
                    }}>{isMutating ? <Loading /> : <BsTrash />}</Button>
                </Checkbox>
            })}
        </Checkbox.Group>
    </Container>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (params && (params.id === null || params.id === undefined)) {
        return {
            notFound: true
        }
    }

    try {
        const query = await List.findById(params && params.id ? params.id : undefined).populate("items").lean();
        const result = JSON.parse(JSON.stringify(query));
        return {
            props: {
                data: result,
                title: result.title,
                listId: result._id
            }
        }
    } catch (error) {
        return {
            props: {
                data: new Array(0)
            }
        }
    }
} 