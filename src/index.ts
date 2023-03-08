import {PrismaClient} from './generated/client';
import {PrismaClient as PrismaClientOld} from './generated/client-old';
import fs from 'fs';

const prismaOld = new PrismaClientOld();
const prisma = new PrismaClient();

const logFileName = 'logFile.txt';

async function main(): Promise<void> {
  
}


main()
  .catch((e) => {
    fs.appendFile(logFileName, `main catch::${e}\n`, (err) => {
      if (err) console.log(`File logging error: ${err}\n`);
    });

    process.exit(1);
  })
  .finally(async () => {
    await Promise.all([
      prismaOld.$disconnect(),
      prisma.$disconnect()
    ]);
  });