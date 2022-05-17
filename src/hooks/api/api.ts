import { Response } from "../../models/response";
import { api } from "../../utils/axios";
import snackBarUtils from "../../utils/snackBarUtils";


  const handleError = (error: any) => {
    if (error.response.data.type) {
      snackBarUtils.error('Hiba történt');
    } else {
      snackBarUtils.error('Hiba történt');
    }
  };

  const post = <Type>(
    path: string,
    params?: any
  ): Promise<Response<Type>> => {
    return api
      .post(path, params)
      .then((resp: any) => {
        return Response.createSuccessful<Type>(resp.data, resp.status);
      })
      .catch((error: any) => {
        handleError(error);
        throw error;
      });
  };

  const get = <Type>(
    path: string,
    params?: any
  ): Promise<Response<Type>> => {
    return api
      .get(path, params)
      .then((resp: any) => {
        return Response.createSuccessful<Type>(resp.data, resp.status);
      })
      .catch((error: any) => {
        handleError(error);
        throw error;
      });
  };


export default { post, get};
