import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

function CalorieTracker() {
    const {caloriesConsumed, caloriesBurned, netCalories} = useActivity();

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