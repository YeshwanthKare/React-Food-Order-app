import { useReducer } from "react";

const reducerFn = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: action.isTouched };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: action.isTouched };
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(reducerFn, {
    value: "",
    isTouched: false,
  });
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  console.log(valueIsValid);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueInputChangeHandler = (e) => {
    // setEnteredValue(e.target.value);
    dispatch({ type: "INPUT", value: e.target.value });
  };

  const valueInputBlurHandler = (e) => {
    // setIsTouched(true);
    dispatch({ type: "BLUR", isTouched: true });
  };

  const reset = () => {
    dispatch({ type: "RESET", isTouched: false });
    // setIsTouched(false);
    // setEnteredValue("");
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
