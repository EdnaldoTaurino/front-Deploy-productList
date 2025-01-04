export default interface ApiErrorProps {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}
