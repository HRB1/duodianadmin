import request from '../utils/http'
export default {
    //管理员登陆接口
    login: (data:object) => request.post('/api/admin/login', data), 
    //获取所有商品
    allshop:() => request.get('/api/shop/allShop'),
    //获取商品分类
    getType: () => request.get('/api/shop/getType'),
    //获取商品子分类
    getCategory: () => request.get('/api/shop/getCategory'),
    //添加商品接口
    addShop:(data:object) => request.post('/api/shop/addShop',data), 
    //搜索
    searchData: (data:object) => request.get("/api/search", {
        params: data
    }),
}