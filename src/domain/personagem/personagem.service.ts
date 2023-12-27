import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PersonagemRepository } from './personagem.repository';
import { Personagem } from '@prisma/client';
import { PersonagemInterface } from './personagem.interface';

@Injectable()
export class PersonagemService
{
    private readonly _log = new Logger( 'personagem_service' );

    constructor (
        private readonly _personagemRepository: PersonagemRepository,
    ) { }

    async find ( id ): Promise<Personagem[]>
    {
        try
        {
            return this._personagemRepository.findPersonagem( id );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi encontrado nenhum usuário.' )
        }
    }

    async create (id,  data: PersonagemInterface ): Promise<Personagem>
    {
        try
        {
            let maestriaNivel
            const nivel = data.nivel

            if ( nivel < 5 )
            {
                maestriaNivel = 2
            } else if ( nivel > 4 && nivel < 9 )
            {
                maestriaNivel = 3
            } else if ( nivel > 8 && nivel < 13 )
            {
                maestriaNivel = 4
            } else if ( nivel > 12 && nivel < 17 )
            {
                maestriaNivel = 5
            } else
            {
                maestriaNivel = 6
            }

            if(nivel < 1 || nivel > 20){
                throw new BadRequestException('O nivel do personagem está fora do aceitável')
            }

            const createParam = {
                nome: data.nome,
                nivel: data.nivel,
                maestria: maestriaNivel,
                origem: data.origem,
                especializacao: data.especializacao,
                tecnica: data.tecnica,
                userId: id,
                campanha: data.campanha,
                grau: data.grau
            }

            return this._personagemRepository.createPersonagem( createParam );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível criar o usuário.' )
        }
    }

    async update ( id, data, userId ): Promise<Personagem>
    {
        try
        {

            let maestriaNivel
            const nivel = data.nivel

            if ( nivel < 5 )
            {
                maestriaNivel = 2
            } else if ( nivel > 4 && nivel < 9 )
            {
                maestriaNivel = 3
            } else if ( nivel > 8 && nivel < 13 )
            {
                maestriaNivel = 4
            } else if ( nivel > 12 && nivel < 17 )
            {
                maestriaNivel = 5
            } else
            {
                maestriaNivel = 6
            }

            if(nivel < 1 || nivel > 20){
                throw new BadRequestException('O nivel do personagem está fora do aceitável')
            }

            const updateParam = {
                nome: data.nome,
                nivel: data.nivel,
                maestria: maestriaNivel,
                origem: data.origem,
                especializacao: data.especializacao,
                tecnica: data.tecnica,
                userId: userId,
                campanha: data.campanha,
                grau: data.grau
            }

            return this._personagemRepository.updatePersonagem( id, updateParam );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível atualizar o usuário.' )
        }
    }

    async delete ( id ): Promise<Personagem>
    {
        try
        {
            return this._personagemRepository.deletePersonagem( id );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível deletar o usuário.' )
        }
    }
}
