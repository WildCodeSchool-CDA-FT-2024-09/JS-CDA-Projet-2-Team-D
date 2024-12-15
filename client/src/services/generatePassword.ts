export const generatePassword = (length: number = 12): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*";

  // Ensure minimum requirements
  const password = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  // Fill the rest with predominantly lowercase letters
  while (password.length < length) {
    password.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
  }

  // Shuffle the password to randomize the position of required characters
  return password.sort(() => Math.random() - 0.5).join("");
};
