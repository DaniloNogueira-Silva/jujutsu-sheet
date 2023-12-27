import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Atributos } from '@prisma/client';
import { AtributosService } from './atributo.service';
import { AtributoInterface, AtributoInterfaceUpdate } from './atributo.interface';

@Controller( 'atributo' )
export class AtributoController
{
    constructor (
        private readonly personagemService: AtributosService,
    ) { }

    @Get(':id')
    async getPersonagem (
        @Param() id: number
    ): Promise<Atributos[]>
    {

        return this.personagemService.find( id );
    }

    @Post(':id')
    async createPersonagem ( @Body() data: AtributoInterface, @Param() id: number ): Promise<Atributos>
    {
        return this.personagemService.create( id, data );
    }

    @Put(':id')
    async updatePersonagem (@Body() data: AtributoInterfaceUpdate, @Param() id: number ): Promise<Atributos>
    {

        return this.personagemService.update( id, data );
    }

    @Delete(':id')
    async deletePersonagem (@Param() id: number ): Promise<Atributos>
    {

        return this.personagemService.delete( id );
    }
}
