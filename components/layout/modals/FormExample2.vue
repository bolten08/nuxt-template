<template>
    <transition name="form-appear"
                @after-enter="$emit('after-enter')"
                @before-leave="$emit('before-leave')"
                @after-leave="$emit('after-leave')">
        <div v-if="visible"
             :class="$style.FormExample2">
            <div :class="$style.wrap">
                <h5 :class="$style.title">
                    Form Example 2
                </h5>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            submited: {
                type: Boolean,
                default: false
            },
            visible: Boolean
        }
    };
</script>

<style lang="scss" module>
    .FormExample2 {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        min-height: 100%;
        padding: 16px;
        pointer-events: none;

        &:global(.form-appear-enter-active) {
            transition: transform .8s, opacity .8s;
        }

        &:global(.form-appear-leave-active) {
            transition: transform .4s, opacity .4s;
        }

        &:global(.form-appear-enter),
        &:global(.form-appear-leave-to) {
            transform: translate(0, 80px);
            opacity: 0;
        }
    }

    .wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 150vh;
        width: 460px;
        background-color: #fff;
        pointer-events: all;
        border-radius: 4px;
    }

    .title {
        font-size: 24px;
    }
</style>
