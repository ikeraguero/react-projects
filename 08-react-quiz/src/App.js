import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import "./index.css";

export default function App() {
  const initalState = {
    status: "loading",
    questions: [],
  };

  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { status: "ready", questions: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initalState);
  useEffect(function () {
    async function getData() {
      const res = await fetch("http://localhost:9000/questions");
      const data = await res.json();
      dispatch({ type: "dataReceived", payload: data });
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>{state.status === "loading" && <Loader />}</Main>
    </div>
  );
}
