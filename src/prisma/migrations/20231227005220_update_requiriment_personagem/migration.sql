/*
  Warnings:

  - The `maestria` column on the `Personagem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `especializacao` on the `Pericias` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DadosPersonagem" ALTER COLUMN "aparencia" DROP NOT NULL,
ALTER COLUMN "idade" DROP NOT NULL,
ALTER COLUMN "altura" DROP NOT NULL,
ALTER COLUMN "peso" DROP NOT NULL,
ALTER COLUMN "genero" DROP NOT NULL,
ALTER COLUMN "cabelos" DROP NOT NULL,
ALTER COLUMN "olhos" DROP NOT NULL,
ALTER COLUMN "pele" DROP NOT NULL,
ALTER COLUMN "aura" DROP NOT NULL,
ALTER COLUMN "roupas" DROP NOT NULL,
ALTER COLUMN "tamanho" DROP NOT NULL,
ALTER COLUMN "marcas" DROP NOT NULL,
ALTER COLUMN "tracosDePersonalidade" DROP NOT NULL,
ALTER COLUMN "ideais" DROP NOT NULL,
ALTER COLUMN "ligacoes" DROP NOT NULL,
ALTER COLUMN "defeitos" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DetalhesInvocacao" ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "tipo" DROP NOT NULL,
ALTER COLUMN "bonus" DROP NOT NULL,
ALTER COLUMN "atributo" DROP NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HabilidadesDeTecnica" ALTER COLUMN "descricao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PerfilAmaldicoado" ALTER COLUMN "descricaoTecnica" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pericias" DROP COLUMN "especializacao",
ADD COLUMN     "especializacao" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Personagem" ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "nivel" DROP NOT NULL,
DROP COLUMN "maestria",
ADD COLUMN     "maestria" INTEGER,
ALTER COLUMN "origem" DROP NOT NULL,
ALTER COLUMN "especializacao" DROP NOT NULL,
ALTER COLUMN "tecnica" DROP NOT NULL,
ALTER COLUMN "campanha" DROP NOT NULL,
ALTER COLUMN "grau" DROP NOT NULL,
ALTER COLUMN "grau" SET DATA TYPE TEXT;
