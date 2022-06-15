import api from "hooks/api/api";

export interface Role {
    id: any,
    label: string
}

export interface Scope {
    id: string,
    title: string
}


const GET_ROLE_LIST = '/api/common/roles';


const useCommon = () => {
    const getRoleData = (searchTerm = ""): Promise<Role[]> => {
      
        return api.get<any>(GET_ROLE_LIST).then((resp) => {
            return resp.getData();
        });
    }

    const getScopes = (searchTerm = "") : Promise<Scope[]> => {
      
        return new Promise((resolve, reject) => {
            resolve([{id: "global", title: "global"},
            {id: "insitution", title: "insitution"},
            {id: "user", title: "user"},
            {id: "group", title: "group"}])
        });
       
    }

    return {getRoleData, getScopes}
}

export default useCommon;