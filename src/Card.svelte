<script lang="ts">
	export let frontPicturePath: string;
	export let flipped = false;
	export let discarded = false;
	export let onClick = () => {};
	export let order: number;
	export let gray = false;

	$: upperNumber = order * 2;
	$: lowerNumber = order * 2 - 1;
</script>

<button class="card" on:click={onClick} style="--upper: {upperNumber}; --lower: {lowerNumber}">
	<img
		class="front"
		class:flipped
		class:discarded
		class:gray
		src={frontPicturePath}
		alt={`${upperNumber}`}
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
		z-index: var(--upper);
		&.flipped {
			transform: rotateY(180deg);
			z-index: var(--lower);
		}
	}
	.back {
		z-index: var(--lower);
		transform: rotate3d(0, 1, 0, 180deg);
		&.flipped {
			transform: rotateY(360deg);
			z-index: var(--upper);
		}
	}
	.gray {
		filter: grayscale(80%);
	}
</style>
