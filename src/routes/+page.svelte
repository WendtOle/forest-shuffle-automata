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

	if (Array.isArray($state.deck)) {
		state.set({
			deck,
			drawPile: shuffleArray(Object.keys(deck)),
			opened: [],
			discardPile: []
		});
	}

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

	const getZIndex = (cardId: string) => {
		if ($state.opened.includes(cardId)) {
			return 100;
		}
		if ($state.drawPile.includes(cardId)) {
			return -$state.drawPile.indexOf(cardId);
		}
		return $state.discardPile.indexOf(cardId);
	};

	const onCardClicked = (cardId: string) => () => {
		if ($state.discardPile.length === Object.keys($state.deck).length) {
			reshuffle();
			return;
		}
		if ($state.discardPile.includes(cardId)) {
			return
		} 
		drawNextCard();
	}
</script>

<div class="pile">
	{#each Object.keys($state.deck) as cardId}
		{@const src = $state.deck[cardId].src}
		<div 
			class="card" 
			class:discarded={$state.discardPile.includes(cardId)}
			style="--order: {getZIndex(cardId)}; --index: {getZIndex(cardId) === 100 ? 0 : getZIndex(cardId)}; --amount: {$state.drawPile.length};">
			<Card
				onClick={onCardClicked(cardId)}
				frontPicturePath={src}
				flipped={$state.drawPile.includes(cardId)}
			/>
		</div>
	{/each}
</div>

<div class="svg hint-reshuffle" class:show={$state.discardPile.length === Object.keys($state.deck).length}>
	<img src="reshuffle.svg" alt="arrow"/>
	<img class="arrow" src="arrow.svg" alt="arrow"/>
</div>
<div class="svg hint-open" class:show={$state.drawPile.length === Object.keys($state.deck).length}>
	<img src="open.svg" alt="arrow"/>
	<img class="arrow" src="arrow.svg" alt="arrow"/>
</div>
<div class="svg hint-discard" class:show={$state.discardPile.length === 0 && $state.opened.length === 1}>
	<img src="discard.svg" alt="arrow"/>
	<img class="arrow" src="arrow.svg" alt="arrow"/>
</div>
<button class="svg icons" popovertarget="icon-popover" popovertargetaction="show">
	<img src="icons.svg" alt="arrow"/>
</button>

<button class="svg rules" popovertarget="rules-popover">
	<img src="rules.svg" alt="arrow"/>
</button>

<style>
	.pile {
		width: 280px;
		margin-top: 12px;
		position: relative;
	}
	.card {
		position: relative;
		transition-duration: 0.8s;
		z-index: var(--order);
		transform: translate3d(calc(var(--amount) * -1px +  var(--index) * -2px), calc(var(--index) * -2px), 0);
	}
	.discarded {
		transform: translate3d(calc(-10px + var(--amount) * -1px +  var(--index) * -2px), calc(540px + var(--index) * -2px), 0) scale(0.4) rotateZ(-90deg);
	}
	.svg {
		position: absolute;
		z-index: 1000;
	}
	.icons {
		transform: translate3d(-110px, 510px, 0) scale(0.6,0.4);
	}
	.rules {
		transform: translate3d(-110px, 570px, 0) scale(0.6,0.4);
	}
	.hint-reshuffle {
		transform: translate3d(20px, 300px, 0) scale(0.8);
		pointer-events: none;
		transition-duration: 0.8s;
		opacity: 0;
		& .arrow {
			transform: translate3d(100px, 0, 0) rotateZ(180deg);
		}
	}
	.hint-open {
		transform: translate3d(140px, 580px, 0) scale(0.8);
		pointer-events: none;
		transition-duration: 0.8s;
		transition-delay: 0.5s;
		opacity: 0;
		& .arrow {
			transform: translate3d(-100px, -30px, 0);
		}
	}
	.hint-discard {
		transform: translate3d(140px, 580px, 0) scale(0.8);
		pointer-events: none;
		transition-duration: 0.8s;
		transition-delay: 0.5s;
		opacity: 0;
		& .arrow {
			transform: translate3d(-270px, -50px, 0) scaleX(-1);
		}
	}
	.show {
		opacity: 1;
	}
</style>
