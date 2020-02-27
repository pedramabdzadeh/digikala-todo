import * as $ from 'jquery';
import {ToDoCardModel} from '../models/to-do-card-model';
import {ToDoItem} from './to-do-item';

export default class ToDoCard {
    private readonly _card: ToDoCardModel;
    private _cardElement: JQuery = $('<div class="to-do-container"><div id="body"><div></div></div></div></div>');
    private title: JQuery = $('<div class="card-title"><input type="text" placeholder="Enter Title"/><button>X</button></div>');
    private colorsBar: JQuery = $('<div id="colors-bar"><button class="blue"></button>' +
        ' <button class="red"></button> <button class="white"></button></div>');

    constructor(id: number, toDos: string[], title: string, color?: string) {
        this._card = {
            title,
            id,
            toDos,
            color
        };
        this.title.attr('id', this.card.id + '-title');
        this.title.children('button').on('click', ()=> {
            this.deleteCard();
        });
        this.cardElement.children().first().children().append(this.title);
        this.cardElement.append(this.colorsBar);
        this.colorsBar.children('button').on('click',
            (e) => {
            this.cardElement.removeClass();
            this.cardElement.addClass('to-do-container');
            this._cardElement.addClass(e.target.className);
        });
        this.addToDo();
    }

    private deleteCard() {
        this.cardElement.remove();
    }

    private addToDo() {
        const createItemButton = $('<button class="create-new-item">Add To do</button>');
        createItemButton.on('click', ()=> {
            const toDoItem = new ToDoItem('', this.cardElement);
            this.cardElement.children().first().children().first().append(toDoItem.toDoElement);
            toDoItem.toDoElement.hide();
            toDoItem.toDoElement.fadeIn();
            this.cardElement.children().first().children().first().append(createItemButton);
        });
        this.cardElement.children().first().children().first().append(createItemButton);
    }


    get cardElement(): JQuery<HTMLElement> {
        return this._cardElement;
    }

    get card(): ToDoCardModel {
        return this._card;
    }
}
