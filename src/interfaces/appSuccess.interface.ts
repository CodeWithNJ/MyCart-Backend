export interface AppSuccess<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}
