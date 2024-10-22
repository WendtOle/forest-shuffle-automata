<script>
	import '../global.css';
	import IconModal from '../IconModal.svelte';
	import Rules from '../rules.svelte';
</script>

<div class="main">
	<slot></slot>
</div>

<IconModal />
<Rules />

<style>
	.main {
		width: 100%;
		max-width: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.info-popover {
		margin: 8px;
	}
	.title {
		font-size: 18px;
	}
	.text {
		font-size: 14px;
	}
	button {
		padding: 8px 16px;
		position: absolute;
		right: 0;
	}
	[popover]::backdrop {
		background-color: white;
		opacity: 0.5;
		pointer-events: none;
	}
</style>
