import { act } from "react";
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPorpuse: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...action, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payloan,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPorpuse: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return initialStateCustomer;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/deposit", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));

store.dispatch(requestLoan(1000, "Buy a cheap car"));

store.dispatch(payLoan());

function createCustomer(fullname, nationalId) {
  return {
    action: "customer/createCustomer",
    payload: { fullname, nationalId, createdAt: new Date().toISOString() },
  };
}

function updatedName(fullName) {
  return {
    action: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Iker Aguero", "12321312"));
store.dispatch(updatedName(""));
