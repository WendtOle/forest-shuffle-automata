import { shuffleArray } from './fishersAlgorithm';

export interface Card {
	content: string;
	id: string;
}

export type CardId = Pick<Card, 'id'>;

export interface State {
	deck: Card[];
	drawPile: CardId[];
	discardPile: CardId[];
	opened: CardId[];
}

const drawCard = (state: State) => {
	const [card, ...drawPile] = state.drawPile;
	return {
		state: {
			...state,
			drawPile
		},
		card
	};
};

export const openFromDrawPile = (state: State): State => {
	const { state: newState, card } = drawCard(state);
	return {
		...newState,
		opened: [...state.opened, ...(card ? [card] : [])]
	};
};

export const discardFromDrawPile = (state: State): State => {
	const { state: newState, card } = drawCard(state);
	return {
		...newState,
		discardPile: [...state.discardPile, ...(card ? [card] : [])]
	};
};

export const discardFromOpened = (state: State, cardId: CardId): State => {
	const card = state.opened.find(({ id }) => id === cardId.id);
	const opened = state.opened.filter(({ id }) => id !== cardId.id);
	return {
		...state,
		opened,
		discardPile: [...state.discardPile, ...(card ? [card] : [])]
	};
};

export const moveFromDiscardToDrawPile = (state: State): State => {
	return {
		...state,
		drawPile: [...state.drawPile, ...state.discardPile],
		discardPile: []
	};
};

export const shuffleDrawPile = (state: State, shuffleMethod?: <T>(array: T[]) => T[]): State => {
	const drawPile = (shuffleMethod ?? shuffleArray)(state.drawPile);
	return {
		...state,
		drawPile
	};
};
