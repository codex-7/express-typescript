# Express and Typescript

ExpressJs with TypeScript as a starter template

### Used in ...

- Expressjs
- TypeScript
- Morgan
- Dotenv

## \# Install or setup a Database

### \#\# Choose and implement yourself

1. MongoDB with `mongoose` ODM

2. SQL/MySQL/Postgres/MSSQL with `Prisma ORM` or `TypeORM`

#### \# Setup `MongoDB` as your database

**Install mongoose for mongodb** <br>
`$ yarn add mongoose` <br>
`$ yarn add -D @types/mongoose`<br>
**Then, create a file `./src/configs/db.ts` and write in this**

Very First, you need to add `DATABASE_URL` in `.env` (Actually the connection string).

```env
DATABASE_URL=mongodb://username:password@hostname:dbport/dbname
```

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
