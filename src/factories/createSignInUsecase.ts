import { AuthenticationRepository } from "@/data/AuthenticationRepository";
import { HttpClientAxios } from "@/infra/HttpClientAxios";
import { TFactory } from "@/core/Factory";
import { SignInUsecase } from "@/domain/usecases/SignInUsecase";

export const createSignInUsecase: TFactory<SignInUsecase> = () => {
  const httpClient = new HttpClientAxios();
  const authenticationRepository = new AuthenticationRepository(httpClient);

  return new SignInUsecase(authenticationRepository);
};
