import api from "hooks/api/api";

const GET_PURPOSE_LIST = '/api/ability/task/filter';
const POST_PURPOSE = '/api/ability/task/create';
const SHOW_PURPOSE = '/api/ability/task/show';
const UPDATE_PURPOSE = '/api/ability/task/update';

export interface Task {
    id: number, 
    title: string,
    description: string,
    ability_categories: number[],
    ability_purposes: number[],
    plan_categories: number[],
    roles: number[],
}

const useAbilityTask = () => {

    const getTaskList = (page = 1, searchTerm = null): Promise<any> => {
      
        const params = {page, search_text: searchTerm};
        return api.get<any>(GET_PURPOSE_LIST, params).then((resp) => {
            return resp.getFirstData();
        });

    }

    const postTask = (body: any):  Promise<any> => {

        return api.post<void>(POST_PURPOSE, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    const showTask = (id): Promise<Task> => {
      
        return api.get<any>(SHOW_PURPOSE + '/' + id).then((resp) => {
            const rawData = resp.getFirstData();
            const purpose = rawData as Task;
            purpose.ability_categories = rawData.ability_categories.map((ac) => ac.id.toString());
            purpose.plan_categories = rawData.plan_categories.map((pc) => pc.id.toString());
            purpose.ability_purposes = rawData.ability_purposes.map((ap) => ap.id);
            purpose.roles = rawData.roles.map((r) => r.id);
            return purpose;
        });

    }

    const updateTask = (id, body: any):  Promise<any> => {

        return api.post<void>(UPDATE_PURPOSE + '/' + id, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    return {getTaskList, postTask, showTask, updateTask};

}

export default useAbilityTask;