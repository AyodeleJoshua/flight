import axiosInstance from './axiosConfig';

export const getRequest = async (endpoint: string) => {
  const config = {
    headers: {},
  };
  const response = await axiosInstance.get(endpoint, config);
  return response?.data || response;
};

export const deleteRequest = async (endpoint: string) => {
  const response = await axiosInstance.delete(endpoint);
  return response.data;
};

export const getRequestWithParams = async <ParamsType>(
  url: string,
  params: ParamsType,
) => {
  const config = {
    headers: {},
  };
  const response = await axiosInstance({
    method: 'GET',
    url,
    params,
    ...config,
  });
  // const response = await axiosInstance.get(url, data, config);
  return response?.data || response;
};

export const postRequest = async (url: string, data: unknown) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

export const putRequest = async (url: string, data: unknown) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};
