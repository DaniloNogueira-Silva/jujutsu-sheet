import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { PersonagemModule } from './domain/personagem/personagem.module';
import { AtributoModule } from './domain/atributo/atributo.module';

@Module({
  imports: [UserModule, PersonagemModule, AtributoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
