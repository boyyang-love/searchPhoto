'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ' + event)
	//返回数据给客户端
	// return event
	let mes = ''
	let isLogin = false
	const collection = await db.collection('users')
	let res = await collection.where({
		username: event.username
	}).get()
	console.log(res)
	if(res.affectedDocs == 0){
		collection.add(event)
		mes = '注册成功',
		isLogin = true
	}else {
		mes = '用户名已经存在'
	}
	
	return {mes, isLogin}
};
