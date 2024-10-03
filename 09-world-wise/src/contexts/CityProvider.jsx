import { createContext, useState, useEffect, useContext } from "react";

const CityContext = createContext();
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const BASE_URL = "http://localhost:8000/cities";

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL);
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

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
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
