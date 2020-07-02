<template>
	<view>
		<view class="container">
			<view class="userImage">
				<image src="../../static/icon/我的(1).png" mode=""></image>
			</view>
			<form @submit="formSubmit">
				<view class="register">
					<view class="user"><text class="iconfont icon-denglu3"></text>账号:<input name="username" type="text" value="" /></view>
					<view class="psw"><text class="iconfont icon-14"></text>密码:<input name="password" type="password" value="" /></view>
					<view class="repsw"><text class="iconfont icon-14"></text>密码:<input name="repassword" type="password" value="" /></view>
				</view>
				<view class="submitInfo">
					<button type="primary" form-type="submit">注册</button>
				</view>
			</form>
			<!-- <view class="otherLogin">
				<button type="default" open-type="getUserInfo" @getuserinfo='getUserInfo'><text class="iconfont icon-weixindenglu"></text></button>
			</view> -->
		</view>
		<!-- <view class="loged" v-if="isshow">
			<text>this is loged</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			formSubmit(e) {
				let username = e.detail.value.username
				let password = e.detail.value.password
				let repassword = e.detail.value.repassword
				if (username && password && repassword) {
					if (password.length < 6 || password.length > 10) {
						uni.showModal({
							title: '错误提示',
							content: "密码位数在6~10位",
							mask: true,
							showCancel: false
						})
					} else {
						if (password === repassword) {
							uniCloud.callFunction({
								name: 'register',
								data: e.detail.value,

								success: (res) => {
									uni.showModal({
										title: res.result.mes.reback,
										showCancel: false
									})
									console.log(res)
									setTimeout(function() {
										if (res.result.mes.isLogin == true) {
											uni.switchTab({
												url: '/pages/mine/mine'
											});
										}
									}, 2000);
								},

								fail: (err) => {
									uni.showModal({
										title: '错误提示',
										content: '注册失败',
										mask: true,
										showCancel: false
									})
								}
							})
						} else {
							uni.showModal({
								title: '错误提示',
								content: "两次密码不一致",
								mask: true,
								showCancel: false
							})
						}
					}

				} else {
					uni.showModal({
						title: '错误提示',
						content: "每项为必填项",
						mask: true,
						showCancel: false
					})
				}
			},
		}
	}
</script>

<style lang='less'>
	.container {
		.otherLogin {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			button {
				width: 90rpx;
				height: 90rpx;
				border-radius: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 45rpx;

				text {
					font-size: 90rpx;
					color: green;
				}
			}
		}

		.submitInfo {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			button {
				width: 85%;
				margin: 35rpx;
			}
		}

		.userImage {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 350rpx;
				height: 350rpx;
				border: 1px solid rgba(0, 0, 0, 0.1);
				border-radius: 100%;
				margin: 35rpx;
			}
		}

		.register {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			view {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 85%;
				height: 50rpx;
				border-bottom: 1px solid gray;
				margin: 35rpx;

				.iconfont {
					font-size: 45rpx;
					padding: 4rpx 15rpx;
				}

				input {
					margin-left: 55rpx;
				}
			}
		}
	}
</style>
