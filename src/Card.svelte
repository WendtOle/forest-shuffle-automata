<script lang="ts">
	export let frontPicturePath: string;
	export let flipped = false;
	export let discarded = false;
	export let onClick = () => {};
	export let zIndex: number;
	export let gray = false;
</script>

<button 
	class="card" 
	class:flipped
	class:discarded 
	style="--z-index: {zIndex}" 
	on:click={onClick} >
	<img
		class="top"
		class:gray
		src={frontPicturePath}
		alt="sorry"
		width="100%"
	/>
	<img
		class="bottom"
		src={'forestshuffle/_back.webp'}
		alt="sorry"
		width="100%"
	/>
</button>

<style>
	.card {
		position: relative;
		display: block;
		width: 100%;
	}
	.card img {
		position: absolute;
		width: 100%;
		background-color: white;
		backface-visibility: hidden;
		transition-duration: 0.8s;
		border-radius: 8px;
		overflow: hidden;
	}
	.top {
		z-index: calc(var(--z-index) * 2);
	}
	.bottom {
		z-index: calc(var(--z-index) * 2 - 1);
		transform: rotateY(180deg);
	}
	.discarded {
		& .top {
			transform: scale(0.4) translate3d(140px, 750px, 0) rotateZ(-90deg);
		}
		& .bottom {
			display: none;
		}
	}
	.flipped {
		& .top {
			transform: rotateY(180deg);
			z-index: calc(var(--z-index) * 2 - 1);
		}	
		& .bottom {
			transform: rotateY(360deg);
			z-index: calc(var(--z-index) * 2);
		}
	}	
	.gray {
		filter: grayscale(80%);
	}
</style>
