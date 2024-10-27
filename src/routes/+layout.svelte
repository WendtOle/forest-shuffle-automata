<script>
	import '../global.css';
	import IconModal from '../IconModal.svelte';
	import Rules from '../rules.svelte';
</script>

<div class="main">
	<h1>Forest Shuffle - Automata</h1>
	<slot></slot>
</div>

<IconModal />
<Rules />

<style>
	.main {
		width: 100%;
		max-width: 400px;
		height: 625px;
		display: flex;
		align-items: center;
		position: relative;
		flex-direction: column;
		overflow: hidden;
	}
	h1 {
		position: absolute;
		font-size: 16px;
		font-weight: 100;
		color: black;
		margin: 0;
		width: 100%;
		height: 20px;
		transform: rotateZ(-90deg);
		left: -175px;
		top: 60px;
		opacity: 0.2;
	}
</style>
