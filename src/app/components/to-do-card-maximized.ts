import ToDoCard from './to-do-card';
import * as $ from 'jquery';

export default class ToDoCardMaximized {
    private readonly toDoCard: ToDoCard;
    private maximizedElement: JQuery = $('<div class="to-do-maximized"><div class="to-do-container"></div></div>');

    constructor(toDoCard: ToDoCard) {
        this.toDoCard = toDoCard;
        const resizeButton = this.toDoCard.cardElement.find('#resize-image');
        resizeButton.remove();
        this.maximizedElement.children().first().append(Object.create(this.toDoCard.cardElement.children()));
        this.maximizedElement.children().first().addClass(this.toDoCard.card.color);
        const oldCloseButton = this.maximizedElement.find('.card-title').children('button').remove();
        const newCloseButton = $('<button>X</button>');

        newCloseButton.on('click', () => {
            this.toDoCard.cardElement.append(this.maximizedElement.find('.to-do-container').children());
            this.toDoCard.cardElement.find('.card-title').children('button').remove();
            oldCloseButton.on('click', () => {
                this.toDoCard.cardElement.remove();
            });
            resizeButton.on('click', () => {
                const maximized = new ToDoCardMaximized(this.toDoCard);
            });
            this.toDoCard.cardElement.find('.card-title').append(oldCloseButton);
            this.toDoCard.colorsBar.append(Object.create(resizeButton));
            this.maximizedElement.remove();
        });

        this.maximizedElement.find('.card-title').append(newCloseButton);
        this.handleColorChange();
        $('body').append(this.maximizedElement);
    }

    private handleColorChange() {
        this.maximizedElement
            .find('#colors-bar')
            .children('button').on('click', (e) => {
            this.maximizedElement.children('.to-do-container').removeClass();
            this.maximizedElement.children().first().addClass('to-do-container');
            this.maximizedElement.children().first().addClass(e.target.className);
        });

    }
}
