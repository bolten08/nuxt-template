<template>
    <footer :class="$style.TheFooter">
        The Footer

        <LogoIda :class="$style.ida" />
    </footer>
</template>

<script>
    import LogoIda from '~/components/common/LogoIda';

    export default {
        components: {
            LogoIda,
        },
    };
</script>

<style lang="scss" module>
    .TheFooter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: $footer-h;
    }

    .ida {
        width: 64px;
    }
</style>
