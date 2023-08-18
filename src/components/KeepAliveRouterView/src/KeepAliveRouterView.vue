<script setup lang="ts">
// interface IKeepAliveRouterViewState{
//     excludeNames: string[]
// }
// const iState = reactive<IKeepAliveRouterViewState>({
//     excludeNames: ['my']
// })
// const { excludeNames } = toRefs(iState)
</script>

<template>
    <div>
        <router-view v-slot="{ Component }">
            <keep-alive :exclude="['my']">
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<style lang="scss" scoped>

</style>