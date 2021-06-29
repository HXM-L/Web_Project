<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {}
	console.log(document.body.clientHeight);
</script>

<style>
	* {
		margin: 0px;
		padding: 0px;
	}

	html,
	body {
		width: 100%;
		height: 100%
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* background-color: #ff5500; */
	}
</style>
