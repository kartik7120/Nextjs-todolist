import { Container, Loading, Text } from "@nextui-org/react";
import Link from "next/link";
import useSWR from "swr";
import ListCard from '../components/List';
import { ListInterface } from "../models/List";
import styles from "../styles/bottom.module.css";

interface NewListInterface extends ListInterface {
    _id: number
}

const fetchLists = async () => {
    const query = await fetch("/api/lists");
    const result = await query.json();
    return result;
}

export default function BottomList() {

    const { data, error, isLoading } = useSWR<NewListInterface[]>("/api/lists", fetchLists, {
        refreshInterval: 1000
    });

    if (isLoading) {
        return <Loading size="xl" />
    }

    if (error) {
        return <p>Error occured while fetching</p>
    }

    return <Container wrap="wrap">
        <Text id="Lists" h2 size="$5xl">Todo Lists</Text>
        <div className={styles.bottom}>
            {data && data.map((list) => {
                return <ListCard id={list._id} body={list.description} key={list._id!} header={list.title} />
            })}
        </div>
    </Container>
}