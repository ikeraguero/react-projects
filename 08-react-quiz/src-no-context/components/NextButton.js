function NextButton({ dispatch, answer, index, status }) {
  if (answer === null && status !== "finish") return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: `${
            index < 14 && status === "active"
              ? "nextQuestion"
              : status === "finish"
              ? "restart"
              : "finish"
          }`,
        })
      }
    >
      {index < 14 && status === "active"
        ? "Next"
        : status === "finish"
        ? "Restart"
        : "Finish"}
    </button>
  );
}

export default NextButton;
