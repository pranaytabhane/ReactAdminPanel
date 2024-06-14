export const formatedDate = (cdate) => {
  const dateObject = new Date(cdate);
  let cmonth = parseInt(dateObject.getMonth()) + 1;
  let year = dateObject.getFullYear();
  let month = ("0" + cmonth).slice("-2");
  let date = ("0" + dateObject.getDate()).slice("-2");

  let hour = ("0" + dateObject.getHours()).slice("-2");
  let minute = ("0" + dateObject.getMinutes()).slice("-2");
  let second = ("0" + dateObject.getSeconds()).slice("-2");

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};

export const getDate = (key = null, date = null) => {
  var dateInstance;
  if (date) {
    dateInstance = new Date(date);
  } else {
    dateInstance = new Date();
  }

  switch (key) {
    case "date":
      return `${("0" + dateInstance.getDate()).slice("-2")}`;

    case "month":
      let month = parseInt(dateInstance.getMonth()) + 1;
      return `${("0" + month).slice("-2")}`;

    default:
      return dateInstance.getFullYear();
  }
};

export const generateTempPassword = () => {
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = lowerCaseChars + upperCaseChars + numberChars + specialChars;
  const passwordLength = Math.floor(Math.random() * 8) + 8; // Generate a random length between 8 and 15

  let password = "";

  // Ensure the password contains at least one of each required character type
  password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
  password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
  password += numberChars[Math.floor(Math.random() * numberChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password length with random characters from all character sets
  for (let i = password.length; i < passwordLength; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to ensure random order
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}
