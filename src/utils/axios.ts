import axios from "axios";
import storageService, { Locals } from "./storageService";
import axiosRetry, { isNetworkOrIdempotentRequestError } from "axios-retry";

const headers = (): any => {
  const accessToken = storageService.getObject(Locals.ACCESS_TOKEN);
  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
};

let api = axios.create({
  baseURL: "https://gateway-dev.syncee.co",
  headers: headers(),
});

const updateHeaders = () => {
  Object.assign(api.defaults.headers, headers());
};

axiosRetry(api, {
  retries: 3,
  retryCondition: (e): any => {
    return isNetworkOrIdempotentRequestError(e) || (e.response && e.response.status === 404);
  },
  retryDelay: axiosRetry.exponentialDelay,
});

export { api, updateHeaders };
