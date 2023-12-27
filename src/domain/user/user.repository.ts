import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { CreateUser } from './user.interface';

@Injectable()
export class UserRepotisory
{
    constructor ( private prisma: PrismaService ) { }

    async users (): Promise<User[]>
    {
        return this.prisma.user.findMany( {
        } );
    }

    async user ( id: number ): Promise<User>
    {
        const user = await this.prisma.user.findUnique( {
            where: {
                id: id,
            },
        } );

        return user;
    }

    async findEmail ( email: string ): Promise<User>
    {
        return this.prisma.user.findFirst( {
            where: {
                email: email,
            },
        } );
    }

    async createUser ( data: CreateUser ): Promise<User>
    {
        return this.prisma.user.create( {
            data,
        } );
    }

    async updateUser ( id, data ): Promise<User>
    {
        return this.prisma.user.update( {
            data: data,
            where: { id: id },
        } );
    }

    async deleteUser ( id ): Promise<User>
    {
        return this.prisma.user.delete( {
            where: { id: id },
        } );
    }
}
