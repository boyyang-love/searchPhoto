<template>
	<view>
		<view class="container" v-if="show">
			<view class="userImage">
				<image src="../../static/icon/我的(1).png" mode=""></image>
			</view>
			<form @submit="formSubmit">
				<view class="login">
					<view class="user"><text class="iconfont icon-denglu3"></text>账号:<input name="username" type="text" value="" /></view>
					<view class="psw"><text class="iconfont icon-14"></text>密码:<input name="password" type="password" value="" /></view>
				</view>
				<view class="submitInfo">
					<button type="primary" form-type="submit">登录 / 注册</button>
				</view>
			</form>
			<view class="otherLogin">
				<button type="default" open-type="getUserInfo" @getuserinfo='getUserInfo' @click="ToCenter"><text class="iconfont icon-weixindenglu"></text></button>
			</view>
		</view>
		<view class="loged" v-if="isshow">
			<view class="headImage" @click="changeImage">
				<image :src="img" mode=""></image>
			</view>
			<view class="nickName">
				<text>{{nickName}}</text>
			</view>
			<view class="imgShare">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				isshow: false,
				nickName: '',
				img: '',
			};
		},
		methods: {
			changeImage() {
				let self = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						let imgUrl = res.tempFilePaths[0]
						self.img = imgUrl
						uniCloud.callFunction({
							name: 'imgUpload',
							data: {
								imgurl: imgUrl,
								nickname: self.nickName
							}
						})
					}
				});
			},
			ToCenter() {
				this.show = false
				this.isshow = true
			},
			formSubmit(e) {
				let self = this
				let username = e.detail.value.username
				let password = e.detail.value.password
				console.log(e)
				if (username && password) {
					if (password.length < 6 || password.length > 10) {
						uni.showModal({
							title: '错误提示',
							content: "密码位数应在6~10位",
							showCancel: false,
							mask: true
						})
					} else {
						uniCloud.callFunction({
							name: "login",
							data: e.detail.value,
							success: (res) => {
								uni.showModal({
									title: res.result.mes.reback,
									showCancel: false,
									mask: true
								})
								//没有账号自动跳到注册页面
								setTimeout(function() {
									if (res.result.mes.isRegister == true) {
										uni.navigateTo({
											url: '/pages/register/register'
										});
									}
								}, 2000);
								//登录成功
								if (res.result.mes.ToCenter == true) {
									this.show = false
									this.isshow = true
									this.nickName = username
								}
								console.log(res)

							}
						})
					}
				} else {
					uni.showModal({
						title: "错误提示",
						content: "密码和账号为必填项",
						showCancel: false,
						mask: true
					})
				}
			},
			getUserInfo(e) {
				this.show = false
				this.isshow = true
			},
		}
	}
</script>

<style lang='less'>
	/* 登录界面样式 */
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

		.login {
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

	/* 个人中心样式 */
	.loged {
		width: 100%;

		.nickName {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 35rpx;
			font-size: 55rpx;
		}

		.headImage {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 35rpx;

			image {
				width: 300rpx;
				height: 300rpx;
				border-radius: 100%;
				border: 10rpx solid white;
				box-shadow: 0rpx 3rpx 5rpx 0rpx rgba(0, 0, 0, 0.4);
			}
		}
	}
</style>
