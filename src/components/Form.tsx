import { categories } from "../data/categories";
import { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { v4 as uuidV4 } from 'uuid';
import { Activity, Category } from "../interface";
import { ActivityAction, ActivityState } from "../reducers/activityReducer";
import { useActivity } from "../hooks/useActivity";


const initialState: Activity = {
    id: uuidV4(),
    category: 1,
    name: '',
    calories: 0
}
function Form() {
    const {state,dispatch} = useActivity();
    useEffect(() => {
        if (state.activeId !== '') {
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
            setActivity(selectActivity);
        }

    }, [state.activeId]);

    const [activity, setActivity] = useState<Activity>(initialState);
    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value,
        });

    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.trim() !== '' && calories > 0;
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch({
            type: 'save-activity',
            payload: { newActivity: activity }
        });

        setActivity({ ...initialState, id: uuidV4() });
    }


    return (
        <form className="space-y-5 bg-white p-10 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-blod">
                    Categoría:
                </label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map((category: Category) => (
                        <option key={category.id} value={category.id} >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-blod">
                    Actividad:
                </label>
                <input type="text" id="name"
                    className="border border-slate-300 p-2 rounded-lg "
                    placeholder="Ejemplo: Correr 30 minutos Comida, Jugo de naranja, Ensalada, Pesa."
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-blod">
                    Calorias:
                </label>
                <input type="number" id="calories"
                    className="border border-slate-300 p-2 rounded-lg "
                    placeholder="Ejemplo: 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            <input
                disabled={!isValidActivity()}
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white rounded-lg disabled:opacity-10"
                value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
            />
        </form>
    );
}

export default Form;
