import { Card, Image, Text, Button, Stack } from "@mantine/core";
import type { SpaceXLaunch } from "../state/launches.types";

export default function LaunchCard({ launch, onSeeMore }: { launch: SpaceXLaunch, onSeeMore: (launch: SpaceXLaunch) => void }) {
    return ( 
        <Card shadow="sm" padding="md" radius="md" withBorder>
            <Stack align="center" gap="sm">
                <Image 
                src={launch.links?.mission_patch_small ?? undefined}
                alt={launch.mission_name}
                w={90}
                h={90}
                fit="contain"
                />
                <Text fw={600} ta="center" lineClamp={1}>
                    {launch.mission_name}
                </Text>
                <Text c="dimmed" ta="center">
                    {launch.rocket?.rocket_name ?? "Unknown rocket"}
                </Text>
                <Button fullWidth onClick={() => onSeeMore(launch)}>
                    See more
                </Button>
            </Stack>
        </Card>
    )
}