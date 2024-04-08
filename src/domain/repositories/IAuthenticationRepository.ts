import { TEither } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";

interface ISignInParams {
  publicKey: string;
}

export interface IAuthenticationRepository {
  signIn: ({
    publicKey
  }: ISignInParams) => boolean;

  signOut: () => Promise<TEither<TApplicationError, void>>;
}
