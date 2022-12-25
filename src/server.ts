import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { log } from "./utils";

dotenv.config(); // env variable parseing
// some important environment variables
const _port_: number = Number(process.env.PORT) || 3080;
const _mode_: string = process.env.NODE_ENV || "development";

async function bootstrap(_mode_: string) {
  const server: Express = express(); // Express app instance

  // common server settings
  server.use(express.json()); // BodyParser
  server.use(express.urlencoded({ extended: true }));
  if (_mode_ !== "production") {
    server.use(cors()); // CORS enabled for all
  } else {
    // or you can make a allow-list and CorsOptions with it
    // I'm exposing /api* access to everybody @Initially as a boilerplate only
    server.options("/api/*", cors()); // ONLY /api/* is enabled from anywhere
  }
  server.use(morgan(_mode_ === "development" ? "dev" : "combined"));

  return server;
}

const app = async () => {
  try {
    const { listen } = await bootstrap(_mode_);
    const httpApp = listen(_port_, () => {
      log.info(`⚡️[server]: Server is running at http://localhost:${_port_}`);
    });

    process.on("SIGTERM", () => {
      log.debug("SIGTERM signal received: closing HTTP server");
      httpApp.close();
    });
  } catch (err) {
    log.error(err);
  }
};

app(); // starting application
