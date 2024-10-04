import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./index.css";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import CitiesList from "./components/CitiesList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityProvider } from "./contexts/CityContext";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />}></Route>
            <Route path="cities" element={<CitiesList />}></Route>
            <Route path="cities/:id" element={<City />}></Route>
            <Route path="countries" element={<CountryList />}></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
