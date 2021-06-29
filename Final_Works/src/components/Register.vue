<template>
	<div id="Register">
		<h2>欢迎新用户注册</h2>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户昵称:" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
					<el-form-item prop="date1">
						<el-date-picker type="date" value-format="yyyy-MM-dd" @change="getTime" placeholder="选择日期"
							v-model="ruleForm.date1" style="width: 100%;">
						</el-date-picker>
					</el-form-item>
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
				<el-button type="primary" @click="cancel()" class="edit">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					name: '', //用户昵称
					region: '', //用户地址
					date1: '', //用户生日
					type: [], //用户爱好
					resource: '', //用户性别
					desc: '', //用户个人简介
					pass: '', //密码
					checkPass: '', //确认密码
				},
				activeIndex: '1',
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
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
						type: 'string',	//如果type是date,前台传数据会报错
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
					id: '2018324142',
					name: 'Mike',
					password: '123456',
					sex: '',
					address: '',
					birth: '',
					hobby: '',
					introduction: '',
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// alert('submit!');
						this.addUser();
						this.$router.push('/login');
					} else {
						return false;
						console.log('error submit!!');
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleChange(value) {
				console.log(value);
			},
			cancel() {
				this.$router.push('/login');
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
					console.log("request.result");
					console.log(request.result);
				}
			},

			//添加数据
			addUser() {
				this.readList();
				if(this.List!=''){
					this.addList.id = (parseInt(this.List[this.List.length - 1].id) + 1).toString();
				}else{
					this.addList.id="2018324141";
				}
				console.log("新的ID");
				console.log(this.addList.id);
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
						.add(this.addList)
					request.onsuccess = (event) => {
						this.$message.success('用户注册成功!')
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
						this.$message.error('用户注册失败')
					}
				} else {
					this.$message.error('内容不能为空哦')
				}
			},
		}
	}
</script>

<style scoped="scoped">
	* {
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}

	#Register {
		width: 600px;
		margin: 50px auto;
		padding: 20px;
		background-color: #ffd7c7;
	}

	.demo-ruleForm {
		font-size: 20px;
		text-align: left;
	}

	.el-form-item {
		font-size: 20px;
		margin: 15px;
	}

	.el-form-item__label {
		font-size: 20px !important;
	}

	.el-button {
		width: 50px;
		height: 25px;
	}

	.last_footer {
		text-align: center;
		padding-right: 40px;
	}
</style>
