import { Container, Loading } from "@nextui-org/react";
import useSWR from "swr";
import ListCard from '../components/List';
import { ListInterface } from "../models/List";
import styles from "../styles/bottom.module.css";

interface NewListInterface extends ListInterface {
    id: number
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
        <div className={styles.bottom}>
            {data && data.map((list) => {
                return <ListCard key={list.id!} body={list.description} header={list.title} />
            })}
        </div>
    </Container>
}