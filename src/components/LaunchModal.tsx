import { Paper, Image, Text, Group } from "@mantine/core";
import Portal from "./Portal";
import type { SpaceXLaunch } from "../state/launches.types";
import { useEffect } from "react";

export default function LaunchModal({ open, launch, onClose }: { open: boolean, launch: SpaceXLaunch | null, onClose: () => void }) {
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open || !launch) return null;

    return (
        <Portal>
            <div
            role="dialog"
            aria-modal="true"
            onMouseDown={onClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                zIndex: 9999,
            }}
            >
                <Paper
                p="lg"
                radius="md"
                style={{ width: "min(720px, 100%)", maxHeight: "80vh", overflow: "auto" }}
                onMouseDown={(e) => e.stopPropagation()}
                >
                    <Group justify="space-between" mb="sm">
                        <Text fw={600}>{launch.mission_name}</Text>
                        <button
                        aria-label="Close"
                        onClick={onClose}
                        style={{ border: "none", background: "transparent", fontSize: 18, cursor: "pointer" }}
                        >
                         ✕   
                        </button>
                    </Group>

                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                        <Image 
                        src={launch.links?.mission_patch ?? undefined}
                        alt={launch.mission_name}
                        w={180}
                        h={180}
                        fit="contain"/>
                    </div>

                    <Text fw={600}>Mission name:</Text>
                    <Text mb="sm">{launch.mission_name}</Text>

                    <Text fw={600}>Rocket name:</Text>
                    <Text mb="sm">{launch.rocket?.rocket_name ?? "Unknown rocket"}</Text>

                    <Text fw={600}>Details:</Text>
                    <Text c="dimmed">{launch.details ?? "No details provided"}</Text>
                </Paper>
            </div>
        </Portal>
    )
}