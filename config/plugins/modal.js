import Vue from 'vue';

const ModalPlugin = {
    install(Vue) {
        Vue.prototype.$modal = {
            event: new Vue(),

            open(component, data) {
                this.event.$emit('open', component, data);
            },

            close() {
                this.event.$emit('close');
            },
        };
    },
};

Vue.use(ModalPlugin);
