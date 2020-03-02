import * as $ from 'jquery';
import {ToDoCardModel} from '../models/to-do-card-model';
import {ToDoItem} from './to-do-item';
import ToDoCardMaximized from './to-do-card-maximized';

export default class ToDoCard {
    private readonly _card: ToDoCardModel;
    private _cardElement: JQuery = $('<div class="to-do-container"><div id="body"><div></div></div></div></div>');
    private _title: JQuery = $('<div class="card-title"><input type="text" placeholder="Enter Title"/><button>X</button></div>');
    private colors = ['yellow', 'blue', 'red', 'white', 'green'];
    private _colorsBar: JQuery = $('<div id="colors-bar"></div>');

    constructor(id: number, toDos: string[], title: string, color?: string) {
        this._card = {
            title,
            id,
            toDos,
            color
        };
        this._title.attr('id', this.card.id + '-title');
        this._title.children('button').on('click', ()=> {
            this.deleteCard();
        });
        this.cardElement.children().first().children().append(this._title);
        this.addColors();
        this.cardElement.append(this._colorsBar);
        this.addToDo();
    }

    private deleteCard() {
        this.cardElement.remove();
    }

    private addToDo() {
        const createItemButton = $('<button class="create-new-item">Add To do</button>');
        const cardBody = this.cardElement.find('#body > div');
        createItemButton.on('click', ()=> {
            const toDoItem = new ToDoItem('', this.cardElement);
            cardBody.append(toDoItem.toDoElement);
            toDoItem.toDoElement.hide();
            toDoItem.toDoElement.fadeIn();
            cardBody.append(createItemButton);
        });
        cardBody.append(createItemButton);
    }


    get cardElement(): JQuery {
        return this._cardElement;
    }

    get card(): ToDoCardModel {
        return this._card;
    }

    get title(): JQuery {
        return this._title;
    }
    get colorsBar(): JQuery {
        return this._colorsBar;
    }

    private addColors() {
        for(const color of this.colors) {
            const button: JQuery = $('<button></button>');
            button.addClass(color);
            button.on('click', (e) => {
                    this.cardElement.removeClass();
                    this.cardElement.addClass('to-do-container');
                    this._cardElement.addClass(e.target.className);
                    this.card.color = e.target.className;
            });
            this._colorsBar.append(button);
        }
        const maxButton = $('<img src="./assets/resize.png" id="resize-image" alt="max"/>');
        maxButton.on('click', () => {
            const maximized = new ToDoCardMaximized(this);
        });
        this.colorsBar.append(maxButton);
    }
}
