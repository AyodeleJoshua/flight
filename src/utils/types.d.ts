export interface ApiResponseError {
  response: {
    data: {
      code: number;
      message: string;
      type: string;
    };
  };
}

export interface AuthApiSuccessfulResponse {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface FlightDetailsSuccessfulResponseType {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  status: string;
}
