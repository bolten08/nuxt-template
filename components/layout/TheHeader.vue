<template>
    <header :class="$style.TheHeader">
        <div :class="$style.wrap"
             class="container">
            TheHeader
        </div>
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
        background-color: rgba(grey, .4);
    }

    .wrap {
        display: flex;
        align-items: center;
        height: $header-h;
    }
</style>
