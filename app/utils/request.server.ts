import { json } from "@remix-run/node";

type ErrorResponse<T> = {
  status: "error";
  data: T;
};
/**
 * This helper function helps us to return the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export const badRequest = <T>(data: T) =>
  json<ErrorResponse<T>>({ status: "error", data }, { status: 400 });
export const notFound = <T>(data: T) =>
  json<ErrorResponse<T>>({ status: "error", data }, { status: 404 });
