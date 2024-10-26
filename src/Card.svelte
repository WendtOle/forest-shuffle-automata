<script lang="ts">
	export let frontPicturePath: string;
	export let flipped = false;
	export let discarded = false;
	export let onClick = () => {};
	export let zIndex: number;
	export let gray = false;
</script>

<button class="card" on:click={onClick} style="--z-index: {zIndex}">
	<img
		class="front"
		class:flipped
		class:discarded
		class:gray
		src={frontPicturePath}
		alt="sorry"
		width="100%"
	/>
	<img
		class="back"
		class:flipped
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
		&.discarded {
			transform: scale(0.4) translate3d(140px, 750px, 0) rotateZ(-90deg);
		}
	}
	.front {
		z-index: calc(var(--z-index) * 2);
		&.flipped {
			transform: rotateY(180deg);
			z-index: calc(var(--z-index) * 2 - 1);
		}
	}
	.back {
		z-index: calc(var(--z-index) * 2 - 1);
		transform: rotate3d(0, 1, 0, 180deg);
		&.flipped {
			transform: rotateY(360deg);
			z-index: calc(var(--z-index) * 2);
		}
	}
	.gray {
		filter: grayscale(80%);
	}
</style>
