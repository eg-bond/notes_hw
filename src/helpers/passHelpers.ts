import { sha256 } from 'js-sha256';
/**
 * Hashes a password using SHA-256 and encodes it in Base64.
 *
 * @param password - The plaintext password to hash.
 * @returns hashed password as a Base64 string.
 */

export const hashPassword = (password: string): string => {
  const hashHex = sha256(password);
  return btoa(hashHex);
};

/**
 * Verifies a plaintext password against a hashed password.
 *
 * @param password - The plaintext password to verify.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A boolean indicating whether the password is correct.
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const newHashedPassword = hashPassword(password);
  return newHashedPassword === hashedPassword;
};
