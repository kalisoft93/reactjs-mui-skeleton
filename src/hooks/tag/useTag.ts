import api from 'hooks/api/api';

interface TagCategory {
    id: number;
    title: string;
}

interface Tag {
    id: string;
    title: string;
    categories: string;
  }

interface TagsData {
    data: Tag[];
    last_page: number,
    current_page: number;
    per_page: number;
    from: number;
}

const GET_TAG_CATEGORIES = '/api/tag/categories';
const GET_TAGS = '/api/tag/filter';
const POST_TAG = '/api/tag/create';

const useTag = () => {

    const getTags = (page = 1, withCategories = true, categoryFilter = []): Promise<TagsData> => {
        const params = {page};
        if (withCategories){
            params['with[0]'] = 'categories';
        }

        if (categoryFilter && categoryFilter.length > 0){
            categoryFilter.forEach((catId, index) => {
                params[`with_filter[categories.tag_categories.id][${index}]`] = catId;
            })
        }
        return api.get<any>(GET_TAGS, {params}).then((resp) => {
            const result = resp.getFirstData();
            result.data = result.data.map((r) => {
              if (r.categories) r.categories = r.categories.map((c) => c.title).join(', ');
              return r;
            });
            return result;
        });
    }

    const getCategories = (): Promise<TagCategory[]> => {
        return api.get<TagCategory[]>(GET_TAG_CATEGORIES).then((resp) => resp.getData());
    }

    const postTag = (title: string, categories: number[]): Promise<void> => {
        return api.post<void>(POST_TAG, {title, categories}).then((resp) => resp.getData());
    }

    return {getCategories, postTag, getTags};

}

export default useTag;