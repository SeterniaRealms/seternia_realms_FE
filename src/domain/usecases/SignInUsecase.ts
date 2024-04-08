import { IAuthenticationRepository } from "@/domain/repositories/IAuthenticationRepository";
import { IUsecase } from "@/core/Usecase";
import { left, right, TEither } from "@/core/Either";
import { TApplicationError } from "@/core/Errors";

export interface ISignInUsecaseParams {
  publicKey: string;
}

export class SignInUsecase implements IUsecase {
  constructor(
    private readonly authenticationRepository: IAuthenticationRepository
  ) {}

  async execute({
    publicKey
  }: ISignInUsecaseParams): Promise<
    boolean
  > {
    const response = this.authenticationRepository.signIn({
      publicKey
    });

    if (response) {
      return true
    }
    await Promise.resolve(left(response));

    return response
  }
}
