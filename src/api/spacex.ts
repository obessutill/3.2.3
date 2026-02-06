import type { SpaceXLaunch } from "../state/launches.types";

const BASE = "https://api.spacexdata.com/v3/launches";

export async function fetchLaunches2020(): Promise<SpaceXLaunch[]> {
    const res = await fetch(`${BASE}?launch_year=2020`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as SpaceXLaunch[];
}