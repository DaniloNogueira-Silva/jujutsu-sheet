import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepotisory } from './user.repository';
import { User } from '@prisma/client';
import { CreateUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService
{
    private readonly _log = new Logger( 'user_service' );

    constructor (
        private readonly _userRepository: UserRepotisory,
        private readonly _jwtService: JwtService
    ) { }

    async getUsers (): Promise<User[]>
    {
        try
        {
            return this._userRepository.users();
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi encontrado nenhum registro.' )
        }
    }

    async getUser ( id ): Promise<User>
    {
        try
        {
            return this._userRepository.user( id );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi encontrado nenhum usuário.' )
        }
    }

    async create ( data: CreateUser ): Promise<User>
    {
        try
        {
            const hashedPassword = await bcrypt.hash( data.senha, 12 );

            return this._userRepository.createUser( { email: data.email, senha: hashedPassword } );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível criar o usuário.' )
        }
    }

    async update ( id, data ): Promise<User>
    {
        try
        {
            let hashedPassword

            if ( data.senha )
            {
                hashedPassword = await bcrypt.hash( data.senha, 12 );

            }

            return this._userRepository.updateUser( id, { email: data.email, senha: hashedPassword } );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível atualizar o usuário.' )
        }
    }

    async delete ( id ): Promise<User>
    {
        try
        {
            return this._userRepository.deleteUser( id );
        } catch ( error )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi possível deletar o usuário.' )
        }
    }

    async login ( data: CreateUser ): Promise<any>
    {
        const user = await this._userRepository.findEmail( data.email );

        if ( !user )
        {
            throw new BadRequestException( 'Ocorreu um problema, não foi encontrado nenhum usuário.' );
        }

        if ( !await bcrypt.compare( data.senha, user.senha ) )
        {
            throw new BadRequestException( 'A senha está incorreta.' );
        }

        const jwt = await this._jwtService.signAsync( { id: user.id } );

        return jwt;
    }
}
