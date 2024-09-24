import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
