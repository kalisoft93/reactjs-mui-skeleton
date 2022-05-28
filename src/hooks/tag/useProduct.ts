import api from 'hooks/api/api';

const GET_PRODUCT_LIST = '/api/product/filter';
const POST_PRODUCT = '/api/product/create';

const useProduct = () => {

    const getProductList = (page = 1): Promise<any> => {
      
        return api.get<any>(GET_PRODUCT_LIST, {page}).then((resp) => {
            return resp.getFirstData();
        });

    }

    const postProduct = (formData: FormData):  Promise<any> => {

        return api.post<void>(POST_PRODUCT, formData).then((resp) => {
            return resp.getFirstData();
        });
    }

    return {getProductList, postProduct};

}

export default useProduct;