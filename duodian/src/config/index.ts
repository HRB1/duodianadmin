import routes from '../router/router'
export let parents=[
  {
    groupName: "商品管理",
    show: true,
    groupIcon: "el-icon-s-goods",
  }, {
    groupName: "运营管理",
    show: false,
  },{
    groupName: "订单管理",
		show: true,
		groupIcon: "el-icon-s-flag",
  }
]
export const getPath = (routeName,menuList) => {
	let needId = ''
	function getPathId(prevId = "", list = menuList) {
		for (let ind = 0; ind < list.length; ind++) {
			let nowId
			let item = list[ind]
			if(item.meta){
				nowId= prevId + '/' + item.meta.groupName
			}else{
				nowId = prevId + '/' + item.groupName
			}
			if (item.name===routeName) {
				needId = nowId
				break;
			} else {
				if(item.child&&item.child.length){
					getPathId(nowId, item.child)
				}
			}
		}
	}
	getPathId('首页')
	return needId
}
export const getmenuList = () => {
	let menuList=routes.options.routes[1].children
	let list=parents.map(item=>({
		...item,
		child:menuList.filter(i=>i.meta.parent===item)
	}))
	let haveIcon=menuList.filter(i=>i.meta.groupIcon)
	list.forEach(i=>{
		haveIcon.push(i)
	})
	return haveIcon
}