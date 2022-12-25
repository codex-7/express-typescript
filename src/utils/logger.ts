import logger from "pino";

let isEnable: boolean = true;
if (process.env.NODE_ENV === "test") {
  isEnable = false;
}

export const log = logger({
  enabled: isEnable,
  timestamp: () => `, "time":"${Date.now()}"`,
});
