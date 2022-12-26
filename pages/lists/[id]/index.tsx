import { Button, Checkbox, Container, Text } from "@nextui-org/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ListItem } from "../../../models/ListItem";
import ListHeader from "../../../components/ListHeader";
import List, { ListInterface } from "../../../models/List";
import { BsTrash } from "react-icons/bs";

interface Props {
    data: ListInterface,
    title: string,
    listId: string
}

export default function SingleList(props: Props) {
    const { query } = useRouter();

    const { data, error } = useSWR<ListInterface>(`/api/lists/${query.id}`);

    return <Container responsive>
        <ListHeader id={props.listId} title={props.title || "Untitled"} />
        <Container>
            <Text size="$lg" weight="medium">{props.data.description}</Text>
        </Container>
        <Checkbox.Group color="gradient" label="todos">
            {props.data.items?.map((item, index: number) => {
                return <Checkbox key={item._id}>
                    <Text size="$3xl">{item.title}</Text>
                    <Button color="error"><BsTrash /></Button>
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