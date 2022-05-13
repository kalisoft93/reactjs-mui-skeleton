import { isNullOrUndefined } from "../utils/utils";


enum Status {
  OK = "OK",
  FAILED = "FAILED",
}

export class Response<Type> {
  readonly status: Status;
  private readonly data: Type;

  public static createSuccessful<Type>(
    rawResponse: any,
    status: any
  ): Response<Type> {
    return new Response(rawResponse, status);
  }

  private constructor(rawResponse: any, status: Status) {
    this.data = rawResponse.data;
    this.status = status;
  }

  public getData(): Type {
    return this.data as Type;
  }

  public getFirstData(): Type {
    return this.data[0] as Type;
  }

  public isEmpty(): boolean {
    return isNullOrUndefined(this.data);
  }

  public isNotEmpty(): boolean {
    return !this.isEmpty();
  }
}
