import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
}
export function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:9000";

  useEffect(function () {
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        alert("There was an error fetching the cities...");
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        alert("There was an error fetching the city...");
      }
    },
    [currentCity.id]
  );

  async function createCity(data) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cretedCity = await res.json();
      dispatch({ type: "city/created", payload: cretedCity });

      navigate("/app/cities");
    } catch (err) {
      alert("There was an error creating the city");
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      alert("Error deleting city");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  return useContext(CitiesContext);
}
