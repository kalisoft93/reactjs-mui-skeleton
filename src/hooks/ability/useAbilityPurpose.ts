import api from "hooks/api/api";

const GET_PURPOSE_LIST = '/api/ability/purpose/filter';
const POST_PURPOSE = '/api/ability/purpose/create';
const SHOW_PURPOSE = '/api/ability/purpose/show';
const UPDATE_PURPOSE = '/api/ability/purpose/update';

export interface Purpose {
    id: number, 
    title: string,
    description: string,
    ability_categories: number[],
    plan_categories: number[],
    roles: number[],
}

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

    const showPurpose = (id): Promise<Purpose> => {
      
        return api.get<any>(SHOW_PURPOSE + '/' + id).then((resp) => {
            const rawData = resp.getFirstData();
            const purpose = rawData as Purpose;
            purpose.ability_categories = rawData.ability_categories.map((ac) => ac.id.toString());
            purpose.plan_categories = rawData.plan_categories.map((pc) => pc.id.toString());
            purpose.roles = rawData.roles.map((r) => r.id);
            return purpose;
        });

    }

    const updatePurpose = (id, body: any):  Promise<any> => {

        return api.post<void>(UPDATE_PURPOSE + '/' + id, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    return {getPuposeList, postPurpose, showPurpose, updatePurpose};

}

export default useAbilityPurpose;