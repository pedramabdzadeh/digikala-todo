import * as $ from 'jquery';
import ToDoCard from './to-do-card';
import {ToDoCardModel} from '../models/to-do-card-model';

export default class ToDoList {
    private toDoListContainer: JQuery = $('<main class="to-do-list"></main>');
    private title: JQuery = $('<header class="title"><span> DIGIDO </span></header>');
    private toDoCardsContainer: JQuery = $('<div class="to-do-list-body"></div>');
    private _toDoListCards: ToDoCardModel[] = [];

    constructor(rootElement: JQuery) {
        this.checkIfAnyCardsExists();
        this.toDoListContainer.append(this.title);
        this.toDoListContainer.append(this.toDoCardsContainer);
        rootElement.append(this.toDoListContainer);
    }

    private checkIfAnyCardsExists(): boolean {
        if (!localStorage.getItem('cards') || JSON.parse(localStorage.getItem('cards')).length === 0) {
            this.onEmptyCardsList();
            return false;
        } else {
            this.loadCards();
            return true;
        }
    }

    private loadCards(): void {
        this._toDoListCards = JSON.parse(localStorage.getItem('cards'));
        for (const card of this._toDoListCards) {
            /* needs more analysis*/
            this.toDoCardsContainer.append(new ToDoCard(card.id, card.toDos, card.title, card.color).cardElement);
        }
        this.addCreateButton();
    }

    private addCreateButton() {
        const message = 'Create Card';
        const createButton = $('<button class="create-button main-color"> ' + message + '</button>');
        this.toDoCardsContainer.append(createButton);
        createButton.on('click', () => {
            this.createNewCard();
            this.toDoCardsContainer.append(createButton)
        });
    }

    onEmptyCardsList(): void {
        const noCardMessage = 'Hey, You do not have any cards yet, You can click here to create one.';
        const noCardButton = $('<button id="no-card-button" class="create-button"> ' + noCardMessage + '</button>');
        this.toDoCardsContainer.append(noCardButton);
        noCardButton.on('click', () => {
            noCardButton.remove();
            this.createNewCard();
        });
    }

    private createNewCard(): void {
        const newCard = new ToDoCard(Math.floor(Math.random()* 10000), [], '');
        this._toDoListCards.push(newCard.card);
        this.toDoCardsContainer.append(newCard.cardElement);
        localStorage.setItem('cards', JSON.stringify(this._toDoListCards));
    }

    get toDoListCards(): ToDoCardModel[] {
        return this._toDoListCards;
    }
};
