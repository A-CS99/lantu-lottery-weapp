<template>
	<view class="container">
		<image class="container-bg" src="../../static/background.png"/>
		<view v-if="!hasSubmit" class="content-flex">
			<view class="id-card">
				<image class="id-card-bg" src="../../static/IDCard.png"/>
				<view class="id-card-content">
					<button class="avatar-wrapper" :disabled="!noNameUsed" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">
						<image class="avatar" :src="avatarUrl"/>
						<view class="avatar-text">{{avatarText}}</view>
					</button>
					<view class="info">
						<view class="name-container">
							<view class="name-text">姓名:</view>
							<view class="name-content" v-if="!noNameUsed">{{nameUsed}}</view>
							<input class="name-input" v-else type="nickname" confirm-type="done" placeholder="请输入真实姓名" @blur="updateInputValue"/>
						</view>
						<view class="title-container">
							<view class="title-text">身份:</view>
							<view class="title-content">青年学者</view>
						</view>
					</view>
				</view>
			</view>
			<button class="submit-button" v-if="noNameUsed" @click="handleSubmit">
				<view class="submit-button-text">参与抽奖</view>
			</button>
		</view>
		<view v-else class="success-container">
			<view class="bupt-logo-wrapper">
				<image class="bupt-logo" src="../../static/bupt-logo.png"/>
			</view>
			<view class="success-text">报名成功</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			uni.getStorage({
				key: "name",
				success: (res) => {
					console.log(res)
					this.avatarUrl = res.data.avatarUrl
					this.nameUsed = res.data.name
				}
			})
		},
		data() {
			const defaultAvatarUrl = 'https://upload.wikimedia.org/wikipedia/zh/thumb/b/bb/Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg/1280px-Emblem_of_Beijing_University_of_Posts_and_Telecommunications.svg.png'
			return {
				nameUsed: "",
				hasSubmit: false,
				avatarUrl: defaultAvatarUrl,
				inputValue: "请输入真实姓名"
			}
		},
		computed: {
			noNameUsed(){
				return this.nameUsed == ""
			},
			avatarText(){
				if(this.noNameUsed){
					return "更换头像"
				}else{
					return "我的头像"
				}
			}
		},
		methods: {
			handleChooseAvatar: function(e){
				const {avatarUrl} = e.detail
				this.avatarUrl = avatarUrl
				console.log(this.avatarUrl)
			},
			updateInputValue: function(e){
				const {value} = e.detail
				this.inputValue = value
				console.log(this.inputValue)
			},
			handleSubmit: function(){
				if(this.inputValue == "请输入真实姓名" || this.inputValue=="") {
					setTimeout(()=>{
						uni.showToast({
							title: "请输入真实姓名",
							icon: 'error'
						})
					},1000)
					return ;
				}
				const submitInfo = {avatarUrl: this.avatarUrl, name: this.inputValue}
				console.log(submitInfo)
				this.hasSubmit = true
				uni.setStorage({
					key: "name",
					data: submitInfo
				})
			}
		}
	}
</script>

<style>
	.container {
		position: relative;
		z-index: 0;
		height: 100vh;
	}
	.container-bg {
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
	
	.content-flex {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}
	.id-card {
		/* 教工卡 */
		position: absolute;
		width: 78vw;
		height: 50vw;
		top: 25vh;
	}
	
	.id-card-bg {
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
	.id-card-content {
		margin: 12vw 5vw 0;
		height: 30vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.avatar-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 14vw;
		height: 17vw;
		margin: 0 20px;
	}
	.avatar {
		width: 14vw;
		height: 14vw;
	}
	.avatar-text {
		width: 14vw;
		height: 3vw;
		font-size: 2vw;
		line-height: 3vw;
		font-family: Microsoft YaHei UI;
		color: white;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.info {
		width: fit-content;
		height: fit-content;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.name-container {
		width: fit-content;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.name-text {
		width: 10vw;
		height: 5vw;
		color: rgb(128, 128, 128);
		font-family: Microsoft YaHei UI;
		font-size: 3.5vw;
		font-weight: 400;
		line-height: 5vw;
		letter-spacing: 0.5vw;
		text-align: left;
	}
	.name-input{
		width: 30vw;
		height: 5vw;
		margin-left: 2vw;
		font-size: 3.5vw;
		font-family: Microsoft YaHei UI;
		font-weight: 400;
		text-align: center;
		line-height: 5vw;
		border-radius: 20px;
		background: rgb(239, 239, 239);
	}
	.name-content{
		width: 30vw;
		height: 5vw;
		margin-left: 2vw;
		color: rgb(128, 128, 128);
		font-family: Microsoft YaHei UI;
		font-size: 3.5vw;
		font-weight: 400;
		line-height: 5vw;
		letter-spacing: 0.5vw;
	}
	.title-container {
		width: fit-content;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 2vw;
	}
	.title-text {
		width: 10vw;
		height: 5vw;
		color: rgb(128, 128, 128);
		font-family: Microsoft YaHei UI;
		font-size: 3.5vw;
		font-weight: 400;
		line-height: 5vw;
		letter-spacing: 0.5vw;
		text-align: left;
	}
	.title-content{
		width: 30vw;
		height: 5vw;
		margin-left: 2vw;
		color: rgb(128, 128, 128);
		font-family: Microsoft YaHei UI;
		font-size: 3.5vw;
		font-weight: 400;
		line-height: 5vw;
		letter-spacing: 0.5vw;
	}
	.submit-button {
		position: absolute;
		padding: 0;
		width: 30vw;
		height: 30vw;
		bottom: 18vh;
		border-radius: 50%;
		box-shadow: inset 0px 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	.submit-button-text {
		width: 20vw;
		height: 20vw;
		margin: 5vw;
		color: rgb(1, 58, 137);
		font-family: Microsoft YaHei UI;
		font-size: 7.5vw;
		font-weight: 700;
		line-height: 10vw;
		letter-spacing: 1vw;
		text-align: center;
	}
	.success-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.bupt-logo-wrapper {
		position: relative;
		z-index: 0;
		top: 25vh;
		width: 30vh;
		height: 30vh;
		border-radius: 50%;
	}
	.bupt-logo {
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
	.success-text {
		position: absolute;
		bottom: 25vh;
		color: rgb(255, 255, 255);
		font-family: Microsoft YaHei UI;
		font-size: 60px;
		font-weight: 700;
		line-height: 80px;
		letter-spacing: 0px;
		text-align: center;
	}
</style>
