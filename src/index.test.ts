import { describe, it, expect } from 'vitest';
import {
	type Card,
	discardFromDrawPile,
	discardFromOpened,
	moveFromDiscardToDrawPile,
	openFromDrawPile,
	shuffleDrawPile,
	type State
} from './cardLogic';

describe('Deck', () => {
	const deck: Card[] = [
		{ id: '1', content: '1' },
		{ id: '2', content: '2' }
	];

	it('should draw first card of drawpile', () => {
		const state: State = {
			deck,
			drawPile: deck.map(({ id }) => ({ id })),
			discardPile: [],
			opened: []
		};
		expect(openFromDrawPile(state)).toEqual({
			deck,
			drawPile: [{ id: '2' }],
			discardPile: [],
			opened: [{ id: '1' }]
		});
	});
	it('should change anything if deck is empty', () => {
		const state: State = {
			deck: [],
			drawPile: [],
			discardPile: [],
			opened: []
		};
		expect(openFromDrawPile(state)).toEqual({
			deck: [],
			drawPile: [],
			discardPile: [],
			opened: []
		});
	});
	it('should draw last card of drawpile', () => {
		const state: State = {
			deck,
			drawPile: [{ id: '1' }],
			discardPile: [],
			opened: []
		};
		expect(openFromDrawPile(state)).toEqual({
			deck,
			drawPile: [],
			discardPile: [],
			opened: [{ id: '1' }]
		});
	});
	it('can discard a card from the drawpile', () => {
		const state: State = {
			deck,
			drawPile: [{ id: '1' }, { id: '2' }],
			discardPile: [],
			opened: []
		};
		expect(discardFromDrawPile(state)).toEqual({
			deck,
			drawPile: [{ id: '2' }],
			discardPile: [{ id: '1' }],
			opened: []
		});
	});
	it('can dicard an opened card', () => {
		const state: State = {
			deck,
			drawPile: [],
			discardPile: [],
			opened: [{ id: '1' }, { id: '2' }]
		};
		expect(discardFromOpened(state, { id: '1' })).toEqual({
			deck,
			drawPile: [],
			discardPile: [{ id: '1' }],
			opened: [{ id: '2' }]
		});
	});
	it('can move all discard pile to draw pile', () => {
		const state: State = {
			deck,
			drawPile: [],
			discardPile: [{ id: '1' }, { id: '2' }],
			opened: []
		};
		expect(moveFromDiscardToDrawPile(state)).toEqual({
			deck,
			drawPile: [{ id: '1' }, { id: '2' }],
			discardPile: [],
			opened: []
		});
	});
	it('can move discard pile and put them on the bottom of the draw pile, keeping the order', () => {
		const state: State = {
			deck,
			drawPile: [{ id: '3' }],
			discardPile: [{ id: '1' }, { id: '2' }],
			opened: []
		};
		expect(moveFromDiscardToDrawPile(state)).toEqual({
			deck,
			drawPile: [{ id: '3' }, { id: '1' }, { id: '2' }],
			discardPile: [],
			opened: []
		});
	});
	it("should change the order of the draw pile when it's shuffled", () => {
		const state: State = {
			deck,
			drawPile: [{ id: '1' }, { id: '2' }],
			discardPile: [],
			opened: []
		};
		expect(shuffleDrawPile(state, <T>(array: T[]) => array.reverse())).toEqual({
			deck,
			drawPile: [{ id: '2' }, { id: '1' }],
			discardPile: [],
			opened: []
		});
	});
});
