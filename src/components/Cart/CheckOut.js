import React, { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    if (!formIsValid) {
      return;
    }

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    cityInputRef.current.value = "";
    postalCodeInputRef.current.value = "";
  };

  const nameInputValidityClasses = `${classes.control} ${
    !formInputValidity.name ? classes.invalid : ""
  }`;
  const streetInputValidityClasses = `${classes.control} ${
    !formInputValidity.street ? classes.invalid : ""
  }`;
  const postalCodeInputValidityClasses = `${classes.control} ${
    !formInputValidity.postalCode ? classes.invalid : ""
  }`;
  const cityInputValidityClasses = `${classes.control} ${
    !formInputValidity.city ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputValidityClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter Valid Name!</p>}
      </div>
      <div className={streetInputValidityClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter Valid Street!</p>}
      </div>
      <div className={postalCodeInputValidityClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter Valid Postal code!</p>
        )}
      </div>
      <div className={cityInputValidityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter Valid City!</p>}
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
