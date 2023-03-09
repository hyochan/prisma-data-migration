# Prisma data migration

> Migrate database from one to another.

## Usage

Copy `prisma/.env.sample` to `prisma/.env`.

```sh
cp prisma/.env.sample prisma/.env
```

Add `DATABASE_URL_OLD`, and `DATABASE_URL` correct values as provided in [Prisma datasource](https://www.prisma.io/docs/concepts/components/prisma-schema/data-sources).

Finally, install packages and generate [Prisma client](https://www.prisma.io/docs/concepts/components/prisma-client).

```sh
yarn && yarn generate
```

## Supported databases

Since the repo uses [Prisma](https://www.prisma.io), it supports [database connectors](https://www.prisma.io/docs/concepts/database-connectors) as provided.

- PostgreSQL
- MySQL
- SQLite
- MongoDB
- CockroachDB
- Microsoft SQL Server

## Write migration code

Open `src/index.ts` and start writing migration script. The initial template looks like below.

```ts
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
```

> After you wrote the script, run `yarn start`.
