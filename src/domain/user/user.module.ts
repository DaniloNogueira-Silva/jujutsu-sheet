import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepotisory } from './user.repository';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [JwtModule.register({
    secret: `${process.env.TOKEN}`,
    signOptions: {expiresIn: '1d'}
  })],
  providers: [UserService, UserRepotisory, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
