import api from 'hooks/api/api';

interface TagCategory {
    id: number;
    title: string;
}

const GET_TAG_CATEGORIES = '/api/tag/categories';

const useTag = () => {


    const getCategories = (): Promise<TagCategory[]> => {
        return api.get<TagCategory[]>(GET_TAG_CATEGORIES).then((resp) => resp.getData());
    }

    return {getCategories};

}

export default useTag;