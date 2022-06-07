import api from "hooks/api/api";

const GET_PURPOSE_LIST = '/api/ability/purpose/filter';
const POST_PURPOSE = '/api/ability/purpose/create';

const useAbilityPurpose = () => {

    const getPuposeList = (page = 1, searchTerm = null): Promise<any> => {
      
        const params = {page, search_text: searchTerm};
        return api.get<any>(GET_PURPOSE_LIST, params).then((resp) => {
            return resp.getFirstData();
        });

    }

    const postPurpose = (body: any):  Promise<any> => {

        return api.post<void>(POST_PURPOSE, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    return {getPuposeList, postPurpose};

}

export default useAbilityPurpose;