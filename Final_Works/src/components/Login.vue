<template>
	<div id="login">
		<div>
			<div>
				<h1>欢迎登陆</h1>
				<div>
					<img src="../../public/imgs/1.jpg">
					<form>
						<ul>
							<li>账号:<input type="text" name="" id="" v-model="infor.username" value="" placeholder="请输入账号"
									required="required" @keyup.enter="loginSubmit()"/></li>
							<li>密码:<input type="password" name="" v-model="infor.pwd" id="pwd" placeholder="请输入密码"
									required="required" @keyup.enter="loginSubmit()"/>
								<img src="../assets/eye.png" id="pwd_img" class="pwd_img" style="display: none;"
									@click="changType">
								<img src="../assets/neye.png" id="pwd_img" class="pwd_img" @click="changType">
							</li>
						</ul>
						<p>
							<el-link type="primary" @click="register()">注册</el-link>
							<el-link type="primary" @click="forgetPWD()">忘记密码</el-link>
						</p>
						<input type="button" @click="loginSubmit()" value="登陆" />
						<input type="reset" value="重置" />
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'Login',
		props: {
			msg: String
		},
		data() {
			return {
				pwdFlag: false,
				infor: {
					username: 'Amy',
					pwd: '',
				},
				
				//数据库
				db: null,
				// 全部任务清单
				List: [],
				// 添加任务清单
				addList: {
					id: '2018324142',
					name: 'Mike',
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
			changType() {
				var pwd_input = document.getElementById("pwd");
				var pwd_img = document.getElementsByClassName("pwd_img");
				// console.log(pwd_img[0].src);
				console.log(this.pwdFlag);
				this.pwdFlag = !this.pwdFlag;
				if (this.pwdFlag == true) {
					// console.log(pwd_img[0].src);
					pwd_img[0].style.display = "block";
					pwd_img[1].style.display = "none";
					pwd_input.type = "text";
				} else {
					pwd_img[0].style.display = "none";
					pwd_img[1].style.display = "block";
					pwd_input.type = "password";
				}
			},
			//登录按钮
			loginSubmit() {
				var loginFlag=false;
				var tempList=this.List;
				for(var item in tempList) {
				    console.log(tempList[item]);
					if((tempList[item].name==this.infor.username || tempList[item].id==this.infor.username) && tempList[item].password==this.infor.pwd){
						loginFlag=true;
						console.log(loginFlag);
					}else{
						console.log(loginFlag);
					}
				}
				if (loginFlag) {
					this.$router.push('/Index/' + this.infor.username);
					console.log(this.$router.push('/Index/' + this.infor.username));
					// console.log(this.$route.params.name);
				} else {
					alert("账号或密码错误");
				}
				console.log(this.infor.username);
			},
			register(){
				this.$router.push('/Register');	
			},
			forgetPWD(){
				this.$message.warning("请联系管理员修改密码!")
			}
		},
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
		background-color: transparent;
	}
	
	#login{
		width: 100%;
		height: 100%;
		background-image: url(../../public/imgs/bg.jpg);
		background-size: 100% 100%;
	}
	#login>div{
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,0.5);
	}
	#login>div>div {
		position: absolute;
		width: 800px;
		height: 400px;
		left: 50%;
		/* top: 50%; */
		transform: translate(-50%, 0%);
	}

	h1 {
		position: absolute;
		/* width: 300px; */
		height: 60px;
		left: 50%;
		/* top: 50%; */
		transform: translate(-50%, 0%);
		margin-top: 15px;
		text-align: center;
		font-family: "华文行楷";
		color: #00007f;
		font-size: 75px;
		/* background-color: #0000FF; */
	}

	#login>div>div>div {
		position: absolute;
		width: 380px;
		height: 400px;
		left: 50%;
		top: 380px;
		transform: translate(-50%, -50%);
		border: 2px solid white;
		background-color: white;
		border-radius: 30px;
		box-shadow: 10px 10px 10px #ababab;
		border: 0.5px solid #dcdcdc;
		background-image: url(../../public/imgs/3.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	#login>div>div>div>img {
		position: absolute;
		left: 50%;
		transform: translate(-50%, -45%);
		width: 150px;
		height: 150px;
		border-radius: 50%;
		border: 2px solid #ff0000;
	}

	ul {
		list-style: none;
	}

	form {
		position: absolute;
		width: 300px;
		left: 50%;
		top: 50%;
		font-size: 25px;
		transform: translate(-50%, 15%);
		/* background-color: #00FF00; */
	}

	input[type=text],
	input[type=password] {
		width: 200px;
		height: 32px;
		font-size: 17px;
		margin-top: 5px;
		border: 1px solid #000000;
		border-radius: 5px;
		outline: none;
	}

	input[type=button],
	input[type=reset],
	input[type=submit] {
		width: 50px;
		height: 30px;
		margin: 5px;
		margin-top: 10px;
	}

	.pwd_img {
		position: absolute;
		width: 20px;
		left: 252px;
		top: 52px;
	}
	.el-link{
		margin: 10px 20px;
	}
</style>
