import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando um professor com um curso e um módulo de uma vez só!
  const newTeacher = await prisma.teacher.create({
    data: {
      name: "Professor Bruno Bandeira Fernandes",
      email: "bruno.fernandes@unitins.br",
      courses: {
        create: {
          name: "Programação Web II",
          description: "Desenvolvimento backend com Node.js e Prisma",
          modules: {
            create: [
              { name: "Introdução ao Node.js" },
              { name: "ORM e Prisma Migrate" }
            ]
          }
        }
      }
    },
    include: {
      courses: {
        include: {
          modules: true
        }
      }
    }
  });

  console.dir(newTeacher, { depth: null });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });