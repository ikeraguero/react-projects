import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CitiesList from "./components/CitiesList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const BASE_URL = "http://localhost:8000/cities";

  useEffect(function () {
    async function fetchCities() {
      setIsLoading(true);
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setCities(data);
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>List of cities</p>}></Route>
          <Route path="cities" element={<CitiesList cities={cities} />}></Route>
          <Route path="countries" element={<p>List of countries</p>}></Route>
          <Route path="form" element={<p>Form</p>}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
