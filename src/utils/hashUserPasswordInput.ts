import bcrypt from 'bcrypt';

export const hashUserPasswordInput = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
