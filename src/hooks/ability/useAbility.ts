import api from "hooks/api/api";

const GET_PURPOSE_LIST = '/api/ability/categories';

const useAbility = () => {

    const getAbilityCategories = (searchTerm = null, withSubCategories = true): Promise<any> => {
      
        const params = {};
        if (withSubCategories)
            params['with[0]'] = 'subcategories';

        if (searchTerm)  
            params['search_text'] = searchTerm;

        return api.get<any>(GET_PURPOSE_LIST, params).then((resp) => {
            return resp.getFirstData().data;
        });

    }

    return {getAbilityCategories};

}

export default useAbility;