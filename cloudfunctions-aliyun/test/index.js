'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ' + event)
	//返回数据给客户端
	// return event
	// const collection = await db.collection('test')
	// const res = await collection.where({iv:event.iv}).get()
	// console.log()
};
