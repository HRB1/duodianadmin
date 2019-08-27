import api from '@/api/shoplist';
import { MutationTree, ActionTree, GetterTree } from "vuex";
import state, { States } from "./state"

const actions: ActionTree<States, any> = {
    // 获取商品分类
    async GET_TYPE_ACTION({ commit, state: States }) {
        let getType = await api.getType();
        commit("GET_TYPE_MUTATION", getType)
    },
    //添加商品分类
    async ADD_TYPE_ACTION({ commit }, obj) {
        await api.addType(obj)
    },
    //获取商品子分类
    async GET_CATEGORY_ACTION({ commit, state: States }) {
        let getCategory=await api.getCategory()
        commit("GET_CATEGORY_MUTATION", getCategory)
    },
    async ADD_CATEGORY_ACTION({ commit }, obj) {
        await api.addCategory(obj)
    }
};

const mutations: MutationTree<any> = {
    //获取商品分类
    GET_TYPE_MUTATION(
        state: any,
        res: any
    ): void {
        let { code, data } = res
        if (code) {
            state.getType = data;
        }
    },
    //获取商品子分类
    GET_CATEGORY_MUTATION(
        state: any,
        res: any
    ):void{
        let { code, data } = res;
        if (code) {
            state.getCategory = data;
        }
    }
}

const getters: GetterTree<States, any> = {
    // 获取商品分类
    GET_TYPE_GETTER(
        state: any
    ): void {
        return state.getType
    },
    //获取商品子分类
    GET_CATEGORY_GETTER(
        state: any
    ):void{
        return state.getCategory
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
};