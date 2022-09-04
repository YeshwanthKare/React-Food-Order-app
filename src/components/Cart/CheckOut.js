import React from "react";
import useInput from "../../hooks/use-input";
import classes from "./CheckOut.module.css";

// const isEmpty = (value) => value.trim() === "";
// const isFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputIsInvalid,
    valueInputChangeHandler: streetInputChangeHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputIsInvalid,
    valueInputChangeHandler: postalCodeInputHandler,
    valueInputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCode,
  } = useInput((value) => value.trim().length === 5);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputIsInvalid,
    valueInputChangeHandler: cityInputChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  // const enteredNameIsValid = !isEmpty(enteredName);
  // const enteredStreetIsValid = !isEmpty(enteredStreet);
  // const enteredCityIsValid = !isEmpty(enteredCity);
  // const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
  let formIsValid =
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid;

  const confirmHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log({ enteredCity, enteredName, enteredStreet, enteredPostalCode });

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameInputValidityClasses = `${classes.control} ${
    nameInputIsInvalid ? classes.invalid : ""
  }`;
  const streetInputValidityClasses = `${classes.control} ${
    streetInputIsInvalid ? classes.invalid : ""
  }`;
  const postalCodeInputValidityClasses = `${classes.control} ${
    postalCodeInputIsInvalid ? classes.invalid : ""
  }`;
  const cityInputValidityClasses = `${classes.control} ${
    cityInputIsInvalid ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputValidityClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && <p>Please enter Valid Name!</p>}
      </div>
      <div className={streetInputValidityClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {streetInputIsInvalid && <p>Please enter Valid Street!</p>}
      </div>
      <div className={postalCodeInputValidityClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeInputHandler}
          onBlur={postalCodeInputBlurHandler}
        />
        {postalCodeInputIsInvalid && <p>Please enter Valid Postal code!</p>}
      </div>
      <div className={cityInputValidityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {cityInputIsInvalid && <p>Please enter Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
