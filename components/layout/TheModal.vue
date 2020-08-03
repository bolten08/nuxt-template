<template>
    <transition name="overlay-appear"
                @enter="isContentVisible = true"
                @after-leave="afterOverlayClose">
        <div v-if="isOverlayVisible"
             :class="[$style.overlay, options && options.classList ? options.classList: '']"
             @click.self="onClose">

            <component :is="component"
                       :data="options"
                       :visible="isContentVisible"
                       @close="onClose"
                       @after-leave="afterContentClose" />
        </div>
    </transition>
</template>

<script>
    import {lockBody, unlockBody} from '../../assets/js/utils/commonUtils';

    export default {
        data() {
            return {
                component: null,
                options: null,
                newComponent: null,
                newOptions: null,
                isOverlayVisible: false,
                isContentVisible: false,
            };
        },

        watch: {
            $route() {
                this.onClose();
            },
        },

        beforeMount() {
            this.$modal.event.$on('open', this.onOpen);
            this.$modal.event.$on('close', this.onClose);
        },

        beforeDestroy() {
            this.$modal.event.$off('open', this.onOpen);
            this.$modal.event.$off('close', this.onClose);
        },

        methods: {
            onOpen(component, options) {
                if (this.isOverlayVisible) {
                    this.newComponent = component;
                    this.newOptions = options || null;
                    this.isContentVisible = false;

                    // console.warn('[TheModal] Модальное окно уже открыто');
                } else {
                    lockBody();
                    this.isOverlayVisible = true;
                    this.component = component;
                    if (options) {
                        this.options = options;
                    }
                }
            },

            onClose() {
                this.isContentVisible = false;
            },

            afterContentClose() {
                if (this.newComponent) {
                    this.component = this.newComponent;
                    this.options = this.newOptions;
                    this.newComponent = null;
                    this.newOptions = null;

                    this.$nextTick(() => {
                        this.isContentVisible = true;
                    });
                } else {
                    this.component = null;
                    this.options = null;
                    this.isOverlayVisible = false;
                }
            },

            afterOverlayClose() {
                unlockBody();
            },
        },
    };
</script>

<style lang="scss" module>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 98;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        overflow: hidden;
        -webkit-overflow-scrolling: touch;

        &:global(.overlay-appear-enter-active) {
            transition: all .4s;
        }

        &:global(.overlay-appear-leave-active) {
            transition: all .2s;
            opacity: 0;
        }

        &:global(.overlay-appear-enter) {
            opacity: 0;
        }

        &:global(.is-article) {
            overflow-y: auto;
        }
    }
</style>
