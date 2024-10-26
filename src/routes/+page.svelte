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

	const deck: Record<string, CardType> = { 
		"0" : { src: 'forestshuffle/0.webp' },
		"1" : { src: 'forestshuffle/1.webp' },
		"2" : { src: 'forestshuffle/2.webp' },
		"3" : { src: 'forestshuffle/3.webp' },
		"4" : { src: 'forestshuffle/4.webp' },
		"5" : { src: 'forestshuffle/5.webp' },
		"6" : { src: 'forestshuffle/6.webp' },
		"7" : { src: 'forestshuffle/7.webp' },
		"8" : { src: 'forestshuffle/8.webp' },
		"9" : { src: 'forestshuffle/9.webp' },
		"10" : { src: 'forestshuffle/10.webp' },
		"11" : { src: 'forestshuffle/11.webp' },
		"12" : { src: 'forestshuffle/12.webp' },
		"13" : { src: 'forestshuffle/13.webp' },
		"14" : { src: 'forestshuffle/14.webp' },
		"15" : { src: 'forestshuffle/15.webp' },
		"16" : { src: 'forestshuffle/16.webp' },
		"17" : { src: 'forestshuffle/17.webp' },
		"18" : { src: 'forestshuffle/18.webp' },
		"19" : { src: 'forestshuffle/19.webp' },
};

	const state = persistedWritable<State>('deck', {
		deck,
		drawPile: shuffleArray(Object.keys(deck)),
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

	const orderNumber = (cardId: string) => {
		if ($state.opened.includes(cardId)) {
			return 100;
		}
		if ($state.drawPile.includes(cardId)) {
			return -$state.drawPile.indexOf(cardId);
		}
		return $state.discardPile.indexOf(cardId);
	};
</script>

<div class="pile">
	<Card order={-100} onClick={reshuffle} frontPicturePath={'forestshuffle/_back.webp'} gray />
	{#each Object.keys($state.deck) as cardId}
		{@const src = $state.deck[cardId].src}
		<Card
			order={orderNumber(cardId)}
			onClick={drawNextCard}
			frontPicturePath={src}
			discarded={$state.discardPile.includes(cardId)}
			flipped={$state.drawPile.includes(cardId)}
		/>
	{/each}
</div>

<style>
	.pile {
		width: 80%;
		margin-top: 24px;
		position: relative;
	}
</style>
