export interface IApiError {
  message: string;
  errors?: { [key: string]: string };
}
