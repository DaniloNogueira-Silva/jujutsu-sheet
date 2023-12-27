import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { Atributos } from '@prisma/client';
import { AtributoInterface, AtributoInterfaceUpdate } from './atributo.interface';


@Injectable()
export class AtributoRepository
{
    constructor ( private prisma: PrismaService ) { }

    async findAtributo ( id: number ): Promise<Atributos[]>
    {
        const atributo = await this.prisma.atributos.findMany( {
            where: {
                personagemId: id,
            },
        } );

        return atributo;
    }

    async findByIdAtributo ( id: number ): Promise<Atributos>
    {
        const atributo = await this.prisma.atributos.findUnique( {
            where: {
                atributoId: id,
            },
        } );

        return atributo;
    }

    async createAtributo ( data: AtributoInterface ): Promise<Atributos>
    {
        return this.prisma.atributos.create( {
            data: {
                forca: data.forca,
                forca_modificador: data.forca_modificador,
                destreza: data.destreza,
                destreza_modificador: data.destreza_modificador,
                constituicao: data.constituicao,
                constituicao_modificador: data.constituicao_modificador,
                carisma: data.carisma,
                carisma_modificador: data.carisma_modificador,
                sabedoria: data.sabedoria,
                sabedoria_modificador: data.sabedoria_modificador,
                inteligencia: data.inteligencia,
                inteligencia_modificador: data.inteligencia_modificador,
                personagemId: data.personagemId,
            }
        } );
    }

    async updateAtributo ( id, data: AtributoInterfaceUpdate ): Promise<Atributos>
    {

        return this.prisma.atributos.update( {
            data: {
                forca: data.forca,
                forca_modificador: data.forca_modificador,
                destreza: data.destreza,
                destreza_modificador: data.destreza_modificador,
                constituicao: data.constituicao,
                constituicao_modificador: data.constituicao_modificador,
                carisma: data.carisma,
                carisma_modificador: data.carisma_modificador,
                sabedoria: data.sabedoria,
                sabedoria_modificador: data.sabedoria_modificador,
                inteligencia: data.inteligencia,
                inteligencia_modificador: data.inteligencia_modificador,
            },
            where: { atributoId: id },
        } );
    }

    async deleteAtributo ( id ): Promise<Atributos>
    {
        const parseId = Number( id )
        const atributo = await this.prisma.atributos.delete( {
            where: {
                atributoId: parseId,
            },
        } );

        if ( !atributo )
        {
            throw new NotFoundException( 'Atributo não encontrado' );
        }

        return atributo;;
    }
}
