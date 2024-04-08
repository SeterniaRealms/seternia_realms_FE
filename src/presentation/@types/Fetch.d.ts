import { TUsecaseError } from "@/core/Errors";

declare interface IHookResponse {
  isLoading: boolean;
  error: TUsecaseError | undefined;
}