<template>
	<div>
		<table cellspacing="0" cellpadding="8" border="1">
			<caption>
				今日任务清单
				<button @click="dialogFormVisible = true">+ 添加任务</button>
			</caption>
			<thead>
				<tr>
					<th>任务内容</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody v-if="List.length !== 0">
				<tr v-for="item in List" :key="item.id">
					<td>{{ item.Task }}</td>
					<td style="text-align: center">
						{{ item.status == false ? "未完成" : "已完成" }}
					</td>
					<td style="text-align: center">
						<el-button size="small" @click="removeTask(item.id)">删除</el-button>
						<el-button size="small" @click="updateTaskId(item.id)">编辑</el-button>
					</td>
				</tr>
			</tbody>
			<tbody class="elseTbody" v-else>
				<tr>
					<td colspan="2">今日你还没有想要做的事哦！</td>
				</tr>
			</tbody>
		</table>
		<el-dialog title="添加任务" :visible.sync="dialogFormVisible" width="90%">
			<el-form :model="addList">
				<el-form-item label="内容" label-width="40px">
					<el-input v-model="addList.Task" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addTask">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="编辑任务" :visible.sync="updateDialogFormVisible" width="90%">
			<el-form :model="addList">
				<el-form-item label="内容" label-width="40px">
					<el-input v-model="addList.Task" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态" label-width="40px">
					<el-switch v-model="addList.status"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="updateDialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateTask">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				db: null,
				// 全部任务清单
				List: [],
				// 添加任务清单
				addList: {
					id: new Date().getTime(),
					Task: '',
					status: false
				},
				// 添加任务清单对话框显示
				dialogFormVisible: false,
				// 修改任务清单对话框显示
				updateDialogFormVisible: false
			}
		},
		created() {
			this.indexedDB()
			// this.readList()
		},
		methods: {
			// 初始化indexedDB
			indexedDB() {
				// 打开数据库，两个参数（数据库名字，版本号），如果数据库不存在则创建一个新的库
				var request = window.indexedDB.open('TaskList', '1')
				// 数据库操作过程中出错，则错误回调被触发
				request.onerror = (event) => {
					console.log(event)
				}
				this.request = request
				// 创建一个新的数据库或者修改数据库版本号时触发
				request.onupgradeneeded = (event) => {
					var db = event.target.result
					// 创建对象仓库用来存储数据，把id作为keyPath，keyPath必须保证不重复，相当于数据库的主键
					var objectStore = db.createObjectStore('Today_Mission', {
						keyPath: 'id'
					})
					// 建立索引，name和age可能重复，因此unique设置为false
					objectStore.createIndex('Task', 'Task', {
						unique: false
					})
					// objectStore.createIndex('status', 'status', { unique: false })
				}
				// 数据库操作一切正常，所有操作后触发
				this.request.onsuccess = (event) => {
					this.db = event.target.result
					this.readList()
				}
			},

			//读取数据
			readList() {
				var transaction = this.db.transaction('Today_Mission').objectStore('Today_Mission')
				var request = transaction.getAll()

				request.onerror = (event) => {
					this.$message.error('事务失败')
				}

				request.onsuccess = (event) => {
					this.List = request.result
					console.log(request.result);
				}
			},

			//添加任务
			addTask() {
				if (this.addList.Task !== '') {
					var request = this.db.transaction('Today_Mission', 'readwrite')
						.objectStore('Today_Mission')
						.add(this.addList)
					request.onsuccess = (event) => {
						this.$message.success('添加成功')
						this.dialogFormVisible = false
						this.readList()
						this.addList = {
							id: new Date().getTime(),
							Task: '',
							status: false
						}
					}
					request.onerror = (event) => {
						this.$message.error('添加失败')
					}
				} else {
					this.$message.error('内容不能为空哦')
				}
			},
			updateTaskId(id) {
				this.updateDialogFormVisible = true
				this.addList = this.List.find(item => item.id === id)
				console.log(this.addList);
			},

			//更新任务
			updateTask() {
				if (this.addList.Task !== '') {
					var request = this.db.transaction('Today_Mission', 'readwrite')
						.objectStore('Today_Mission')
						.put(this.addList)

					request.onsuccess = (event) => {
						this.$message.success('数据更新成功')
						this.updateDialogFormVisible = false
						this.readList()
						this.addList = {
							id: new Date().getTime(),
							Task: '',
							status: false
						}
					}

					request.onerror = (event) => {
						this.$message.error('数据更新失败')
					}
				} else {
					this.$message.error('内容不能为空哦')
				}
			},

			//移除任务
			removeTask(id) {
				this.$confirm('确定要删除这条任务嘛', '删除任务', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(() => {
					var request = this.db.transaction('Today_Mission', 'readwrite')
						.objectStore('Today_Mission')
						.delete(id)

					request.onsuccess = (event) => {
						this.$message.success('删除成功')
						this.readList()
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}
		}
	}
</script>
<style>
	table {
		width: 100%;
		border: 1px solid #ccc;
	}

	caption {
		padding: 20px 0px;
		font-size: 20px;
		font-weight: bold;
	}

	caption button {
		display: block;
		width: 100%;
		font-size: 13px;
		text-align: left;
		margin-top: 20px;
		height: 35px;
		border: 1px solid rgb(248, 206, 206);
		color: rgb(83, 81, 81);
		padding-left: 15px;
		background-color: rgb(255, 234, 223);
	}

	thead tr {
		height: 50px;
	}

	thead tr th {
		border-bottom: 1px solid #ccc;
	}

	tbody tr {
		font-size: 13px;
	}

	.elseTbody tr {
		height: 70px;
		font-size: 13px;
		letter-spacing: 2px;
		text-align: center;
	}
</style>
