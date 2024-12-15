export const generatePassword = (length: number = 12): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Ensure minimum requirements
  const password = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  // Fill the rest of the password with random characters
  while (password.length < length) {
    const charSet = [lowercase, uppercase, numbers, specialChars];
    const randomSet = charSet[Math.floor(Math.random() * charSet.length)];
    password.push(randomSet[Math.floor(Math.random() * randomSet.length)]);
  }

  // Shuffle the password to randomize the position of required characters
  return password.sort(() => Math.random() - 0.5).join("");
};
