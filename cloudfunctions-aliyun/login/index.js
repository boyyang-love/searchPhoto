'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	let mes = await (async (event) => {
		const collection = await db.collection('users')
		let res = await collection.where({
			username: event.username
		}).get()
		if (res.affectedDocs == 0) {
			return {
				reback: "没有该账号，请注册",
				isRegister: true
			}
		} else {
			// 查询账号以及密码是否都正确
			let surePassword = await collection.where({
				username: event.username,
				password: event.password
			}).get()

			if (surePassword.affectedDocs == 0) {
				return {
					reback: "密码错误，请检查密码是否正确",
					isRegister: false
				}
			} else {
				return {
					reback: "登录成功",
					ToCenter: true
				}
			}

		}
	})(event)

	return {
		mes
	}
};
