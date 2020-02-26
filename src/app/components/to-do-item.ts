import * as $ from 'jquery'

export class ToDoItem {
    input: JQuery = $('<input type="text" placeholder="To Do Text"/>');
    toDoElement: JQuery = $('<div class="to-do-item"></div>');
    private _content: string|number|string[];

    constructor(text: string, private rootElement?: JQuery) {
        this.toDoElement.append(this.input);
        this.input.val(text);
        this.input.on('change paste keyup', () => this.handleInputChanges(this.toDoElement, this.input));
    }

    private checkIfAnyToDoExist() {

    }

    private completeTask(): void {
        this.toDoElement.children('button').remove();
        this.input.prop('disabled', true);
        this.input.addClass('completed');
    }

    private handleInputChanges(element: JQuery, input: JQuery) {
        if(element.children('button').length === 0 && input.val() !== '') {
            $('<button></button>').insertBefore(this.toDoElement.children('input'));
            this.toDoElement.children('button').on('click', () => {
                this.completeTask();
            })
        } else if(input.val() === '') {
            this.toDoElement.children('button').first().remove();
        }
    }


    get content(): string|number|string[] {
        this._content = this.input.val();
        return this._content;
    }
}
