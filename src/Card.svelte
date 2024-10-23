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

<button class="card-container" on:click={onClick}>
	<img
		class="card card-front"
		class:flipped
		class:discarded
		class:gray
		style="--upper: {upperNumber}; --lower: {lowerNumber}"
		src={frontPicturePath}
		alt={`${upperNumber}`}
		width="100%"
	/>
	<img
		class="card card-back"
		class:flipped
		style="--upper: {upperNumber}; --lower: {lowerNumber}"
		src={'forestshuffle/_back.webp'}
		alt="sorry"
		width="100%"
	/>
</button>

<style>
	.card-container {
		position: relative;
		display: block;
		width: 100%;
	}
	button {
		width: 100%;
	}
	.card {
		position: absolute;
		width: 100%;
		background-color: white;
		backface-visibility: hidden;
		transition-duration: 0.8s;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0px 0px 4px 0px gray;

		& > img {
			position: fixed;
			border-radius: 8px;
			overflow: hidden;
		}

		&.discarded {
			transform: scale(0.4) translate3d(140px, 750px, 0) rotateZ(-90deg);
		}
	}
	.card-front {
		z-index: var(--upper);
		&.flipped {
			transform: rotateY(180deg);
			z-index: var(--lower);
		}
	}
	.card-back {
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
