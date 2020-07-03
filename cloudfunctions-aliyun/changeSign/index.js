'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let mes = await (async (event) => {
		const collection = await db.collection('users')
		let res = await collection.where({
			username: event.nickname
		}).get()

		if (res.affectedDocs == 0) {
			return '签名更改失败!'
		} else {
			let upResult = await collection.doc(res.data[0]._id).update({
				sign: event.sign
			})
			return '签名更改成功！'
		}

	})(event)

	return {
		mes
	}
};
