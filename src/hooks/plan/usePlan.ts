import api from "hooks/api/api";

const GET_PLAN_CATEGORIES = 'api/plan/categories';

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

    return {getPlanCategories};

}

export default usePlan;