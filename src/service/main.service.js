import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const PalavrasService = {
    async criarPalavras(language, type, people, contexto) {
        if (!language || !type || !people || !contexto) {
            throw new Error("Está faltando inserir as credenciais obrigatórias");
        }

        // Verifica se já existe no banco
        const existente = await prisma.palavras.findFirst({
            where: { language, type, people, contexto }
        });
        if (existente) {
            return existente;
        }

        // Não existe, cria novo registro vazio ou com dados mínimos
        const novasPalavras = await prisma.palavras.create({
            data: {
                language,
                type,
                people,
                contexto,
                imagem: null,
                caracter: null
            }
        });
        return novasPalavras;
    },

    async carregarPalavras() {
        try {
            return await prisma.palavras.findMany();
        } catch (error) {
            throw new Error("Erro ao carregar palavras: " + error.message);
        }
    },

    async atualizarPalavras(id, novosDados) {
        if (!id) {
            throw new Error("O parâmetro 'id' é obrigatório.");
        }
        try {
            return await prisma.palavras.update({
                where: { id },
                data: novosDados
            });
        } catch (error) {
            throw new Error("Erro ao atualizar palavra: " + error.message);
        }
    },

    async deletarPalavras(id) {
        if (!id) {
            throw new Error("O parâmetro 'id' é obrigatório.");
        }
        try {
            return await prisma.palavras.delete({
                where: { id }
            });
        } catch (error) {
            throw new Error("Erro ao deletar palavra: " + error.message);
        }
    },

    // ----------------------------------- MÉTODOS DE BUSCAS ----------------------------------------------------

    async buscarPorTipo(type) {
        if (!type) {
            throw new Error("O parâmetro 'tipo' é obrigatório.");
        }
        try {
            return await prisma.palavras.findMany({ where: { type } });
        } catch (error) {
            throw new Error("Erro ao buscar por tipo: " + error.message);
        }
    },

    async buscarPorLingua(language) {
        if (!language) {
            throw new Error("O parâmetro 'language' é obrigatório.");
        }
        try {
            return await prisma.palavras.findMany({ where: { language } });
        } catch (error) {
            throw new Error("Erro ao buscar por língua: " + error.message);
        }
    },

    async buscarPorPovo(people) {
        if (!people) {
            throw new Error("O parâmetro 'povo' é obrigatório.");
        }
        try {
            return await prisma.palavras.findMany({ where: { people } });
        } catch (error) {
            throw new Error("Erro ao buscar por povo: " + error.message);
        }
    },

    async buscarImagemPorLingua(language) {
        if (!language) {
            throw new Error("O parâmetro 'language' é obrigatório.");
        }
        try {
            const palavra = await prisma.palavras.findFirst({ where: { language } });
            if (!palavra || !palavra.imagem) {
                return null;
            }
            return Buffer.from(palavra.imagem, 'base64');
        } catch (error) {
            throw new Error("Erro ao buscar imagem por língua: " + error.message);
        }
    }
};