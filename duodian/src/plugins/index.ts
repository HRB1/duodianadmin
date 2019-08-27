import components from '@/components/index.ts'
function toComponentName(name){
    return name.replace(/[A-Z]/g,(reg)=>{
        return '-'+reg.toLowerCase()
    })
}
export default {
    install(Vue){
        Object.keys(components).forEach(name=>{
            let newname = toComponentName(name)
            Vue.component(newname,components[name])
        })
    }
}