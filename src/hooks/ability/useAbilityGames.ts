import api from "hooks/api/api";


export interface Game {
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

const GET_GAME_LIST = '/api/ability/game/filter';
const POST_GAME = '/api/ability/game/create';
const SHOW_GAME = '/api/ability/game/show';
const UPDATE_GAME = '/api/ability/game/update';

const useAbilityGames = () => {

    const getGameList = (page = 1, searchTerm = null): Promise<any> => {
      
        const params = {page, search_text: searchTerm};
        return api.get<any>(GET_GAME_LIST, params).then((resp) => {
            return resp.getFirstData();
        });

    }

    const postGame = (body: any):  Promise<any> => {

        return api.post<void>(POST_GAME, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    const showGame = (id): Promise<Game> => {
      
        return api.get<any>(SHOW_GAME + '/' + id).then((resp) => {
            const rawData = resp.getFirstData();
            const planTask = rawData as Game;
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

    const updateGame = (id, body: any):  Promise<any> => {

        return api.post<void>(UPDATE_GAME + '/' + id, body).then((resp) => {
            return resp.getFirstData();
        });
    }

    return { getGameList, postGame, showGame, updateGame};

}

export default useAbilityGames;