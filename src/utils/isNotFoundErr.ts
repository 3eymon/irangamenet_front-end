import { isAxiosError } from "axios";

export function isNotFoundError(error: unknown) {
  return isAxiosError(error) && error.response?.status === 404;
}