<script lang="ts">
	import {
		type Card,
		shuffleDrawPile,
		openFromDrawPile,
		discardFromOpened,
		moveFromDiscardToDrawPile,
		type State
	} from '../cardLogic';
	import { shuffleArray } from '../fishersAlgorithm';
	import { persistedWritable } from '../persistedWritable';

	const deck: Card[] = shuffleArray([
		{ id: '0', src: 'forestshuffle/0.webp' },
		{ id: '1', src: 'forestshuffle/1.webp' },
		{ id: '2', src: 'forestshuffle/2.webp' },
		{ id: '3', src: 'forestshuffle/3.webp' },
		{ id: '4', src: 'forestshuffle/4.webp' },
		{ id: '5', src: 'forestshuffle/5.webp' },
		{ id: '6', src: 'forestshuffle/6.webp' },
		{ id: '7', src: 'forestshuffle/7.webp' },
		{ id: '8', src: 'forestshuffle/8.webp' },
		{ id: '9', src: 'forestshuffle/9.webp' },
		{ id: '10', src: 'forestshuffle/10.webp' },
		{ id: '11', src: 'forestshuffle/11.webp' },
		{ id: '12', src: 'forestshuffle/12.webp' },
		{ id: '13', src: 'forestshuffle/13.webp' },
		{ id: '14', src: 'forestshuffle/14.webp' },
		{ id: '15', src: 'forestshuffle/15.webp' },
		{ id: '16', src: 'forestshuffle/16.webp' },
		{ id: '17', src: 'forestshuffle/17.webp' },
		{ id: '18', src: 'forestshuffle/18.webp' },
		{ id: '19', src: 'forestshuffle/19.webp' }
	]);

	const state = persistedWritable<State>('deck', {
		deck,
		drawPile: deck,
		opened: [],
		discardPile: []
	});

	$: srcPath =
		$state.opened.length > 0
			? $state.deck.find((cur) => cur.id === $state.opened[0].id)?.src
			: 'forestshuffle/_back.webp';
	$: needsReshuffle = $state.drawPile.length === 0 && $state.opened.length === 0;
	$: message = `${$state.drawPile.length + $state.opened.length}/${deck.length} cards left`;

	const drawNext = () => {
		console.log('test');
		if (needsReshuffle) {
			reshuffle();
		}
		drawNextCard();
	};

	const reshuffle = () => {
		state.set(moveFromDiscardToDrawPile($state));
		state.set(shuffleDrawPile($state));
	};

	const drawNextCard = () => {
		const opened = $state.opened;
		opened.forEach((card) => {
			state.set(discardFromOpened($state, card));
		});
		state.set(openFromDrawPile($state));
	};
	let flipped = false;
	let discarded = false;
</script>

<button class="card-container" on:click={() => (flipped = !flipped)}>
	<img class="card card-front" src={'forestshuffle/_back.webp'} alt="sorry" width="100%" />
	<img
		class="card card-front"
		class:flipped
		class:discarded
		src={srcPath}
		alt="sorry"
		width="100%"
	/>
	<img
		class="card card-back"
		class:flipped
		src={'forestshuffle/_back.webp'}
		alt="sorry"
		width="100%"
	/>
</button>

<style>
	.card-container {
		display: block;
		position: relative;
		width: 80%;
		bottom: 0px;
		margin: 24px 0;
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
			transform: scale(0.4) translate3d(150px, 750px, 0) rotateZ(-90deg);
		}
	}
	.card-front {
		z-index: 1;
		&.flipped {
			transform: rotateY(180deg);
			z-index: 0;
		}
	}
	.card-back {
		z-index: 0;
		transform: rotate3d(0, 1, 0, 180deg);
		&.flipped {
			transform: rotateY(360deg);
			z-index: 10;
		}
	}

	.grayed-out {
		opacity: 0.5;
	}
	.navigation {
		position: absolute;
		bottom: -8px;
		left: -24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		& i {
			padding: 8px 0;
			font-size: 20px;
		}
	}
	.divider {
		width: 24px;
		height: 2px;
		background-color: black;
	}
	.rules {
		position: absolute;
		top: -8px;
		right: -8px;
	}
	.box {
		background-color: #faef9d;
		padding: 8px 16px;
		border-radius: 8px;
	}
	.shadow {
		box-shadow: 0px 0px 4px 0px gray;
	}
	.icon-button {
		text-align: center;
	}
</style>
