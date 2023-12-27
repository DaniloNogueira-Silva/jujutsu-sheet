import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PersonagemInterface } from './personagem.interface';
import { Personagem } from '@prisma/client';


@Injectable()
export class PersonagemRepository
{
    constructor ( private prisma: PrismaService ) { }

    async findPersonagem ( id: number ): Promise<Personagem[]>
    {
        const personagem = await this.prisma.personagem.findMany( {
            where: {
                userId: id,
            },
        } );

        return personagem;
    }

    async createPersonagem ( data: PersonagemInterface ): Promise<Personagem>
    {
        return this.prisma.personagem.create( {
            data: {
                nome: data.nome,
                userId: data.userId,
                nivel: data.nivel,
                origem: data.origem,
                maestria: data.maestria,
                especializacao: data.especializacao,
                tecnica: data.tecnica,
                campanha: data.campanha,
                grau: data.grau
            }
        } );
    }

    async updatePersonagem ( id, data: PersonagemInterface ): Promise<Personagem>
    {

        console.log( id )
        return this.prisma.personagem.update( {
            data: {
                nome: data.nome,
                userId: data.userId,
                nivel: data.nivel,
                origem: data.origem,
                maestria: data.maestria,
                especializacao: data.especializacao,
                tecnica: data.tecnica,
                campanha: data.campanha,
                grau: data.grau
            },
            where: { personagemId: id },
        } );
    }

    async deletePersonagem ( id ): Promise<Personagem>
    {
        const parseId = Number(id)
        const personagem = await this.prisma.personagem.delete( {
            where: {
                personagemId: parseId,
            },
        } );

        if ( !personagem )
        {
            throw new NotFoundException( 'Personagem não encontrado' );
        }

        return personagem;;
    }
}
