import { AuthenticationRepository } from "@/data/AuthenticationRepository";
import { HttpClientAxios } from "@/infra/HttpClientAxios";
import { TFactory } from "@/core/Factory";
import { SignOutUsecase } from "@/domain/usecases/SignOutUsecase";

export const createSignOutUsecase: TFactory<SignOutUsecase> = () => {
  const httpClient = new HttpClientAxios();
  const authenticationRepository = new AuthenticationRepository(httpClient);

  return new SignOutUsecase(authenticationRepository);
};
