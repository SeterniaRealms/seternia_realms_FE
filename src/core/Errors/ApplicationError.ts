import { CriticalError } from "./CriticalError";
import { UnauthorizedError } from "./UnauthorizedError";
import { ValidationError } from "./ValidationError";

export type TApplicationError =
  | Error
  | UnauthorizedError
  | CriticalError
  | ValidationError;
