function RestartButton({ dispatch }) {
  function handleRestart() {
    dispatch({ type: "restart" });
  }
  return (
    <div>
      <button className="btn btn-ui" onClick={() => handleRestart()}>
        Restart
      </button>
    </div>
  );
}

export default RestartButton;
