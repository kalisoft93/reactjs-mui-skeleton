import api from "hooks/api/api";

const GET_LEVELS = '/api/ability/levels';

export interface Level {
    id: number,
    title: string,
    level: number
}

const useLevels = () => {

    const getLevels = (): Promise<Level[]> => {
        return api.get<Level[]>(GET_LEVELS).then((resp) => resp.getData());
    }

    return {getLevels};
    
}

export default useLevels;