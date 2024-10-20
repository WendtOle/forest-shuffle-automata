<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		type Card,
		shuffleDrawPile,
		openFromDrawPile,
		discardFromOpened,
		moveFromDiscardToDrawPile,
		type State
	} from '../cardLogic';
	import { shuffleArray } from '../fishersAlgorithm';

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

	const state = writable<State>({
		deck,
		drawPile: deck,
		opened: [],
		discardPile: []
	});
</script>

<h1>Forstshuffle - Automata</h1>

<div class="row">
	<div class="pile">
		<img class="card" src="forestshuffle/_back.webp" alt="Back of a card" />
		<div class="pile_controls">
			<p class="text">{$state.drawPile.length} cards on draw pile</p>
			<div class="column">
				<button
					on:click={() => {
						const opened = $state.opened;
						opened.forEach((card) => {
							state.set(discardFromOpened($state, card));
						});
						state.set(openFromDrawPile($state));
					}}>Draw & Discard</button
				>
				<button
					on:click={() => {
						state.set(openFromDrawPile($state));
					}}>Draw</button
				>
				<button
					on:click={() => {
						state.set(shuffleDrawPile($state));
					}}>Shuffle</button
				>
			</div>
		</div>
	</div>
	<div class="pile">
		<img class="card grayed-out" src="forestshuffle/_back.webp" alt="Back of a card" />
		<div class="pile_controls">
			<p class="text">{$state.discardPile.length} cards discarded</p>
			<button on:click={() => state.set(moveFromDiscardToDrawPile($state))}>Put back</button>
		</div>
	</div>
</div>
<div class="row scroll-container">
	{#each $state.opened as cardId}
		{@const id = cardId.id}
		{@const card = $state.deck.find((cur) => cur.id === id)}
		<div class="column">
			<img class="card" src={card?.src} alt="sorry" />
			<button
				on:click={() => {
					state.set(discardFromOpened($state, { id }));
				}}>Discard</button
			>
		</div>
	{/each}
</div>

<style>
	.pile {
		position: relative;
	}
	.pile_controls {
		position: absolute;
		top: 0;
		width: 165px;
		height: 264px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 8px;
		gap: 8px;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.column {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	button {
		height: 32px;
	}
	.card {
		border-radius: 8px;
	}
	.scroll-container {
		overflow-x: auto;
	}
	.text {
		background-color: #f0f0f0;
		padding: 4px;
		text-align: center;
	}
	.grayed-out {
		opacity: 0.5;
	}
</style>
