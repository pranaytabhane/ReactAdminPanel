export const validation = {
  validateEmail: val => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    );
  },
  validatePassword: val => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,30}$/.test(
      val
    );
  },
  isValidPostalCode : (postalCode, countryCode) => {
    let postalCodeRegex;
    switch (countryCode) {
      case "US":
        postalCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
        break;
      case "CA":
        postalCodeRegex = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
        break;
      default:
        postalCodeRegex = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
    }
    return postalCodeRegex.test(postalCode);
  }
};
