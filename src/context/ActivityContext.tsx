import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { ActivityAction, activityReducer, ActivityState, initialState } from "../reducers/activityReducer";

interface ActivityProviderProps{
    children: ReactNode;
}

interface ActivityContextProps{
    state: ActivityState;
    dispatch: Dispatch<ActivityAction>;
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer,initialState);

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
        }}
        >
            {children}
        </ActivityContext.Provider>
    )
}