import DateCounter from "./DateCounter.js";
import Header from "./Header.js";
import Main from "./Main.js";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>15 questions</p>
      </Main>
    </div>
  );
}
