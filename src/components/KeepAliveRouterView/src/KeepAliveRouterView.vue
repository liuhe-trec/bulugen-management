<script setup lang="ts">
import { get } from "lodash";
import { useRoute } from "vue-router";

interface IKeepAliveRouterViewState {
  excludeNames: string[];
}
const iState = reactive<IKeepAliveRouterViewState>({
  excludeNames: [],
});
const { excludeNames } = toRefs(iState);

// 事件处理
watch(useRoute(), (newValue, _oldValue) => {
  if (false === (get(newValue, "meta.keepAlive", true) as boolean)) {
    // const componentName = get(newValue, 'meta.componentName', '') as string
    const componentName = get(
      newValue.matched[newValue.matched.length - 1],
      'components.default["__name"]',
      ""
    ) as string;
    if (componentName && -1 == iState.excludeNames.indexOf(componentName)) {
      iState.excludeNames.push(componentName);
    }
  }
});
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="excludeNames">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="scss" scoped></style>
