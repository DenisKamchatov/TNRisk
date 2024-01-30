<script setup lang="ts">

</script>

<template>
    <div class="homepage-layout">
        <div class="homepage-layout__main">
            <slot></slot>
        </div>
        <div class="homepage-layout__footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style lang="scss">

</style>