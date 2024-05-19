// services/createApiFunction.ts
import {AxiosRequestConfig} from "axios";
import apiClient from "./apiClient";
import { components, operations, paths } from "@/ts-types";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";
type FirstKeyValue<T> = T extends Record<infer U, any>
  ? U extends keyof T
    ? T[U]
    : never
  : never;

type FirstKeyContent<T> = T extends { content: { "application/json": infer U } }
  ? U
  : never;

  type ResponseType<T, S extends keyof( T extends { responses: infer X }?X:never)> = T extends { responses: Record<S, { content: { "application/json": infer U } }> }
  ? U
  : never;
  type ResponseType2<T> = T extends { responses: infer U }
    ? U
    : never;

type BodyType<T> = T extends {
  requestBody: { content: { "multipart/form-data": infer U } };
}
  ? U
  : never;
type ParamsType<T> = T extends { parameters: { path: infer U } } ? U : never;
type QueryType<T> = T extends { parameters: { query?: infer U } } ? U : never;
type PathKeys = keyof paths;
type OmitNever<T> = {
    [P in keyof T as T[P] extends never ? never : P]: T[P]
};

export function createApiFunction<T extends PathKeys, M extends keyof paths[T], S extends keyof (paths[T][M] extends { responses: infer U }?U:never)>(
  path: T,
  method: HttpMethod,
  pathParams?: string[]
) {

  return function (args?:OmitNever<{
    params: ParamsType<paths[T][M]>,
    query?: QueryType<paths[T][M]>,
    body: BodyType<paths[T][M]>
 }>,config?: AxiosRequestConfig<any>) {

const newArgs = {
    params: args && 'params' in args?args.params:{},
    body: args && 'body' in args?args.body:{},
    query: args && 'query' in args?args.query:{},
}

    const endpoint = pathParams
      ? interpolatePath(path as string, pathParams, newArgs.params)
      : path;
    type OperationResponses = ResponseType<paths[T][M],S>;
    switch (method) {
      case "get":
        return apiClient.get<OperationResponses>(endpoint, {...config, params: newArgs.query });
      case "delete":
        return apiClient.delete<OperationResponses>(endpoint, {...config});
      case "post":
        return apiClient.post<OperationResponses>(endpoint, newArgs.body, {...config});
      case "put":
        return apiClient.put<OperationResponses>(endpoint, newArgs.body, {...config});
      case "patch":
        return apiClient.patch<OperationResponses>(endpoint, newArgs.body, {...config});
      default:
        throw new Error("Unsupported HTTP method");
    }
  };
}

function interpolatePath(
  path: string,
  pathParams: string[],
  data: any
): string {
  return pathParams.reduce((accumulatedPath, param) => {
    return accumulatedPath.replace(
      `{${param}}`,
      encodeURIComponent(data[param])
    );
  }, path);
}
