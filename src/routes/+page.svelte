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
	const deck: Card[] = [
		{ content: '-4, right', id: '0' },
		{ content: '+4', id: '1' },
		{ content: '+2', id: '2' },
		{ content: '-2, left', id: '3' }
	];

	const state = writable<State>({
		deck,
		drawPile: deck,
		opened: [],
		discardPile: []
	});
</script>

<h1>You are in need of an Automata?</h1>
<h2>Forstshuffle</h2>

<div class="row">
	<p>{$state.drawPile.length} cards on draw pile</p>
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
<div class="row">
	<p>{$state.discardPile.length} cards discarded</p>
	<button on:click={() => state.set(moveFromDiscardToDrawPile($state))}>Put back</button>
</div>
<div class="container">
	<p>{$state.opened.length} cards opened</p>
	{#each $state.opened as cardId}
		{@const id = cardId.id}
		{@const card = $state.deck.find((cur) => cur.id === id)}
		<div class="row">
			<p>{card?.content}</p>
			<button
				on:click={() => {
					state.set(discardFromOpened($state, { id }));
				}}>Discard</button
			>
		</div>
	{/each}
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	button {
		height: 32px;
	}
	.container {
		border: 1px solid black;
		padding: 8px;
	}
</style>
