import { registerAs } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default registerAs('configuration', () => ({
  secretJwt: process.env.JWT_CONSTANTS,
  CPTECApiUrl: process.env.CPTEC_API_URL,
}));
