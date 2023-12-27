import { Module } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { PersonagemRepository } from './personagem.repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [JwtModule.register({
    secret: `${process.env.TOKEN}`,
    signOptions: {expiresIn: '1d'}
  })],
  providers: [PersonagemService, PersonagemRepository, PrismaService],
  controllers: [PersonagemController]
})
export class PersonagemModule {}
