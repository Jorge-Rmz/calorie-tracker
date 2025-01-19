import { useMemo } from "react";
import { Activity } from "../interface";
import CalorieDisplay from "./CalorieDisplay";

interface CalorieTrackerProps {
    activities: Activity[];
}

function CalorieTracker({ activities }: CalorieTrackerProps) {
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities]);
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities]);

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesBurned, caloriesConsumed]);

    return (
        <>
            <h2 className="text-center text-4xl font-bold text-white">
                Resumen de calorias
            </h2>
            <div className="flex flex-col items-center md:flex-row gap-5 md:justify-between mt-10">

                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Calorias consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Calorias quemadas"
                />

                <CalorieDisplay
                    calories={netCalories}
                    text="Calorias totales"
                />


            </div>

        </>
    );
}

export default CalorieTracker;