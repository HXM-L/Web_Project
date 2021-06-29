<template>
	<div id="ShopCart">
		<el-container style="height: 100%;">
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
					<el-table class="" ref="buyerTable" border stripe
						:data="cartList.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark"
						style="width: 100%" height="520" border @selection-change="handleSelectionChange"
						:row-key="getkey">
						<el-table-column type="selection" width="55" :reserve-selection="true">
						</el-table-column>
						</el-table-column>
						<el-table-column label="商品名称" prop="name" width="130" />
						<el-table-column label="图片" width="100" align="center">
							<template slot-scope="scope">
								<el-popover placement="right" trigger="hover">
									<el-image slot="reference" :src="scope.row.img"  width="80" height="80" @click="getImgUrl(scope.row.img)"/>
									<el-image style="width: 250px; height: 250px" :src="scope.row.img" fit="cover" />
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column label="商品简介" prop="title" />
						<el-table-column label="单价" prop="price" width="90" header-align="center" align="right">
							<template slot-scope="scope">
								<div>￥{{ scope.row.price }}</div>
							</template>
						</el-table-column>
						<el-table-column label="数量" prop="title" width="100">
							<template slot-scope="scope">
								<div class="amount-warp">
									<input class="border" @input="cartGoodsAmountChange($event,scope.row)"
										v-model="scope.row.amount" />
									<div class="quick-button">
										<i class="border el-icon-arrow-up" @click="addAmountCount(scope.row)"></i>
										<i class="border el-icon-arrow-down"
											@click="subtractAmountCount(scope.row)"></i>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="小计" width="90" header-align="center" align="right">
							<template slot-scope="scope">
								<div>￥{{ (scope.row.price * scope.row.amount).toFixed(2) }}</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="80" align="center">
							<template slot-scope="scope">
								<el-tooltip class="item" effect="dark" content="删除" placement="top">
									<el-button size="mini" type="danger" icon="el-icon-delete"
										@click="deleteCartGoods(scope.row)" />
								</el-tooltip>
							</template>
						</el-table-column>
					</el-table>
					<div class="cart-option">
						<el-button type="danger" @click="batchDeleteCartGoods">删除选中商品</el-button>
						<div class="other-info">
							<div class="common">已选择<span class="total-num">{{this.multipleSelection.length}}</span>件商品
							</div>
							<div class="common">总价(不含运费):<span class="total-price">￥{{cartTotalPrice}}元</span></div>
							<el-button type="danger">去支付</el-button>
						</div>
					</div>
					<!-- 分页器 -->
					<div class="block" style="margin-top:15px;">
						<el-pagination align='center' @size-change="handleSizeChange"
							@current-change="handleCurrentChange" :current-page="currentPage"
							:page-sizes="[1,5,10,20,50,100]" :page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper" :total="cartList.length">
						</el-pagination>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				cartList: [{
						id: '1',
						name: '露肩裙子',
						img: require('../assets/clothes/1.png'),	//主要,需要加上require转化一下才可以正常显示图片
						title: '白糖大码女装2021早春胖妹妹显瘦连衣裙遮肚减龄露肩裙子长袖新款',
						price: '2.5',
						amount: 3,
					},
					{
						id: '2',
						name: '一字肩轻婚纱',
						img: require('../assets/clothes/2.png'),
						title: '一字肩轻婚纱2021新款气质主纱新娘夏季奢华遮粗手臂大拖尾公主风',
						price: '2.5',
						amount: 1,
					},
					{
						id: '3',
						name: '连衣裙',
						img: require('../assets/clothes/3.png'),
						title: '高端棉麻连衣裙女夏2021年新款小个子亚麻女装套装裙两件套裙子夏',
						price: '2.5',
						amount: 1,
					},
					{
						id: '4',
						name: '碎花连衣裙',
						img: require('../assets/clothes/4.png'),
						title: '2021年夏季新款法式复古茶歇裙碎花仙女显瘦长裙气质高级感连衣裙',
						price: '2.5',
						amount: 1,
					},
					{
						id: '5',
						name: '过膝雪纺裙子',
						img: require('../assets/clothes/5.png'),
						title: '碎花连衣裙夏天女2021年新款v领荷叶边气质女神范过膝雪纺裙子潮',
						price: '2.5',
						amount: 1,
					},
					{
						id: '6',
						name: '素雅复古旗袍',
						img: require('../assets/clothes/6.png'),
						title: '旗袍2021年新款女夏季素雅复古中国风花朵中长款年轻款改良连衣裙',
						price: '2.5',
						amount: 1,
					},
					{
						id: '7',
						name: '蚀骨旗袍',
						img: require('../assets/clothes/7.png'),
						title: '蚀骨旗袍年轻款优雅性感中国风时尚改良少女小香风连衣裙学生短款',
						price: '2.5',
						amount: 1,
					},
				],
				selectGoodsList: [],
				multipleSelection: [],
				select_lines: 0,
				currentPage: 1, // 当前页码
				total: 20, // 总条数
				pageSize: 5, // 每页的数据条数

			}
		},
		methods: {
			//解决触发两次handleSelectionChange
			getkey(row) {
				//row.id的id必须存在并且是唯一的值
				return row.id;
				console.log(row.id);
			},
			//select change
			handleSelectionChange(val) {
				this.multipleSelection = val;
				// this.selectGoodsList = val;
				// this.select_lines = this.multipleSelection.length;
				console.log(this.multipleSelection.length);
			},

			// 清空选择的值
			clearSelect() {
				this.$refs.buyerTable.clearSelection()
			},

			//改变每页显示记录的条数
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.currentPage = val;
			},

			//编辑按钮
			handleEdit(index, row) {
				console.log(index, row);
			},

			//删除按钮
			handleDelete(index, row) {
				console.log(index, row);
			},
			//获取图片路径
			getImgUrl(row){
				console.log(row);
				// console.log(row.img);
				// return row.img;
			},
			//页面跳转事件
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
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 0) {
					return 'th';
				}
				return '';
			},
			switchChange() {
				this.istag = !this.istag;

			},

			current_change: function(currentPage) {
				this.currentPage = currentPage;
			},
			created: function() {
				this.total = this.tableData.length;
			},
			// // 获取购物车列表（这个要在created里面调用）
			// async getCartList() {
			// 	const {
			// 		data: res
			// 	} = await this.$http.get(getCartListUrl)
			// 	if (res.code !== 200) return this.$message.error(res.msg)
			// 	this.cartList = res.data.list
			// 	this.cartList.forEach(item => {
			// 		// 因为后台接口返回的商品SKU是对象的格式，我们取它的值，然后重新赋值使用
			// 		if (item.skuJson) {
			// 			item.sku = []
			// 			for (let i in item.skuJson) {
			// 				item.sku.push(item.skuJson[i])
			// 			}
			// 			item.sku = item.sku.join('，')
			// 		}
			// 	})
			// },
			// 购物车选择事件（elemenUI表格勾选保存的值）
			cartSelectionChange(val) {
				this.multipleSelection = val;

			},
			// 商品数量文本框改变事件
			cartGoodsAmountChange(e, orderInfo) {
				if (e.target.value <= 0) {
					orderInfo.amount = 1
					return this.$message.error('商品数量不能小于0')
				}
			},
			// 商品数量加1
			addAmountCount(orderInfo) {
				++orderInfo.amount
			},
			// 商品数量减1
			subtractAmountCount(orderInfo) {
				if (orderInfo.amount <= 1) {
					return this.$message.error('商品数量不能小于0')
				}
				--orderInfo.amount
			},
			// 单个删除购物车商品
			deleteCartGoods(row) {
				console.log(row);
				this.$confirm('此操作将移除购物车的商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					// 这里调用接口删除的方法
				}).catch((e) => {
					console.log(e)
					this.$message.info('已取消删除')
				})
			},
			// 批量删除购物车商品
			batchDeleteCartGoods() {
				if (this.multipleSelection.length > 0) {} else {
					return this.$message.error('请勾选要移除购物车的商品')
				}
				this.$confirm('此操作将移除勾选的购物车的商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					// 这里调用接口删除的方法
				}).catch((e) => {
					console.log(e)
					this.$message.info('已取消删除')
				})
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		computed: { //存在缓存，建议不经常的变化的在次操作
			//计算总价
			cartTotalPrice() {
				let sum = 0
				this.multipleSelection.forEach(item => {
					sum += item.price * item.amount
				})
				// 因为要保留小数点后面两位，所以要toFixed(2)
				return sum.toFixed(2);
				// return 0.0;
			},
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	#ShopCart {
		position: absolute;
		display: flex;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* background-color: #faffe5; */
	}

	.el-header {
		background-color: #cccccc;
		color: #333;
		text-align: center;
		height: 5%;
		line-height: 25px;
	}

	.el-main {
		/* background-color: #00ffff; */
		text-align: center;
		width: 100%;
		height: 95%;
	}

	.el-main>div {
		width: 90%;
		margin: 0px auto;
		padding-top: 20px;
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

	input[type="search"] {
		width: 600px;
		height: 35px;
		font-size: 15px;
		outline: none;
		border: 2px solid #0000FF;
		border-radius: 5px;
	}

	.el-main>div>p>.el-button {
		width: 60px;
		height: 35px;
		font-size: 15px;
		margin-bottom: 20px;
	}

	.cart-option {
		position: relative;
		height: 31px;
		/* font-size: 50px; */
		background-color: #c3c3c3;
		border: 1px solid transparent;
	}

	.cart-option>.el-button {
		position: absolute;
		left: 5px;
		top: 2px;
		height: 25px;
		line-height: 25px;
	}

	.other-info {
		position: absolute;
		display: flex;
		float: right;
		margin-right: 0px;
		left: 900px;
	}

	.other-info>.el-button {
		position: absolute;
		right: -50px;
		top: 2px;
		height: 25px;
		line-height: 25px;
	}

	.amount-warp {
		display: flex;
	}

	.amount-warp>input {
		width: 50px;
		height: 31px;
		line-height: 30px;
		padding-left: 10px;
		outline: none;
	}

	.amount-warp>.quick-button>i {
		display: block;
		width: 30px;
		height: 16px;
		border-left: none;
		text-align: center;
		line-height: 16px;
		cursor: pointer;
	}

	.border {
		border: 1px solid #a3a3a3;
	}

	.common {
		margin-right: 20PX;
	}

	.item {
		width: 50px;
		height: 30px;
	}

	.total-num {
		color: #FF0000;
	}

	.total-price {
		color: #FF0000;
		font-weight: 800;
	}
</style>
