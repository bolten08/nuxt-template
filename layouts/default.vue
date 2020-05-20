<template>
    <div>
        <TheHeader />

        <main :class="$style.main">
            <nuxt />
        </main>

        <TheFooter />
        <TheModal />
    </div>
</template>

<script>
    import TheHeader from '~/components/layout/TheHeader';
    import TheFooter from '~/components/layout/TheFooter';
    import TheModal from '~/components/layout/TheModal';

    export default {
        components: {
            TheHeader,
            TheFooter,
            TheModal
        }
    };
</script>

<style lang="scss" module>
    .main {
        min-height: calc(100vh - #{$footer-h});
    }
</style>
