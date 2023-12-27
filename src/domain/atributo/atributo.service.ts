import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AtributoRepository } from './atributo.repository';
import { Atributos } from '@prisma/client';
import { AtributoInterface, AtributoInterfaceUpdate } from './atributo.interface';

@Injectable()
export class AtributosService
{
    private readonly _log = new Logger( 'atributos_service' );

    constructor (
        private readonly _atributosRepository: AtributoRepository,
    ) { }

    async find ( id ): Promise<Atributos[]>
    {
        try
        {
            const parseId = Number( id.id );
            return this._atributosRepository.findAtributo( parseId );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi encontrado nenhum atributo.' )
        }
    }

    async create ( id, data: AtributoInterface ): Promise<Atributos>
    {
        try
        {

            const forMod = Math.floor( ( data.forca - 10 ) / 2 );
            const desMod = Math.floor( ( data.destreza - 10 ) / 2 );
            const conMod = Math.floor( ( data.constituicao - 10 ) / 2 );
            const intMod = Math.floor( ( data.inteligencia - 10 ) / 2 );
            const sabMod = Math.floor( ( data.sabedoria - 10 ) / 2 );
            const carMod = Math.floor( ( data.carisma - 10 ) / 2 );

            const parseId = Number( id.id );

            const createParam = {
                forca: data.forca,
                forca_modificador: forMod,
                destreza: data.destreza,
                destreza_modificador: desMod,
                constituicao: data.constituicao,
                constituicao_modificador: conMod,
                inteligencia: data.inteligencia,
                inteligencia_modificador: intMod,
                sabedoria: data.sabedoria,
                sabedoria_modificador: sabMod,
                carisma: data.carisma,
                carisma_modificador: carMod,
                personagemId: parseId
            }

            return this._atributosRepository.createAtributo( createParam );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível criar o atributo.' )
        }
    }

    async update ( id, data: AtributoInterfaceUpdate ): Promise<Atributos>
    {
        try
        {
            const parseId = Number( id.id );

            const atr = await this._atributosRepository.findByIdAtributo( parseId );

            const forMod = Math.floor( ( ( data.forca || atr.forca ) - 10 ) / 2 );
            const desMod = Math.floor( ( ( data.destreza || atr.destreza ) - 10 ) / 2 );
            const conMod = Math.floor( ( ( data.constituicao || atr.constituicao ) - 10 ) / 2 );
            const intMod = Math.floor( ( ( data.inteligencia || atr.inteligencia ) - 10 ) / 2 );
            const sabMod = Math.floor( ( ( data.sabedoria || atr.sabedoria ) - 10 ) / 2 );
            const carMod = Math.floor( ( ( data.carisma || atr.carisma ) - 10 ) / 2 );



            const updateParam = {
                forca: ( data.forca || atr.forca ),
                forca_modificador: forMod,
                destreza: ( data.destreza || atr.destreza ),
                destreza_modificador: desMod,
                constituicao: ( data.constituicao || atr.constituicao ),
                constituicao_modificador: conMod,
                inteligencia: ( data.inteligencia || atr.inteligencia ),
                inteligencia_modificador: intMod,
                sabedoria: ( data.sabedoria || atr.sabedoria ),
                sabedoria_modificador: sabMod,
                carisma: ( data.carisma || atr.carisma ),
                carisma_modificador: carMod,
                personagemId: parseId
            }

            return this._atributosRepository.updateAtributo( parseId, updateParam );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível atualizar o atributo.' )
        }
    }

    async delete ( id ): Promise<Atributos>
    {
        try
        {
            const parseId = Number( id.id );
            return this._atributosRepository.deleteAtributo( parseId );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível deletar o atributo.' )
        }
    }
}
