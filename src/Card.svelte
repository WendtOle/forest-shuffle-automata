<script lang="ts">
	export let frontPicturePath: string;
	export let flipped = false;
	export let onClick = () => {};
	export let gray = false;

	const altText = "Forest Shuffle Automata Card"
</script>

<button 
	class="card"
	class:flipped 
	on:click={onClick} >
	<img
		class="top"
		class:gray
		src={frontPicturePath}
		alt={altText}
		width="100%"
	/>
	<img
		class="bottom"
		src={'forestshuffle/_back.webp'}
		alt={altText}
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
		z-index: 1;
	}
	.bottom {
		z-index: -1;
		transform: rotateY(180deg);
	}
	.flipped {
		& .top {
			transform: rotateY(180deg);
		}
		& .bottom {
			transform: rotateY(0deg);
		}
	}
	.gray {
		filter: grayscale(80%);
	}
</style>
