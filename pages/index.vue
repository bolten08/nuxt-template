<template>
    <div :class="$style.HomePage">
        <h1>
            Home Page
        </h1>
        <p>
            <span>My</span> description
        </p>
        <button @click="openModal">
            Open Modal
        </button>
    </div>
</template>

<script>
    import FormExample1 from '~/components/layout/modals/FormExample1';

    export default {
        name: 'HomePage',

        methods: {
            openModal() {
                this.$modal.open(FormExample1);
            }
        }
    };
</script>

<style lang="scss" module>
    .HomePage {
        //
    }
</style>
