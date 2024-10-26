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
	const deck: Record<string, Card> = {
		'1': { src: 'some/path.wepb' },
		'2': { src: 'some/path.wepb' }
	};

	it('should draw first card of drawpile', () => {
		const state: State = {
			deck,
			drawPile: Object.keys(deck),
			discardPile: [],
			opened: []
		};
		expect(openFromDrawPile(state)).toEqual({
			deck,
			drawPile: ['2'],
			discardPile: [],
			opened: ['1']
		});
	});
	it('should change anything if deck is empty', () => {
		const state: State = {
			deck: {},
			drawPile: [],
			discardPile: [],
			opened: []
		};
		expect(openFromDrawPile(state)).toEqual({
			deck: {},
			drawPile: [],
			discardPile: [],
			opened: []
		});
	});
	it('should draw last card of drawpile', () => {
		const state: State = {
			deck,
			drawPile: ['1'],
			discardPile: [],
			opened: []
		};
		expect(openFromDrawPile(state)).toEqual({
			deck,
			drawPile: [],
			discardPile: [],
			opened: ['1']
		});
	});
	it('can discard a card from the drawpile', () => {
		const state: State = {
			deck,
			drawPile: ['1', '2'],
			discardPile: [],
			opened: []
		};
		expect(discardFromDrawPile(state)).toEqual({
			deck,
			drawPile: ['2'],
			discardPile: ['1'],
			opened: []
		});
	});
	it('can dicard an opened card', () => {
		const state: State = {
			deck,
			drawPile: [],
			discardPile: [],
			opened: ['1', '2']
		};
		expect(discardFromOpened(state, '1')).toEqual({
			deck,
			drawPile: [],
			discardPile: ['1'],
			opened: ['2']
		});
	});
	it('can move all discard pile to draw pile', () => {
		const state: State = {
			deck,
			drawPile: [],
			discardPile: ['1', '2'],
			opened: []
		};
		expect(moveFromDiscardToDrawPile(state)).toEqual({
			deck,
			drawPile: ['1', '2'],
			discardPile: [],
			opened: []
		});
	});
	it('can move discard pile and put them on the bottom of the draw pile, keeping the order', () => {
		const state: State = {
			deck,
			drawPile: ['3'],
			discardPile: ['1', '2'],
			opened: []
		};
		expect(moveFromDiscardToDrawPile(state)).toEqual({
			deck,
			drawPile: ['3', '1', '2'],
			discardPile: [],
			opened: []
		});
	});
	it("should change the order of the draw pile when it's shuffled", () => {
		const state: State = {
			deck,
			drawPile: ['1', '2'],
			discardPile: [],
			opened: []
		};
		expect(shuffleDrawPile(state, <T>(array: T[]) => array.reverse())).toEqual({
			deck,
			drawPile: ['2', '1'],
			discardPile: [],
			opened: []
		});
	});
});
