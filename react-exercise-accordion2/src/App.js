import { useState } from "react";
import data from "./data.js";
import "./styles.css";

function App() {
  const [multiselection, setMultiselection] = useState(true);
  const [openItems, setOpenItems] = useState([]);

  function handleClickMultiselection() {
    setMultiselection(!multiselection);
    setOpenItems([]);
  }

  return (
    <div className="acc-wrapper">
      <Button onClick={handleClickMultiselection}>
        {multiselection ? "Disable" : "Enable"} multiselection
      </Button>
      <div className="accordion">
        <Accordion
          multiselection={multiselection}
          setOpenItems={setOpenItems}
          openItems={openItems}
        />
      </div>
    </div>
  );
}

function Accordion({ multiselection, setOpenItems, openItems }) {
  return (
    <div>
      {data.map((question) => (
        <AccordionItem
          questionObj={question}
          key={question.id}
          multiselection={multiselection}
          openItems={openItems}
          setOpenItems={setOpenItems}
        />
      ))}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AccordionItem({
  questionObj,
  multiselection,
  openItems,
  setOpenItems,
}) {
  const isOpen = openItems.includes(questionObj);

  function handleOpen() {
    console.log(multiselection, isOpen);
    if (multiselection) {
      if (isOpen) {
        setOpenItems(openItems.filter((id) => id !== questionObj.id));
      } else {
        setOpenItems((openItems) => [...openItems, questionObj]);
        console.log(openItems);
      }
    }
    if (!multiselection) {
      setOpenItems(isOpen ? [] : [questionObj]);
    }
  }

  return (
    <>
      <div className="item" onClick={handleOpen}>
        <div className="written-content">
          <h3 className="title">{questionObj.question}</h3>
          {isOpen && <p className="acc-content">{questionObj.answer}</p>}
        </div>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
    </>
  );
}

export default App;
