import request from "@/utils/http";
export default {
    //获取所有banner
    getAllBanner:():object=>request.get("/api//home/banner"),
    addBanner:(data:object)=>request.post("/api/home/addBanner",data)
}