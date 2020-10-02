<template>
    <footer :class="$style.TheFooter">
        <div :class="$style.wrap"
             class="container">
            The Footer

            <LogoIda :class="$style.ida" />
        </div>
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
        background-color: rgba(grey, 0.4);
    }

    .wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: $footer-h;
    }

    .ida {
        width: 64px;
    }
</style>
