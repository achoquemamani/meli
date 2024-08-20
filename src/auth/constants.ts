import { registerAs } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default registerAs('jwtConstants', () => ({
  secret: process.env.JWT_CONSTANTS,
}));
