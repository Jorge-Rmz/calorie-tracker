import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActivityAction, activityReducer, ActivityState, initialState } from "../reducers/activityReducer";
import { Activity } from "../interface";
import { categories } from "../data/categories";

interface ActivityProviderProps {
    children: ReactNode;
}

interface ActivityContextProps {
    state: ActivityState;
    dispatch: Dispatch<ActivityAction>;
    caloriesConsumed: number;
    caloriesBurned: number;
    netCalories: number;
    categoryName: (category: Activity['category']) => string[];
    isEmptyActivity: boolean;
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    const [state, dispatch] = useReducer(activityReducer, initialState);

    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities]);
    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities]);
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesBurned, caloriesConsumed]);


    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [state.activities]);
    const isEmptyActivity = useMemo(() => state.activities.length === 0, [state.activities]);

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivity,
        }}
        >
            {children}
        </ActivityContext.Provider>
    )
}