export type GeneratePasswordType = "uppercase" | "lowercase" | "specialChar";

export type GeneratePasswordOptions = Record<GeneratePasswordType, boolean>;

export function getRandomChar(min: number, max: number) {
  const limit = max - min + 1;
  return String.fromCharCode(Math.floor(Math.random() * limit + min));
}

export function getSpecialChar() {
  const specialChar = "!@#$%^&*()_+[]{}|;:,.<>?";
  const picedChar = Math.floor(Math.random() * specialChar.length);
  return specialChar[picedChar];
}

export function generatePassword(
  options: GeneratePasswordOptions,
  passwordLength: number
) {
  let password = "";
  let charTypes = [];

  if (options.uppercase) charTypes.push(() => getRandomChar(65, 90));
  if (options.lowercase) charTypes.push(() => getRandomChar(97, 122));
  if (options.specialChar) charTypes.push(() => getSpecialChar());

  charTypes.push(() => getRandomChar(48, 57));

  for (let i = 0; i < passwordLength; i++) {
    const randomTypeIndex = Math.floor(Math.random() * charTypes.length);

    password += charTypes[randomTypeIndex]();
  }

  return password;
}
