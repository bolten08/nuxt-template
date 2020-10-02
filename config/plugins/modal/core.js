const Plugin = {
    install(Vue) {
        if (Vue.prototype.$modal) {
            return;
        }

        const plugin = {
            event: new Vue(),

            open(component, data) {
                this.event.$emit('open', component, data);
            },

            close() {
                this.event.$emit('close');
            },
        };

        Object.defineProperty(Vue.prototype, '$modal', {
            get() {
                return plugin;
            },
        });
    },
};

export default Plugin;
