
import api from 'hooks/api/api';

const GET_MEDIA_LIST = '/api/media/filter';
const POST_MEDIA = '/api/media/create';
const DELETE_MEDIA = '/api/media/delete';

export interface Media {
    id: number;
    url: string;
    label: string;
    active: boolean;
}

export interface MediaData {
    data: Media[];
    last_page: number,
    current_page: number;
    per_page: number;
    from: number;
}

const useMedia = () => {

    const getMediaList = (page = 1): Promise<MediaData> => {
      
        return api.get<any>(GET_MEDIA_LIST, {page}).then((resp) => {
            return resp.getFirstData();
        });

    }

    const postMedia = (formData: FormData):  Promise<any> => {

        return api.post<void>(POST_MEDIA, formData).then((resp) => {
            return resp.getFirstData();
        });
    }

    const deleteMedia = (id: number): Promise<any> => {

        return api.post<void>(DELETE_MEDIA + `/${id}`).then((resp) => {
            return resp.getFirstData();
        });
    }

    return {getMediaList, postMedia, deleteMedia};



}

export default useMedia;