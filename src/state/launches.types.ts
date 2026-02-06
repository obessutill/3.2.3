export type SpaceXLaunch = {
    mission_name: string,
    launch_year: string,
    details: string | null,
    links?: {
        mission_patch_small?: string | null,
        mission_patch?: string | null,
    }
    rocket?: {
        rocket_name: string | null,
    }
}

export type LaunchesState = {
    status: 'idle' | 'loading' | 'success' | 'error',
    error: string | null,
    launches: SpaceXLaunch[],
    selected: SpaceXLaunch | null,
    isModalOpen: boolean, 
}

export type LaunchesAction = 
| { type: 'fetch_started' }
| { type: 'fetch_success', payload: SpaceXLaunch[] }
| { type: 'fetch_error', payload: string }
| { type: 'open_modal', payload: SpaceXLaunch }
| { type: 'close_modal' }