import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AtributosService } from './atributo.service';
import { AtributoRepository } from './atributo.repository';
import { AtributoController } from './atributo.controller';

@Module({
  providers: [AtributosService, AtributoRepository, PrismaService],
  controllers: [AtributoController]
})
export class AtributoModule {}
