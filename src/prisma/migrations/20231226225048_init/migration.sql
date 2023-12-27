-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personagem" (
    "personagemId" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "maestria" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "especializacao" TEXT NOT NULL,
    "tecnica" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "campanha" TEXT NOT NULL,
    "grau" INTEGER NOT NULL,

    CONSTRAINT "Personagem_pkey" PRIMARY KEY ("personagemId")
);

-- CreateTable
CREATE TABLE "Atributos" (
    "atributoId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "forca_modificador" INTEGER NOT NULL,
    "destreza" INTEGER NOT NULL,
    "destreza_modificador" INTEGER NOT NULL,
    "constituicao" INTEGER NOT NULL,
    "constituicao_modificador" INTEGER NOT NULL,
    "inteligencia" INTEGER NOT NULL,
    "inteligencia_modificador" INTEGER NOT NULL,
    "sabedoria" INTEGER NOT NULL,
    "sabedoria_modificador" INTEGER NOT NULL,
    "carisma" INTEGER NOT NULL,
    "carisma_modificador" INTEGER NOT NULL,

    CONSTRAINT "Atributos_pkey" PRIMARY KEY ("atributoId")
);

-- CreateTable
CREATE TABLE "Pericias" (
    "periciaId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "atributo" TEXT NOT NULL,
    "maestria" BOOLEAN NOT NULL,
    "especializacao" TEXT NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Pericias_pkey" PRIMARY KEY ("periciaId")
);

-- CreateTable
CREATE TABLE "Status" (
    "statusId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "maximos" INTEGER NOT NULL,
    "atuais" INTEGER NOT NULL,
    "temporarios" INTEGER NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("statusId")
);

-- CreateTable
CREATE TABLE "ClasseDeArmadura" (
    "armaduraId" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "armadura" INTEGER NOT NULL,
    "escudo" INTEGER NOT NULL,
    "destreza" INTEGER NOT NULL,
    "outros" INTEGER NOT NULL,

    CONSTRAINT "ClasseDeArmadura_pkey" PRIMARY KEY ("armaduraId")
);

-- CreateTable
CREATE TABLE "Habilidade" (
    "habilidadeId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "sub_tipo" TEXT NOT NULL,
    "atual" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "custo" INTEGER NOT NULL,

    CONSTRAINT "Habilidade_pkey" PRIMARY KEY ("habilidadeId")
);

-- CreateTable
CREATE TABLE "Talento" (
    "talentoId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "atual" INTEGER NOT NULL,
    "maximos" INTEGER NOT NULL,
    "custo" INTEGER NOT NULL,

    CONSTRAINT "Talento_pkey" PRIMARY KEY ("talentoId")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "inventarioId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "espacos" INTEGER NOT NULL,
    "custo" INTEGER NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("inventarioId")
);

-- CreateTable
CREATE TABLE "DadosPersonagem" (
    "dadosPersonagemId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "aparencia" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "genero" TEXT NOT NULL,
    "cabelos" TEXT NOT NULL,
    "olhos" TEXT NOT NULL,
    "pele" TEXT NOT NULL,
    "aura" TEXT NOT NULL,
    "roupas" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "marcas" TEXT NOT NULL,
    "tracosDePersonalidade" TEXT NOT NULL,
    "ideais" TEXT NOT NULL,
    "ligacoes" TEXT NOT NULL,
    "defeitos" TEXT NOT NULL,

    CONSTRAINT "DadosPersonagem_pkey" PRIMARY KEY ("dadosPersonagemId")
);

-- CreateTable
CREATE TABLE "PerfilAmaldicoado" (
    "perfilAmaldicoadoId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "tecnicaAmaldicoada" TEXT NOT NULL,
    "descricaoTecnica" TEXT NOT NULL,
    "habilidadesConhecidas" TEXT NOT NULL,
    "habilidadesMaximas" TEXT NOT NULL,
    "atributoPrincipal" TEXT NOT NULL,

    CONSTRAINT "PerfilAmaldicoado_pkey" PRIMARY KEY ("perfilAmaldicoadoId")
);

-- CreateTable
CREATE TABLE "HabilidadesDeTecnica" (
    "habilidadeTecnicaId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "alcance" TEXT NOT NULL,
    "conjuracao" TEXT NOT NULL,
    "alvo" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,

    CONSTRAINT "HabilidadesDeTecnica_pkey" PRIMARY KEY ("habilidadeTecnicaId")
);

-- CreateTable
CREATE TABLE "Invocacao" (
    "invocacaoId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "vida" INTEGER NOT NULL,
    "ca" INTEGER NOT NULL,
    "movimento" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "destreza" INTEGER NOT NULL,
    "constituicao" INTEGER NOT NULL,
    "inteligencia" INTEGER NOT NULL,
    "sabedoria" INTEGER NOT NULL,
    "carisma" INTEGER NOT NULL,

    CONSTRAINT "Invocacao_pkey" PRIMARY KEY ("invocacaoId")
);

-- CreateTable
CREATE TABLE "DetalhesInvocacao" (
    "detalhesInvocacaoId" SERIAL NOT NULL,
    "personagemId" INTEGER NOT NULL,
    "invocacaoId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "bonus" INTEGER NOT NULL,
    "atributo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "DetalhesInvocacao_pkey" PRIMARY KEY ("detalhesInvocacaoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Personagem" ADD CONSTRAINT "Personagem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atributos" ADD CONSTRAINT "Atributos_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pericias" ADD CONSTRAINT "Pericias_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClasseDeArmadura" ADD CONSTRAINT "ClasseDeArmadura_armaduraId_fkey" FOREIGN KEY ("armaduraId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habilidade" ADD CONSTRAINT "Habilidade_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Talento" ADD CONSTRAINT "Talento_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosPersonagem" ADD CONSTRAINT "DadosPersonagem_dadosPersonagemId_fkey" FOREIGN KEY ("dadosPersonagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilAmaldicoado" ADD CONSTRAINT "PerfilAmaldicoado_perfilAmaldicoadoId_fkey" FOREIGN KEY ("perfilAmaldicoadoId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabilidadesDeTecnica" ADD CONSTRAINT "HabilidadesDeTecnica_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invocacao" ADD CONSTRAINT "Invocacao_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalhesInvocacao" ADD CONSTRAINT "DetalhesInvocacao_personagemId_fkey" FOREIGN KEY ("personagemId") REFERENCES "Personagem"("personagemId") ON DELETE RESTRICT ON UPDATE CASCADE;
