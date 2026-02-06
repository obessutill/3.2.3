import type { LaunchesAction, LaunchesState } from './launches.types';

export type { LaunchesState, LaunchesAction } from './launches.types';

export const initialLaunchesState: LaunchesState = {
    status: 'idle',
    error: null,
    launches: [],
    selected: null,
    isModalOpen: false,
}

export function launchesReducer(state: LaunchesState, action: LaunchesAction) : LaunchesState {
    switch(action.type) {
        case 'fetch_started':
        return {
            ...state,
            status: 'loading',
            error: null,
        }
        case 'fetch_success':
        return {
            ...state,
            status: 'success',
            launches: action.payload,
        }
        case 'fetch_error':
        return {
            ...state,
            status: 'error',
            error: action.payload,
        }
        case 'open_modal':
        return {
            ...state,
            isModalOpen: true,
            selected: action.payload,
        }
        case 'close_modal':
        return {
            ...state,
            isModalOpen: false,
            selected: null,
        }
        default:
            return state;
    }
}