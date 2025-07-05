export class AppError extends Error {
  public status: number;
  public success: boolean;

  constructor(message: string, status = 500) {
    super(message);
    this.success = false;
    this.name = 'AppError';
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      status: this.status,
      message: this.message,
    };
  }
}
