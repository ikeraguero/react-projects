import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating
      color="#fcc419"
      size={42}
      messages={["Terrible", "Bad", "Ok", "Good", "Awesome"]}
    />
  </React.StrictMode>
);
