import { getDate } from "./date";

export const logRequest = (username: string | undefined) => {
  console.log(
    `[LOG] ${getDate()} | New message received from user ${username}`
  );
};
