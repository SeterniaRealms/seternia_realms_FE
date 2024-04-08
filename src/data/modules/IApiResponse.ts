import { HttpStatusCode } from "@/services/http";

export interface IApiResponse<Body> {
  statusCode: HttpStatusCode;
  data: Body;
}
