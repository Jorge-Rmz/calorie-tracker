import Form from "./components/Form";
import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const cantRestartApp = useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3 itmes-center">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg fontbold text-white uppercase">
            Contador de calorias
          </h1>
          <button
            disabled={!cantRestartApp}
            onClick={() => dispatch({ type: 'restart-app' })}
            className="text-white text-sm uppercase font-bold px-3 py-2 bg-gray-800 hover:bg-gray-900 rounded-lg cursor-pointer disabled:opacity-15"
          >Reniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">

        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />

      </section>
    </>
  );
}

export default App;
