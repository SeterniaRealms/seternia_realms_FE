import {
  CriticalError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  TApplicationError,
  UnauthorizedError,
  ValidationError,
} from "@/core/Errors";
import { AxiosError } from "axios";
import { HttpStatusCode } from "@/services/http/HttpStatusCode";
import { NotAcceptableError } from "@/core/Errors/NotAcceptableError";
import { firstLetterToLowerCase } from "@/presentation/utils/firstLetterToLowerCase";
import { ConflictError } from "@/core/Errors/ConflictError";

interface FieldMap {
  [key: string]: string;
}

export interface HttpResponseError {
  data?: any;
  mensagem: string;
  statusCode: number;
  errors?: {
    [key: string]: string;
  };
}

function formatProperty(property: string, fieldMap: FieldMap): string {
  const splittedProperty = property.split(".");
  if (splittedProperty.length >= 3) {
    return `${fieldMap[splittedProperty[0]]}.${splittedProperty[1]}.${
      fieldMap[splittedProperty[2]]
    }`;
  } else {
    return fieldMap[splittedProperty[0]];
  }
}

export function generateHttpErrorResponse(
  error: AxiosError<HttpResponseError>,
  fieldMap?: FieldMap
): TApplicationError {
  if (error?.response != null) {
    const {
      response: { status, data },
    } = error;

    let responseError;
    if (data?.data?.mensagem)
      responseError = new Error(data ? data?.data.mensagem : error.message);
    else
      responseError = new Error(data ? data.mensagem : error.message);

    if (status === HttpStatusCode.UNAUTHORIZED) {
      return new UnauthorizedError(responseError);
    }

    if (status === HttpStatusCode.CONFLICT) {
      return new ConflictError(responseError);
    }

    if (status === HttpStatusCode.FORBIDDEN) {
      return new ForbiddenError(responseError);
    }

    if (status === HttpStatusCode.NOT_FOUND) {
      return new NotFoundError(responseError);
    }

    if (status === HttpStatusCode.NOT_ACCEPTABLE) {
      return new NotAcceptableError(responseError);
    }

    if (status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      return new InternalServerError(responseError);
    }

    if (
      status === HttpStatusCode.UNPROCESSABLE_ENTITY &&
      data.errors !== undefined
    ) {
      return new ValidationError(
        Object.entries(data.errors).map((err) => {
          const parameter = fieldMap
            ? formatProperty(err[0], fieldMap)
            : err[0];
          return {
            parameter: firstLetterToLowerCase(parameter),
            error: err[1],
          };
        })
      );
    }
  }

  return new CriticalError(error);
}
