import bcrypt from 'bcrypt';

const DEFAULT_ROUNDS = Number(process.env.BCRYPT_ROUNDS ?? 12);
export const hashPassword = async (password: string, rounds = DEFAULT_ROUNDS): Promise<string> => {
  try {
    return await bcrypt.hash(password, rounds);
  } catch (error) {
    throw new Error(`Failed to hash password: ${(error as Error).message}`);
  }
};
