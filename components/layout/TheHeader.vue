<template>
    <header :class="$style.TheHeader">
        TheHeader
    </header>
</template>

<script>
    export default {};
</script>

<style lang="scss" module>
    .TheHeader {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 15;
        width: 100%;
    }
</style>
