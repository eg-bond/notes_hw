/**
 * Hashes a password using SHA-256 and encodes it in Base64.
 *
 * @param password - The plaintext password to hash.
 * @returns A promise that resolves to the hashed password as a Base64 string.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return btoa(hashHex);
};

/**
 * Verifies a plaintext password against a hashed password.
 *
 * @param password - The plaintext password to verify.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the password is correct.
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const newHashedPassword = await hashPassword(password);
  return newHashedPassword === hashedPassword;
};
