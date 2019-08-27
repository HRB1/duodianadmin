import axios from "axios"
import Vue from "vue"
import Cookie from "js-cookie"
import router from "../router/router"

axios.interceptors.request.use((config) => {
	return {
		...config,
		headers: {
			...config.headers,
			// authorization: Cookie.get("token")
			authorization: window.sessionStorage.getItem("token")
		}
	}
}, (error) => {
	return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
	try {
		if (response.data.code) {
			return response.data;
		} else {
			Vue.Message({
				message: response.data.msg,
				type: "error"
			})
			return Promise.reject(response.data)
		}
	} catch (error) {

	}
}, (error) => {
	let response = error.response
	if (response.status === 401) {
		router.push("/")
	}
	Vue.Message({
		message: response.data.msg || response.statusText,
		type: "error"
	})
	return Promise.reject(error)
})



export default axios
