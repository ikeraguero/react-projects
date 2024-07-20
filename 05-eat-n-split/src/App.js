import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showBillSplit, setShowBillSplit] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [bill, setBill] = useState(100);
  const [yourExpense, setYourExpense] = useState(0);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleShowBillSplit(friend) {
    setShowBillSplit(!showBillSplit);
    if (selectedFriend?.id === friend.id) {
      setSelectedFriend(null);
      return;
    }
    setSelectedFriend(friend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleShowBillSplit}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {showBillSplit && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          bill={bill}
          setBill={setBill}
          yourExpense={yourExpense}
          setYourExpense={setYourExpense}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelect={onSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelect, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">{`You owe ${friend.name} ${Math.abs(
          friend.balance
        )}€`}</p>
      )}
      {friend.balance === 0 && <p>{`You and ${friend.name} are even!`}</p>}
      {friend.balance > 0 && (
        <p className="green">
          {`${friend.name} owes you ${Math.abs(friend.balance)}€`}
        </p>
      )}
      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();

    if (!name || !image) return;

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    handleAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🎆 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({
  selectedFriend,
  bill,
  setBill,
  yourExpense,
  setYourExpense,
}) {
  const friendExpense = bill - yourExpense;
  function handleSetBill(e) {
    setBill(+e.target.value);
  }

  function handleSetYourExpense(e) {
    if (+e.target.value > bill) return;
    console.log(+e.target.value);
    setYourExpense(+e.target.value);
  }
  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input type="text" value={bill} onChange={(e) => handleSetBill(e)} />

      <label>🧍‍♂️Your expense</label>
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => handleSetYourExpense(e)}
      />

      <label>👬 {selectedFriend.name}'s expense</label>
      <input type="text" value={friendExpense} disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option>You</option>
        <option>X</option>
      </select>
      <Button>Split the bill</Button>
    </form>
  );
}
