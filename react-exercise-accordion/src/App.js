import "./index.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

function App() {
  return (
    <div className="accordion">
      <Accordion />
    </div>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);
  return faqs.map((faq, i) => (
    <AccordionItem
      title={faq.title}
      num={i + 1}
      onOpen={setCurOpen}
      curOpen={curOpen}
      key={faq.title}
    >
      {faq.text}
    </AccordionItem>
  ));
}

function AccordionItem({ title, num, onOpen, curOpen, children }) {
  const isOpen = curOpen === num;

  function handleOpen() {
    if (isOpen) {
      onOpen(null);
      return;
    }
    onOpen(num);
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleOpen}>
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <div className="content-box">{children}</div> : ""}
    </div>
  );
}

export default App;
