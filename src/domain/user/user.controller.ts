import { Controller, Get, Post, Put, Delete, Body, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './user.interface';
import { User } from '@prisma/client';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller( 'users' )
export class UserController
{
    constructor (
        private readonly userService: UserService,
        private readonly _jwtService: JwtService
    ) { }


    @Get( 'all' )
    async getUsers (): Promise<User[]>
    {
        return this.userService.getUsers();
    }

    @Get()
    async getUser (
        @Req() request: Request
    ): Promise<User>
    {
        const cookie = request.cookies[ 'jwt' ];

        const data = await this._jwtService.verifyAsync( cookie );

        const id = data.id

        return this.userService.getUser( id );
    }

    @Post()
    async createUser ( @Body() data: CreateUser ): Promise<User>
    {
        return this.userService.create( data );
    }

    @Post( 'auth' )
    async login (
        @Body() data: CreateUser,
        @Res( { passthrough: true } ) response: Response
    ): Promise<any>
    {
        const login = await this.userService.login( data );

        response.cookie( 'jwt', login, { httpOnly: true } );

        return {
            message: 'success'
        }
    }

    @Put()
    async updateUser ( @Req() request: Request, @Body() data ): Promise<User>
    {
        const cookie = request.cookies[ 'jwt' ];

        const parseCookie = await this._jwtService.verifyAsync( cookie );

        const id = parseCookie.id

        return this.userService.update( id, data );
    }

    @Delete()
    async deleteUser ( @Req() request: Request ): Promise<User>
    {
        const cookie = request.cookies[ 'jwt' ];

        const data = await this._jwtService.verifyAsync( cookie );

        const id = data.id

        return this.userService.delete( id );
    }

    @Post( 'logout' )
    async logout ( @Res( { passthrough: true } ) response: Response )
    {
        response.clearCookie( 'jwt' );

        return {
            message: 'success'
        }
    }
}
