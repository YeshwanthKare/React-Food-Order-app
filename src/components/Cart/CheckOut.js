import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import classes from "./CheckOut.module.css";

// const isEmpty = (value) => value.trim() === "";
// const isFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    // hasError: nameInputIsInvalid,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    // hasError: streetInputIsInvalid,
    valueInputChangeHandler: streetInputChangeHandler,
    valueInputBlurHandler: streetInputBlurHandler,
    reset: resetStreet,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    // hasError: postalCodeInputIsInvalid,
    valueInputChangeHandler: postalCodeInputHandler,
    valueInputBlurHandler: postalCodeInputBlurHandler,
    reset: resetPostalCode,
  } = useInput((value) => value.trim().length === 5);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    // hasError: cityInputIsInvalid,
    valueInputChangeHandler: cityInputChangeHandler,
    valueInputBlurHandler: cityInputBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  // const enteredNameIsValid = !isEmpty(enteredName);
  // const enteredStreetIsValid = !isEmpty(enteredStreet);
  // const enteredCityIsValid = !isEmpty(enteredCity);
  // const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

  const confirmHandler = (e) => {
    e.preventDefault();

    setFormInputsValidity({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
    let formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
  };

  const nameInputValidityClasses = `${classes.control} ${
    !formInputsValidity.name ? classes.invalid : ""
  }`;
  const streetInputValidityClasses = `${classes.control} ${
    !formInputsValidity.street ? classes.invalid : ""
  }`;
  const postalCodeInputValidityClasses = `${classes.control} ${
    !formInputsValidity.postalCode ? classes.invalid : ""
  }`;
  const cityInputValidityClasses = `${classes.control} ${
    !formInputsValidity.city ? classes.invalid : ""
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
        {!formInputsValidity.name && <p>Please enter Valid Name!</p>}
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
        {!formInputsValidity.street && <p>Please enter Valid Street!</p>}
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
        {!formInputsValidity.postalCode && (
          <p>Please enter Valid Postal code!</p>
        )}
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
        {!formInputsValidity.city && <p>Please enter Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
