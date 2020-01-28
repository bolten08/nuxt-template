import Vue from 'vue';

/**
 * SCSS
 **/
import './ui.scss';

/**
 * Import Components
 **/
// import Button from '~/engine/button/Button';

const components = [
    // Button,
];

/**
 * Install UI components
 **/
components.forEach(component => {
    Vue.component(component.name, component);
});
