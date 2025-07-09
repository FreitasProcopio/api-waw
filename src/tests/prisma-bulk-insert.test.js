import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateDbJson() {
  const dbPath = path.resolve(__dirname, '../data/db.json');
  const raw = fs.readFileSync(dbPath, 'utf-8');
  const data = JSON.parse(raw);

  let success = 0;
  let fail = 0;
  let errors = [];

  for (const item of data) {
    try {
      await prisma.palavras.create({
        data: {
          // Mapeamento dos campos do JSON para o modelo Prisma
          imagem: item.Imagem || null,
          people: item.people || '',
          language: item.language || '',
          contexto: item.contexto || '',
          type: item.type || '',
          caracter: item.caracter || null,
        },
      });
      success++;
    } catch (e) {
      fail++;
      errors.push({ id: item.Id, error: e.message });
    }
  }

  console.log(`Migração concluída: ${success} inseridos, ${fail} falharam.`);
  if (fail > 0) {
    console.error('Falhas:', errors);
  }
  await prisma.$disconnect();
}

migrateDbJson();
