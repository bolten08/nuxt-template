import Vue from 'vue';

/**
 * SCSS
 */
import './ui.scss';

/**
 * Импорт компонентов
 */
// import Button from '~/engine/button/Button';

const components = [];

/**
 * Регистрация компонентов.
 * Теперь можно их использовать в любом vue-шаблоне
 */
components.forEach(component => {
    if (component.name) {
        Vue.component(component.name, component);
    } else {
        console.warn('[UI] Register / No component name: ', component);
    }
});
