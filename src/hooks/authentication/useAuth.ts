import { Response } from "../../models/response";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { LoginResp, loginThunk } from "../../redux/slices/authentication";
import storageService, { Locals } from "../../utils/storageService";

const useAuth = () => {

    const dispatch = useAppDispatch();

    const { isLoggedIn, authorizations, fetching, user } = useAppSelector(
      (state) => state.authentication
    );

    const login = (email: string, password: string): Promise<Response<LoginResp>> => {
       return dispatch(loginThunk({ email, password }))
          .unwrap().then((data) => {
            storageService.setItem(Locals.ACCESS_TOKEN, data.getFirstData().access_token);
            return data;
          });
          
      };

      return {
        isLoggedIn,
        authorizations,
        fetching,
        user,
        login,
      };

}

export default useAuth;