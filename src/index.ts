import ToDoList from './app/components/to-do-list';
import * as $ from 'jquery';

import './assets/sass/main.scss'

$(() => {
    let rootElement = $('body');
    new ToDoList(rootElement);
});

