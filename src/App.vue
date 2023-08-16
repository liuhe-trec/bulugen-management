<script setup lang="ts">
  console.log(lpk('Index'))
</script>

<template>
  <div class="app-w">
    Bulugen-Management
    {{ app.getConfig('baseUrl') }}
    {{ lpk('Type', {index: 1}) }}
  </div>
</template>

<style scoped>
.app-w{
  display: flex;
  color: brown;
}
</style>
