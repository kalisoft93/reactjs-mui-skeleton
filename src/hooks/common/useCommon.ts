import api from "hooks/api/api";

export interface Role {
    id: any,
    label: string
}


const GET_ROLE_LIST = '/api/common/roles';


const useCommon = () => {
    const getRoleData = (searchTerm = ""): Promise<Role[]> => {
      
        return api.get<any>(GET_ROLE_LIST).then((resp) => {
            return resp.getData();
        });
    }

    return {getRoleData}
}

export default useCommon;