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
		class="front"
		class:gray
		src={frontPicturePath}
		alt="sorry"
		width="100%"
	/>
	<img
		class="back"
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
	.front {
		z-index: calc(var(--z-index) * 2);
	}
	.back {
		z-index: calc(var(--z-index) * 2 - 1);
		transform: rotateY(180deg);
	}
	.discarded {
		& .front {
			transform: scale(0.4) translate3d(140px, 750px, 0) rotateZ(-90deg);
		}
		& .back {
			display: none;
		}
	}
	.flipped {
		& .front {
			transform: rotateY(180deg);
			z-index: calc(var(--z-index) * 2 - 1);
		}	
		& .back {
			transform: rotateY(360deg);
			z-index: calc(var(--z-index) * 2);
		}
	}	
	.gray {
		filter: grayscale(80%);
	}
</style>
