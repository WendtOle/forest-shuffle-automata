<script lang="ts">
	import Card from '../Card.svelte';
	import {
		type Card as CardType,
		shuffleDrawPile,
		openFromDrawPile,
		discardFromOpened,
		moveFromDiscardToDrawPile,
		type State
	} from '../cardLogic';
	import { shuffleArray } from '../fishersAlgorithm';
	import { persistedWritable } from '../persistedWritable';

	const deck: CardType[] = shuffleArray([
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

	const reshuffle = () => {
		state.set(moveFromDiscardToDrawPile($state));
		state.set(shuffleDrawPile($state));
	};

	const drawNextCard = () => {
		if ($state.opened.length === 0) {
			state.set(openFromDrawPile($state));
			return;
		}

		$state.opened.forEach((card) => {
			state.set(discardFromOpened($state, card));
		});
		return;
	};

	const orderNumber = ({ id }: CardType) => {
		if ($state.opened.map(({ id }) => id).includes(id)) {
			return 100;
		}
		if ($state.drawPile.map(({ id }) => id).includes(id)) {
			return -$state.drawPile.map(({ id }) => id).indexOf(id);
		}
		return $state.discardPile.map(({ id }) => id).indexOf(id);
	};
</script>

<div class="pile">
	<Card order={-100} onClick={reshuffle} frontPicturePath={'forestshuffle/_back.webp'} gray />
	{#each $state.deck as card}
		{@const src = $state.deck.find((cur) => cur.id === card.id)?.src ?? 'not found'}
		<Card
			order={orderNumber(card)}
			onClick={drawNextCard}
			frontPicturePath={src}
			discarded={$state.discardPile.map(({ id }) => id).includes(card.id)}
			flipped={$state.drawPile.map(({ id }) => id).includes(card.id)}
		/>
	{/each}
	<div class="navigation box shadow">
		<button class="icon-button" popovertarget="icon-popover" popovertargetaction="show"
			><i class="fas fa-question"></i></button
		>
		<div class="divider" />
		<button class="icon-button" popovertarget="rules-popover"><i class="fas fa-book"></i></button>
	</div>
</div>

<style>
	.pile {
		width: 80%;
		margin-top: 24px;
		position: relative;
	}
	.navigation {
		z-index: 1000;
		position: absolute;
		bottom: -575px;
		left: 16px;
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
	.box {
		background-color: #faef9d;
		padding: 8px 16px;
		border-radius: 8px;
	}
	.shadow {
		box-shadow: 0px 0px 4px 0px gray;
	}
</style>
