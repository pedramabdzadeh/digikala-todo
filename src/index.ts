import ToDoList from './app/components/to-do-list';
import * as $ from 'jquery';

import './assets/sass/main.scss'

$(() => {
    $(window).on('beforeunload',  () => {
        return 'Are you sure you want to close the window?';
    });
    const rootElement = $('body');
    const toDoList = new ToDoList(rootElement);
});

