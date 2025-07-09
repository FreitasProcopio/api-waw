-- CreateTable
CREATE TABLE "Palavras" (
    "id" SERIAL NOT NULL,
    "imagem" TEXT,
    "people" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "contexto" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "caracter" TEXT,

    CONSTRAINT "Palavras_pkey" PRIMARY KEY ("id")
);
