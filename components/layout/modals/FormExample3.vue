<template>
    <div v-if="visible"
         :class="$style.FormExample3">
        <div :class="$style.wrap">
            <h5 :class="$style.title">
                Form Example 3
            </h5>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            submited: {
                type: Boolean,
                default: false
            },
            visible: Boolean
        },

        watch: {
            visible(val) {
                val ? this.$emit('after-enter') : this.$emit('after-leave');
            }
        }
    };
</script>

<style lang="scss" module>
    .FormExample3 {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 16px;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }

    .wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 300px;
        width: 460px;
        background-color: #fff;
        pointer-events: all;
        border-radius: 4px;
    }

    .title {
        font-size: 24px;
    }
</style>
