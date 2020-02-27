import * as $ from 'jquery';
import ToDoCard from './to-do-card';
import {ToDoCardModel} from '../models/to-do-card-model';

export default class ToDoList {
    private toDoListContainer: JQuery = $('<main class="to-do-list"></main>');
    private title: JQuery = $('<header class="title"><span> DIGIDO </span></header>');
    private toDoCardsContainer: JQuery = $('<div class="to-do-list-body"></div>');
    private _toDoListCards: ToDoCardModel[] = [];

    constructor(rootElement: JQuery) {
        this.onEmptyCardsList();
        this.toDoListContainer.append(this.title);
        this.toDoListContainer.append(this.toDoCardsContainer);
        rootElement.append(this.toDoListContainer);
    }

    private addCreateButton(): void {
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
            this.addCreateButton();
        });
    }

    private createNewCard(): void {
        const newCard = new ToDoCard(Math.floor(Math.random()* 10000), [], '');
        this._toDoListCards.push(newCard.card);
        this.toDoCardsContainer.append(newCard.cardElement);
        newCard.cardElement.hide();
        newCard.cardElement.fadeIn();
    }

    get toDoListCards(): ToDoCardModel[] {
        return this._toDoListCards;
    }
};
