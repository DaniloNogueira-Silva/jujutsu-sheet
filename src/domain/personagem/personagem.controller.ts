import { Controller, Get, Post, Put, Delete, Body, Req, Param } from '@nestjs/common';
import { Personagem } from '@prisma/client';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PersonagemService } from './personagem.service';
import { PersonagemInterface } from './personagem.interface';

@Controller( 'personagem' )
export class PersonagemController
{
    constructor (
        private readonly personagemService: PersonagemService,
        private readonly _jwtService: JwtService
    ) { }

    @Get()
    async getPersonagem (
        @Req() request: Request
    ): Promise<Personagem[]>
    {
        const cookie = request.cookies[ 'jwt' ];

        const data = await this._jwtService.verifyAsync( cookie );

        const id = data.id

        return this.personagemService.find( id );
    }

    @Post()
    async createPersonagem ( @Body() data: PersonagemInterface, @Req() request: Request ): Promise<Personagem>
    {
        const cookie = request.cookies[ 'jwt' ];

        const parsed = await this._jwtService.verifyAsync( cookie );

        const id = parsed.id

        return this.personagemService.create( id, data );
    }

    @Put(':id')
    async updatePersonagem ( @Req() request: Request, @Body() data, @Param() id ): Promise<Personagem>
    {
        const cookie = request.cookies[ 'jwt' ];

        const parseCookie = await this._jwtService.verifyAsync( cookie );

        const userId = parseCookie.id

        return this.personagemService.update( id.id, data, userId );
    }

    @Delete(':id')
    async deletePersonagem (@Param() id ): Promise<Personagem>
    {

        return this.personagemService.delete( id.id );
    }
}
