import * as $ from 'jquery';

export default class ToDoItem {
    private toDoContainer: JQuery = $('<div class="to-do-container"> </div>');

    constructor(toDos: string[], title: string, color?: string) {

    }
}
