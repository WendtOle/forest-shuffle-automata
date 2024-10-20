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

	const reshuffleAndDrawFirst = () => {
		state.set(moveFromDiscardToDrawPile($state));
		state.set(shuffleDrawPile($state));
		drawNextCard();
	};

	const drawNextCard = () => {
		const opened = $state.opened;
		opened.forEach((card) => {
			state.set(discardFromOpened($state, card));
		});
		state.set(openFromDrawPile($state));
	};
</script>

<div class="info-container">
	<div id="icons" popover>
		<h3>Icons</h3>
		<div class="row">
			<img src="rule_add.png" alt="sorry" />
			<p>Add given cards to the right of the clearing</p>
		</div>
		<div class="row">
			<img src="rule_remove.png" alt="sorry" />
			<p>Discard given cards from the given direction of the clearing</p>
		</div>
		<div class="row">
			<img src="rule_discard.png" alt="sorry" />
			<p>Discard one card directly from the draw pile</p>
		</div>
	</div>
	<div class="nav-container">
		<button popovertarget="icons">Explain icons</button>
		<button><a href="/information">Go to rules</a></button>
	</div>
</div>

<div class="main-container">
	<img class="card" class:grayed-out={needsReshuffle} src={srcPath} alt="sorry" width={280} />
	{#if needsReshuffle}
		<button class="main-container__action" on:click={reshuffleAndDrawFirst}
			>Reshuffle & Draw first</button
		>
	{:else}
		<button class="main-container__action" on:click={drawNextCard}>Draw next</button>
	{/if}
	<p class="message">{message}</p>
</div>

<style>
	.main-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 16px;
		position: relative;
	}
	.main-container__action {
		all: unset;
		margin-top: 8px;
		font-size: 24px;
		width: 196px;
		padding: 12px 24px;
		text-align: center;
		position: absolute;
		color: black;
		background-color: whitesmoke;
		border: unset;
		opacity: 70%;
		text-transform: uppercase;
		border-radius: 8px;
		box-shadow: 0px 0px 4px 0px gray;
	}
	.nav-container button {
		all: unset;
		width: 128px;
		text-align: center;
		text-transform: uppercase;
		border: unset;
		padding: 8px 12px;
		border-radius: 8px;
		background-color: whitesmoke;
		box-shadow: 0px 0px 4px 0px gray;
	}

	a {
		text-decoration: none;
		color: black;
	}

	h3 {
		margin: 8px;
	}

	.card {
		border-radius: 8px;
	}
	.grayed-out {
		opacity: 0.5;
	}
	.nav-container {
		display: flex;
		justify-content: space-around;
		margin: 0 16px;
	}
	.info-container {
		display: flex;
		flex-direction: column;
		margin: 0px 16px;
	}
	.row {
		display: flex;
		align-items: center;
		margin-left: 16px;

		& img {
			margin-right: 16px;
			width: 30px;
		}
		& p {
			margin: 4px 0px;
		}
	}
	.message {
		background-color: whitesmoke;
		opacity: 80%;
		background-blend-mode: color;
		padding: 8px;
		border-radius: 8px;
		position: absolute;
		top: 0;
		right: 50px;
	}
</style>
