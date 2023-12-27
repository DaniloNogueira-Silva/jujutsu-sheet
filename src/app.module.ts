import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { PersonagemModule } from './domain/personagem/personagem.module';

@Module({
  imports: [UserModule, PersonagemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
