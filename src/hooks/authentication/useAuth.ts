import { updateHeaders } from "utils/axios";
import { Response } from "../../models/response";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authenticationAction, LoginResp, loginThunk } from "../../redux/slices/authentication";
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
            updateHeaders();
            return data;
          });
          
      };

    const logout = () => {
      storageService.removeItem(Locals.ACCESS_TOKEN);
      dispatch(authenticationAction.logout());
      
    }

      return {
        isLoggedIn,
        authorizations,
        fetching,
        user,
        login,
        logout
      };

}

export default useAuth;