import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
import seedLocal from './seed.development';
const prisma = new PrismaClient();

const options = {
  environment: { type: 'string' },
};

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options } as any);

  console.log(`Running seeds from ${environment}`);

  switch (environment) {
    case 'development':
      await seedLocal(prisma);
      break;
    default:
      break;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
