import {
  deleteRequest,
  getRequest,
  getRequestWithParams,
  postRequest,
  putRequest,
} from '../api/apiMethods';

const FLIGHTS_URL = '/flights';

export const getFlights = async (params: Record<string, string | number>) =>
  getRequestWithParams(FLIGHTS_URL, {
    ...params,
  });

export const createFlight = async (data: {
  code: string;
  capacity: string;
  departureDate: string;
}) =>
  postRequest(FLIGHTS_URL, {
    ...data,
  });

export const updateFlight = async (
  id: string,
  data: {
    code: string;
    capacity: string;
    departureDate: string;
  },
) =>
  putRequest(`${FLIGHTS_URL}/${id}`, {
    ...data,
  });

export const getFlightDetails = async (id: string) =>
  getRequest(`${FLIGHTS_URL}/${id}/details`);

export const deteleFlight = async (id: string) =>
  deleteRequest(`${FLIGHTS_URL}/${id}`);
