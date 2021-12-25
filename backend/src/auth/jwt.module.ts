import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
const options = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '30d' },
};

export default JwtModule.register(options);
