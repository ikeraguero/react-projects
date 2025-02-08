import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  const {
    balance,
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    isLoading,
  } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  function handleDeposit() {
    if (depositAmount < 0 || depositAmount === 0) return;
    dispatch(deposit(+depositAmount, currency));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (withdrawalAmount > balance || withdrawalAmount === 0) return;
    dispatch(withdraw(+withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (loanAmount === 0) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanPurpose("");
    setLoanAmount("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => {
              if (+e.target.value < 0) return;
              setDepositAmount(+e.target.value);
            }}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>
            {isLoading ? "Converting currency..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => {
              if (+e.target.value < 0) return;
              setWithdrawalAmount(+e.target.value);
            }}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => {
              if (+e.target.value < 0) return;
              setLoanAmount(+e.target.value);
            }}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRequestLoan();
            }}
          >
            Request loan
          </button>
        </div>

        <div>
          {currentLoan > 0 && (
            <>
              <span>Pay back ${`${currentLoan} (${currentLoanPurpose})`}</span>
              <button onClick={handlePayLoan}>Pay loan</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
