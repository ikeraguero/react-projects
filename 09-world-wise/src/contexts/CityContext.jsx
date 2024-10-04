import { createContext, useState, useEffect, useContext } from "react";

const CityContext = createContext();
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:8000";

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res) throw new Error();
        const data = await res.json();
        if (!data) throw new Error();
        setCities(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(cityId) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${cityId}`);
      console.log(res);
      if (!res) throw new Error();
      const data = await res.json();
      if (!data) throw new Error();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CityContext was used outside CityProvider");
  return context;
}

export { useCities, CityProvider };
