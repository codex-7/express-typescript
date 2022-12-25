import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { log } from './utils';
import { mode, port } from './configs';

async function bootstrap(_mode_: string) {
  const server: Express = express(); // Express app instance

  // common server settings
  server.use(express.json()); // BodyParser
  server.use(express.urlencoded({ extended: true }));
  if (_mode_ !== 'production') {
    server.use(cors()); // CORS enabled for all
  } else {
    // or you can make a allow-list and CorsOptions with it
    // I'm exposing /api* access to everybody @Initially as a boilerplate only
    server.options('/api/*', cors()); // ONLY /api/* is enabled from anywhere
  }
  server.use(morgan(_mode_ === 'development' ? 'dev' : 'combined'));

  return server;
}

const app = async () => {
  try {
    const { listen } = await bootstrap(mode);
    const httpApp = listen(port, () => {
      log.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    });

    process.on('SIGTERM', () => {
      log.debug('SIGTERM signal received: closing HTTP server');
      httpApp.close();
    });
  } catch (err) {
    log.error(err);
  }
};

app(); // starting application
