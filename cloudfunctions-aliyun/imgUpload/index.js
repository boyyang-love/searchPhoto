'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	const dbCmd = db.command
	let mes = await (async (event) => {
		const collection = await db.collection('users')
		let res = await collection.where({
			username: event.nickname
		}).get()

		if (res.affectedDocs == 0) {
			console.log('没有上传')
		} else {
			console.log(res.data[0]._id)
			let upResult = await collection.doc(res.data[0]._id).update({
				imgurl: event.imgurl
			})
		}

	})(event)

	return {
		mes
	}
};
