<template>
	<div id="index">
		<el-container>
			<el-header style="height: 35px;">
				<ul>
					<li>
						<div class="userImg">
							<el-avatar icon="el-icon-s-custom"></el-avatar>
							<!-- 把用户名传递过来 -->
							欢迎{{ $route.params.name }}
						</div>
					</li>
					<li @click='changePage("Index")'>商城首页</li>
					<li @click='changePage("ShopCart")'>购物车</li>
					<li @click='changePage("Favorites")'>收藏夹</li>
					<li @click='changePage("PerCenter")'>个人中心</li>
					<li @click='changePage("exit")'>退出登录</li>
				</ul>
			</el-header>
			<el-main>
				<div>
					<p>
						<input type="search" name="" id="" value="" placeholder="请输入搜索内容" />
						<el-button type="primary" icon="el-icon-search">搜索</el-button>
					</p>
				</div>
				<div>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="每日推荐" name="first">
							<div><DailyRecom></DailyRecom></div>
						</el-tab-pane>
						<el-tab-pane label="潮流服饰" name="second">
							<div><FashionClothes></FashionClothes></div>
						</el-tab-pane>
						<el-tab-pane label="时尚鞋子" name="third">
							<div><FashionShoes></FashionShoes></div>
						</el-tab-pane>
						<el-tab-pane label="精品首饰" name="fourth">
							<div><FineJewelry></FineJewelry></div>
						</el-tab-pane>
						<el-tab-pane label="数码产品" name="five">
							<div><Electronics></Electronics></div>
						</el-tab-pane>
						<el-tab-pane label="新鲜蔬果" name="six">
							<div><FruitsVegetables></FruitsVegetables></div>
						</el-tab-pane>
						<el-tab-pane label="更多>>" name="seven">
							<div><More></More></div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import DailyRecom from './index/DailyRecom.vue';
	import FashionClothes from './index/FashionClothes.vue';
	import FashionShoes from './index/FashionShoes.vue';
	import FineJewelry from './index/FineJewelry.vue';
	import Electronics from './index/Electronics.vue';
	import FruitsVegetables from './index/FruitsVegetables.vue';
	import More from './index/More.vue';
	export default {
		data() {
			return {
				activeName: 'first',
				activeIndex: '1',
			}
		},
		methods: {
			changePage(path) {
				var pathNow = this.$route.path;
				var pathSplit = pathNow.split("/");
				var nameNow = pathSplit[pathSplit.length - 1];
				if (path == "Index") {
					console.log(pathSplit);
					console.log(nameNow);
					console.log('/Index/' + nameNow);
					this.$router.push('/Index/' + nameNow);
				} else if (path == "ShopCart") {
					console.log('/ShopCart/' + nameNow)
					this.$router.push('/ShopCart/' + nameNow);
				} else if (path == "Favorites") {
					console.log('/Favorites/' + nameNow)
					this.$router.push('/Favorites/' + nameNow);
				} else if (path == "PerCenter"){
					console.log('/PerCenter/' + nameNow)
					this.$router.push('/PerCenter/' + nameNow);
				}else if (path == "exit"){
					console.log('/PerCenter/' + nameNow)
					this.$router.push('/login');
				}
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		components: {
			DailyRecom,
			FashionClothes,
			FashionShoes,
			FineJewelry,
			Electronics,
			FruitsVegetables,
			More,
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	#index {
		position: absolute;
		display: flex;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* background-color: #FF0000; */

	}

	.el-header {
		background-color: #cccccc;
		color: #333;
		text-align: center;
		height: 5%;
		line-height: 25px;
	}

	.el-main {
		background-color: #ffffff;
		color: #000000;
		text-align: center;
		height: 95%;
		background-image: url(../assets/7.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/* background-color: #0000FF; */
	}

	.el-container {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}

	.el-header>ul {
		position: absolute;
		right: 5px;
	}

	.el-header>ul>li {
		float: left;
		list-style: none;
		margin: 5px;
		user-select: none;
	}

	.el-header>ul>li:not(:first-child):hover {
		color: red;
		text-decoration: underline;
	}

	.el-avatar {
		position: absolute;
		left: -30px;
		top: 2px;
		width: 33px;
		height: 30px;
		color: #42B983;
		/* border: 1px solid #0000FF; */
	}

	.el-avatar--icon {
		font-size: 35px;
	}

	.userImg {
		display: flex;
		/* align-items: center; */
		vertical-align: middle;
	}

	input[type="search"] {
		width: 600px;
		height: 35px;
		font-size: 15px;
		outline: none;
		border: 2px solid #0000FF;
		border-radius: 5px;
	}

	.el-button {
		width: 60px;
		height: 35px;
		font-size: 15px;
	}

	.el-main>div {
		margin-top: 5px;
		/* background-image: url(../assets/7.png); */
	}

	.el-main>div:nth-of-type(2) {
		position: absolute;
		width: 88%;
		left: 50%;
		transform: translate(-50%, 0);
		/* background-color: #0000FF; */
		/* background-image: url(../assets/7.png); */
	}

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
		/* margin-right: 5px;
		margin-bottom: 15px; */
	}

	.button {
		padding: 0;
		float: right;
		margin-right: 34px;
		margin-top: 9px;
	}

	.image {
		/* position: absolute; */
		margin: 0 auto;
		width: 90%;
		display: block;
		border-radius: 10px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
	
	.el-menu-demo {
		/* background-color: #0000FF; */
		font-size: 25px;
		color: #cccccc;
	}
	..el-submenu{
		height: 28px;
	}
	.el-submenu__title{
		font-size: 20px;
		color: #cccccc;
		margin-top: -18px;
		height: 28px;
	}
	.el-submenu__title:hover{
		height: 28px;
	}
	.el-menu--horizontal>.el-submenu .el-submenu__title{
		height: 28px;
		line-height: 28px;
		/* background-color: red; */
		font-size: 20px;
		color: #cccccc;
	}
	.el-submenu{
		font-size: 20px !important;
		color: #cccccc !important;
		background-color: transparent !important; 
		/* background-color: red !important; */
	}
</style>
