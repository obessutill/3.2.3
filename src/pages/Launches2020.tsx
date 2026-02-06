import { Container, Title, SimpleGrid, Center, Loader, Text } from "@mantine/core";
import { useEffect, useReducer, useCallback } from "react";
import { fetchLaunches2020 } from "../api/spacex";
import LaunchCard from "../components/LaunchCard";
import LaunchModal from "../components/LaunchModal";
import { initialLaunchesState, launchesReducer } from "../state/launches.reducer";
import type { SpaceXLaunch } from "../state/launches.types";

export default function Launches2020() {
    const [state, dispatch] = useReducer(launchesReducer, initialLaunchesState);

    useEffect(() => {
        let alive = true;
        dispatch({ type: "fetch_started" });

        fetchLaunches2020()
            .then((data) => {
                if (!alive) return;
                dispatch({ type: "fetch_success", payload: data })
            })
            .catch((e: unknown) => {
                if (!alive) return;
                dispatch({ type: "fetch_error", payload: e instanceof Error ? e.message : 'Unknown error' });
            });

            return () => {
                alive = false;
            };
    }, [])

    const openModal = useCallback((launch: SpaceXLaunch) => dispatch({ type: 'open_modal', payload: launch }), [])
    const closeModal = useCallback(() => dispatch({ type: 'close_modal' }), []);

    return (
       <Container size="lg" py="xl">
        <Title ta="center" mb="xl">
            SpaceX Launches 2020
        </Title>

        {state.status === "loading" && (
            <Center>
                <Loader />
            </Center>
        )}

        {state.status === "error" && (
            <Center>
                <Text c="red">{state.error}</Text>
            </Center>
        )}

        {state.status === "success" && (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {state.launches.map((l) => (
                    <LaunchCard key={`${l.mission_name}-${l.launch_year}`} launch={l} onSeeMore={openModal} />
                ))}
            </SimpleGrid>
        )}

        <LaunchModal open={state.isModalOpen} launch={state.selected} onClose={closeModal} />
       </Container> 
    )
} 