'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//登录逻辑
	let mes = await (async(event) => {
		const collection = await db.collection('users')
		let res = await collection.where({
			username: event.username
		}).get()
		if (res.affectedDocs == 0) {
			let addRes = await collection.add(event)
			console.log(addRes)
			return {
				reback: '注册成功！！',
				isLogin: true
			}
		} else {
			return {
				reback: '用户名已经存在！！',
				isLogin: false
			}
		}
	})(event)

	return {
		mes
	}

};
