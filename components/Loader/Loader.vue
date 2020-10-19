<template>
    <div class="Loader">
        <span class="Loader-ripple" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'Loader',
}
</script>

<style lang="scss">
.Loader {
    background: fade-out($color-neutral-black, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $z-index-max;

    &-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        width: 100px;
        height: 100px;
        margin: -2px 0 0 -6px;

        &::after,
        &::before {
            content: '';
            display: block;
            position: absolute;
            border: 4px solid #fff;
            opacity: 1;
            border-radius: 50%;
            animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        &::after {
            animation-delay: -0.5s;
        }

        @keyframes ripple {
            0% {
                top: 50px;
                left: 50px;
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                top: -1px;
                left: -1px;
                width: 98px;
                height: 98px;
                opacity: 0;
            }
        }
    }
}
</style>
