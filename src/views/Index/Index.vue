<script setup lang="ts">
import userApi from "@/api/UserApi";

const componentName = getCurrentInstance()?.type.__name
console.log(componentName)
onMounted(async () => {
    const iUser = await userApi.get({id:2})
    console.log('huo qu dao', iUser)
    const iUserList = await userApi.list({nPageSize: 2})
    console.log('获取用户列表', iUserList)
})
</script>

<template>
    <div class="index-w">
        <div class="title">Index.vue</div>
        <!-- <router-view v-slot="{ Component }">
            <keep-alive :exclude="['My']">
                <component :is="Component" />
            </keep-alive>
        </router-view> -->
        <!-- <router-view></router-view> -->
        <keep-alive-router-view></keep-alive-router-view>
        <ul>
            <li>
                <router-link :to="{name: 'home'}">{{ lpk('page.index.Title') }}</router-link>
            </li>
            <li>
                <router-link :to="{name: 'blogIndex'}">{{ lpk('Blog') }}</router-link>
            </li>
            <li>
                <router-link :to="{name: 'my'}">{{ lpk('page.index.My') }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.index-w{
    background-color: #ff0;
    .title{
        margin: 30px;
    }
}
</style>