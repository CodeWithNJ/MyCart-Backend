import crypto from 'crypto';
export const generateSaltAndHashedApiKey = () => {
  const api_key = crypto.randomBytes(16).toString('hex');
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedApiKey = crypto
    .createHmac('sha256', salt)
    .update(api_key)
    .digest('hex');
  return { salt, hashedApiKey };
};
