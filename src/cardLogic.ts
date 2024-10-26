import { shuffleArray } from './fishersAlgorithm';

export interface Card {
	src: string;
}

export interface State {
	deck: Record<string, Card>;
	drawPile: string[];
	discardPile: string[];
	opened: string[];
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

export const discardFromOpened = (state: State, cardId: string): State => {
	const opened = state.opened.filter((id) => id !== cardId);
	return {
		...state,
		opened,
		discardPile: [...state.discardPile, cardId]
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
