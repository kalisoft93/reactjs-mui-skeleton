import api from "hooks/api/api";

export interface PlanTask {
    id: number;
    title: string;
    description: string;
    content: string;
    pedagogical_suggestion: string;
    plan_categories: number[];
    ability_categories: number[];
    ability_tasks: number[];
    products: number[];
    roles: number[];
    levels: number[];
    tags: number[];
    media: number[];
    banner: number[]
}

const GET_PLAN_CATEGORIES = 'api/plan/categories';
const GET_PURPOSE_LIST = '/api/plan/task/filter';
const POST_PURPOSE = '/api/plan/task/create';
const SHOW_PURPOSE = '/api/plan/task/show';
const UPDATE_PURPOSE = '/api/plan/task/update';

const usePlan = () => {

    const getPlanCategories = (searchTerm = null, withSubCategories = true): Promise<any> => {
      
        const params = {};
        if (withSubCategories)
            params['with[0]'] = 'subcategories';

        if (searchTerm)  
            params['search_text'] = searchTerm;

        return api.get<any>(GET_PLAN_CATEGORIES, params).then((resp) => {
            return resp.getFirstData().data;
        });

    }

    const getPlanTaskList = (page = 1, searchTerm = null): Promise<any> => {
      
        const params = {page, search_text: searchTerm};
        return api.get<any>(GET_PURPOSE_LIST, params).then((resp) => {
            return resp.getFirstData();
        });

    }

    const postPlanTask = (body: any):  Promise<any> => {

        return api.post<void>(POST_PURPOSE, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    const showPlanTask = (id): Promise<PlanTask> => {
      
        return api.get<any>(SHOW_PURPOSE + '/' + id).then((resp) => {
            const rawData = resp.getFirstData();
            const planTask = rawData as PlanTask;
            planTask.ability_categories = rawData.ability_categories.map((ac) => ac.id.toString());
            planTask.plan_categories = rawData.plan_categories.map((pc) => pc.id.toString());
            planTask.ability_tasks = rawData.ability_tasks.map((at) => at.id.toString());
            planTask.products = rawData.products.map((p) => p.id.toString());
            planTask.tags = rawData.tags.map((t) => t.id);
            planTask.media = rawData.media.map((m) => m.id);
            planTask.banner = rawData.media.map((b) => b.id);
            planTask.roles = rawData.roles.map((r) => r.id);
            planTask.levels = rawData.levels.map((l) => l.id);
            return planTask;
        });

    }

    const updatePlanTask = (id, body: any):  Promise<any> => {

        return api.post<void>(UPDATE_PURPOSE + '/' + id, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    return {getPlanCategories, getPlanTaskList, postPlanTask, showPlanTask, updatePlanTask};

}

export default usePlan;