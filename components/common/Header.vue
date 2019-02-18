<template>
    <header :class="$style.header"
            class="_active">
        //
    </header>
</template>

<style lang="postcss" module>
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: rgb(65, 99, 75);

        &:global(._active) {
            /* background-color: red; */
        }
    }
</style>