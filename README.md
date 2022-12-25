# Express and Typescript

ExpressJs with TypeScript as a starter template

### Used in ...

- Expressjs
- TypeScript
- Morgan
- Dotenv

## \# Install or setup a Database

### \#\# Choose and implement yourself

1. [MongoDB with `mongoose` ODM](#mongo)

2. [SQL/MySQL/Postgres/MSSQL with `Prisma ORM` or `TypeORM`](#sql)

<a name="mongo"></a>

#### \# Setup `MongoDB` as your database

**Install mongoose for mongodb** <br>

```bash
$ yarn add:mongo
```

Very First, you need to add `DATABASE_URL` in `.env` (Actually the connection string).

```env
DATABASE_URL=mongodb://username:password@hostname:dbport/dbname
```

**Then, create a file `./src/configs/db.ts` and write in this**

```ts
// adding mongodb with mongoose
export const connectMongoDB() {
  // your connection setup code here
}
```

First in `./src/configs/index.ts`

```ts
// exporting from this namespace
export * from './db';
```

Then setup this in `./src/server.ts`

```ts
// import first
import {
  mode,
  port,
  connectMongoDB  // imported ...
} from './configs';
-------------------------------------
/// setup your database in here .....
await connectMongoDB()
.then(() => log.info(`MongoDB is connected :emoji:`))
.catch(err => log.error(err))
```

<a name="sql"></a>

#### \# Setup `SQL` based databases

Very First, you need to add `DATABASE_URL` in `.env` (Actually the connection string).

```env
DATABASE_URL=postgresql://username:password@hostname:dbport/dbname
```

or

```env
DATABASE_URL=mysql://username:password@hostname:dbport/dbname
```

You can add others if your want (like `mssql`, `oracle`, etc.)

Now you can choose `Prisma` or `TypeORM`.
I would like to show `Prisma` first.

**Note: TypeORM will be added later as documentation in here**

Install `Prisma` ORM by executing this below

```bash
$ yarn add:prisma
```

Then it will install `prisma` as devDepencies and will install `@prisma/client` itself as dependency.

Now, you need to go `./src/prisma` and must see your `.schema` file there. It will be your prisma config and database design/modeling etc.

After that, you can `@prisma/client` to query and make services with it.

As example for a user create and get service would like this

`in ./src/prisma/prisma.schema`

```prisma
model User {
  id Int @id @default(autoincrement())
  name String
  email String @unique
  password String
}
```

`now make user service in ./src/services/user.ts`

CREATE :=> create user example

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  });
  console.log(user);
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
```

GET :=> Find users example

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
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
```

**If you find and hard or want to see `prisma` original documentation or example **
[https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express)

--- Thanks
