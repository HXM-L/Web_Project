<template>
	<div id="PerCenter">
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
					<div>
						<img src="../../public/imgs/1.jpg">
						<div id="active_hover" @click="hover_click">
							<img src="../../public/imgs/camera.png">
						</div>
					</div>
					<div class="baseInfo">
						<div>
							<h3>基本信息</h3>
						</div>
						<div>
							<ul>
								<li>
									<P>用户昵称:&nbsp;<span>{{ruleForm.name}}</span></P>
								</li>
								<li>
									<P>用户ID:&nbsp;<span>{{ruleForm.id}}</span></P>
								</li>
								<li>
									<P>性别:&nbsp;<span>{{ruleForm.resource}}</span></P>
								</li>
								<li>
									<P>所在地区:&nbsp;<span>{{ruleForm.region.toString()}}</span></P>
								</li>
								<li>
									<P>出生日期:&nbsp;<span>{{ruleForm.date1}}</span></P>
								</li>
								<li>
									<P>兴趣爱好:&nbsp;<span>{{(ruleForm.type).toString()}}</span></P>
								</li>
								<li>
									<P>个人简介:&nbsp;<span>{{ruleForm.desc}}</span></P>
								</li>
								<li>
									<p>
										<el-button type="primary" class="edit" @click="EditInfo">编辑</el-button>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
		<el-dialog title="请上传图片" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="个人信息编辑区域" :visible.sync="editFlag" width="30%" :before-close="handleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户昵称:" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="性别:" prop="resource">
					<el-radio-group v-model="ruleForm.resource">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="所在地区:" prop="region">
					<el-cascader v-model="ruleForm.region" :options="options" :props="{ expandTrigger: 'hover' }"
						@change="handleChange"></el-cascader>
				</el-form-item>
				<el-form-item label="出生日期:" required>
					<el-col :span="13">
						<el-date-picker type="date" value-format="yyyy-MM-dd" @change="getTime" placeholder="选择日期"
							v-model="ruleForm.date1" style="width: 100%;">
						</el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="兴趣爱好:" prop="type">
					<el-checkbox-group v-model="ruleForm.type">
						<el-checkbox label="看书" name="type"></el-checkbox>
						<el-checkbox label="游泳" name="type"></el-checkbox>
						<el-checkbox label="打羽毛球" name="type"></el-checkbox>
						<el-checkbox label="打篮球" name="type"></el-checkbox>
						<el-checkbox label="其他" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="个人简介" prop="desc">
					<el-input type="textarea" v-model="ruleForm.desc"></el-input>
				</el-form-item>
				<el-form-item class="last_footer">
					<el-button type="primary" @click="submitForm('ruleForm')" class="edit">提交</el-button>
					<el-button @click="resetForm('ruleForm')" class="edit">重置</el-button>
					<el-button type="primary" @click="editFlag=false" class="edit">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				editFlag: false,
				ruleForm: {
					id:'2018324141',	//用户ID
					name: 'Amy',	//用户昵称
					region: '广东 / 湛江',	//用户地址
					date1: '2000-07-12',	//用户生日
					type: ["看书","游泳"],	//用户爱好
					resource: '女',	//用户性别
					desc: '咔咔咔咔咔咔扩扩扩扩扩扩扩扩扩扩',	//用户简介
				},
				activeIndex: '1',
				rules: {
					name: [{
							required: true,
							message: '请输入昵称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					region: [{
						required: true,
						message: '请选择地区',
						trigger: 'change'
					}],
					date1: [{
						// type: 'string',
						required: true,
						message: '请选择出生日期',
						trigger: 'change'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一项爱好',
						trigger: 'change'
					}],
					resource: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写个人简介',
						trigger: 'blur'
					}],
				},
				value: [],
				options: [{
					value: '广东',
					label: '广东',
					children: [{
						value: '广州',
						label: '广州',
					}, {
						value: '深圳',
						label: '深圳',
					}, {
						value: '东莞',
						label: '东莞',
					}, {
						value: '湛江',
						label: '湛江',
					}, {
						value: '云浮',
						label: '云浮',
					}, {
						value: '其他',
						label: '其他',
					}]
				}, {
					value: '上海',
					label: '上海',
					children: [{
						value: '黄浦区',
						label: '黄浦区',
					}, {
						value: '卢湾区',
						label: '卢湾区',
					}, {
						value: '长宁区',
						label: '长宁区',
					}, {
						value: '其他',
						label: '其他',
					}]
				}, {
					value: '北京',
					label: '北京',
					children: [{
						value: '东城区',
						label: '东城区'
					}, {
						value: '西城区',
						label: '西城区'
					}, {
						value: '朝阳区',
						label: '朝阳区'
					}, {
						value: '其他',
						label: '其他'
					}]
				}],
				//数据库
				db: null,
				// 全部任务清单
				List: [],
				// 添加任务清单
				addList: {
					id: '2018324141',
					name: 'Amy',
					password:'123456',
					sex: '',
					address:'',
					birth:'',
					hobby:'',
					introduction:'',
				},
			};
		},
		created() {
			this.indexedDB();
			// this.readList()
		},
		methods: {
			getTime(date) {
				this.ruleForm.date1 = date;
				console.log(this.ruleForm.date1); //这个数据就可以直接拿过去传给后台用
			},
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
				}  else if (path == "PerCenter"){
					console.log('/PerCenter/' + nameNow)
					this.$router.push('/PerCenter/' + nameNow);
				}else if (path == "exit"){
					console.log('/PerCenter/' + nameNow)
					this.$router.push('/login');
				}
			},

			//头像遮罩层点击事件
			//点击上传头像
			hover_click() {
				this.dialogVisible = true;
			},
			//关闭对话框
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			//修改个人信息
			EditInfo() {
				this.editFlag = true;
				console.log(this.$route.params.name);
			},
			// 初始化indexedDB
			indexedDB() {
				// 打开数据库，两个参数（数据库名字，版本号），如果数据库不存在则创建一个新的库
				var request = window.indexedDB.open('Final_Works', '1')
				// 数据库操作过程中出错，则错误回调被触发
				request.onerror = (event) => {
					console.log(event)
				}
				this.request = request
				// 创建一个新的数据库或者修改数据库版本号时触发
				request.onupgradeneeded = (event) => {
					var db = event.target.result
					// 创建对象仓库用来存储数据，把id作为keyPath，keyPath必须保证不重复，相当于数据库的主键
					var objectStore = db.createObjectStore('UserList', {
						keyPath: 'id'
					})
				}
				// 数据库操作一切正常，所有操作后触发
				this.request.onsuccess = (event) => {
					this.db = event.target.result
					this.readList()
				}
			},
			
			//读取数据
			readList() {
				var transaction = this.db.transaction('UserList').objectStore('UserList')
				var request = transaction.getAll()
			
				request.onerror = (event) => {
					this.$message.error('事务失败')
				}
			
				request.onsuccess = (event) => {
					this.List = request.result
					var tempList=this.List;
					for(var item in tempList) {
					    console.log(tempList[item]);
						var username=this.$route.params.name;
						if(tempList[item].name==username){
							this.ruleForm.name=tempList[item].name;
							this.ruleForm.id=tempList[item].id;
							this.ruleForm.resource=tempList[item].sex;
							this.ruleForm.region=tempList[item].address;
							this.ruleForm.date1=tempList[item].birth;
							this.ruleForm.type=tempList[item].hobby;
							this.ruleForm.desc=tempList[item].introduction;
							this.ruleForm.checkPass=tempList[item].password;
							// console.log(loginFlag);
						}else{
							// console.log(loginFlag);
						}
					}
					console.log("request.result");
					console.log(request.result);
				}
			},
			//更新用户信息
			updateUserInfor() {
				this.addList.id=this.ruleForm.id;
				this.addList.name = this.ruleForm.name;
				this.addList.password = this.ruleForm.checkPass;
				this.addList.address = this.ruleForm.region;
				this.addList.birth = this.ruleForm.date1;
				this.addList.sex = this.ruleForm.resource;
				this.addList.hobby = this.ruleForm.type;
				console.log(this.ruleForm.type);
				this.addList.introduction = this.ruleForm.desc;
				if (this.addList.name !== '') {
					var request = this.db.transaction('UserList', 'readwrite')
						.objectStore('UserList')
						.put(this.addList)
			
					request.onsuccess = (event) => {
						this.$message.success('数据更新成功')
						this.updateDialogFormVisible = false
						this.readList()
						this.addList = {
							id: '',
							name: '',
							sex: '',
							address: '',
							birth: '',
							hobby: '',
							introduction: '',
						}
					}
					request.onerror = (event) => {
						this.$message.error('数据更新失败')
					}
				} else {
					this.$message.error('内容不能为空哦')
				}
			},
			//提交需要修改的数据
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// alert('submit!');
						this.editFlag=false;
						this.updateUserInfor();
						// this.$message.success("更新成功!");
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleChange(value) {
				console.log(value);
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

	#PerCenter {
		position: absolute;
		display: flex;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* background-color: #FF0000; */
		background-image: url(../../public/imgs/2.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.el-header {
		background-color: #cccccc;
		color: #333;
		text-align: center;
		height: 5%;
		line-height: 25px;
	}

	.el-main {
		background-color: rgba(255, 255, 255, 0.5);
		color: #000000;
		text-align: center;
		height: 100%;
		width: 100%;
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

	.el-main>div {
		/* display: flex; */
		width: 60%;
		height: 100%;
		min-width: 800px;
		margin: 0 auto;
		background-color: rgba(255, 255, 255, .6);
	}

	.el-main>div>div:nth-child(1) {
		display: block;
		position: relative;
		width: 150px;
		height: 150px;
		margin: 0 auto;
		border: 1px solid #FF0000;
		border-radius: 50%;
		background-color: #ffff00;
	}

	.el-main>div>div:nth-child(1)>img {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.el-main>div>div:nth-child(1)>div {
		display: none;
		position: absolute;
		width: 149px;
		height: 149px;
		left: 0px;
		top: 0px;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, .5);
	}

	.el-main>div>div:nth-child(1)>div>img {
		position: relative;
		width: 50%;
		height: 50%;
		left: 25%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}

	.el-main>div>div:nth-child(1):hover #active_hover {
		display: block;
	}

	.el-main>div>div:nth-child(2) {
		width: 100%;
		height: 100%;
		/* border: 2px solid #0000FF; */
	}

	.baseInfo>div:nth-child(1) {
		height: 35px;
		border-bottom: 2px solid #bababa;
	}

	.baseInfo>div:nth-child(2) {
		text-align: left;
		padding: 10px 300px;
	}

	.baseInfo>div:nth-child(2)>ul {
		/* background-color: #0000FF; */
	}

	.baseInfo>div:nth-child(2)>ul>li {
		text-align: left;
		line-height: 50px;
		list-style: none;
	}

	.edit {
		/* position: absolute; */
		width: 50px;
		height: 20px;
		/* margin: 0px 120px; */
		font-size: 20px;
	}
	.demo-ruleForm{
		text-align: left;
	}
	.el-form-item{
		margin: 15px 5px;
	}
	.last_footer{
		padding-left: 50px;
	}
</style>
