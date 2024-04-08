export interface ISignInClientResponse {
  data: {
    autorizacao: {
      responsavelId: string;
      token: string;
    };
  };
}
