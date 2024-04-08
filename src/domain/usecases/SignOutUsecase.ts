import { IAuthenticationRepository } from "@/domain/repositories/IAuthenticationRepository";
import { IUsecase } from "@/core/Usecase";
import { TApplicationError } from "@/core/Errors";
import { TEither } from "@/core/Either";

export class SignOutUsecase implements IUsecase {
  constructor(readonly authenticationRepository: IAuthenticationRepository) {}

  async execute(): Promise<TEither<TApplicationError, void>> {
    return await this.authenticationRepository.signOut();
  }
}
