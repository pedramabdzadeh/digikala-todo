import * as $ from 'jquery'

export class ToDoItem {
    input: JQuery = $('<input type="text" placeholder="To Do Text"/>');
    deleteButton: JQuery = $('<button class="delete-item">X</button>');
    toDoElement: JQuery = $('<div class="to-do-item"></div>');
    private _content: string|number|string[];

    constructor(text: string, private rootElement?: JQuery) {
        this.toDoElement.append(this.input);
        this.toDoElement.append(this.deleteButton);
        this.deleteButton.on('click', () => {
           this.toDoElement.remove();
        });
        this.input.val(text);
        this.input.on('change paste keyup', () => this.handleInputChanges(this.toDoElement, this.input));
    }

    private checkIfAnyToDoExist() {

    }

    private completeTask(): void {
        this.toDoElement.children('button').first().remove();
        this.input.prop('disabled', true);
        this.input.addClass('completed');
    }

    private handleInputChanges(element: JQuery, input: JQuery) {
        if(element.children('button').length === 1 && input.val() !== '') {
            $('<button></button>').insertBefore(this.toDoElement.children('input'));
            this.toDoElement.children('button').on('click', () => {
                this.completeTask();
            })
        } else if(input.val() === '' && element.children('button').length === 2) {
            this.toDoElement.children('button').first().remove();
        }
    }


    get content(): string|number|string[] {
        this._content = this.input.val();
        return this._content;
    }
}
