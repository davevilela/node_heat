import "dotenv/config";

export const APP_PORT = process.env.PORT;

export const JWT_SECRET = process.env.JWT_SECRET;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const SOCKET_EVENTS = Object.freeze({
  onMessage: "onMessage",
});
