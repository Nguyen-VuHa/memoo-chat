<script setup>
import { Menu } from 'ant-design-vue';
import { reactive, watch, h, onMounted } from 'vue';
import { useConfigStore } from '@/stores/configStore'
import { useRoute, useRouter } from 'vue-router';
import { PieChartOutlined } from '@ant-design/icons-vue';

const configStore = useConfigStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  state.selectedKeys=[route.path]
})

const items = reactive([
  {
    key: 'messenger',
    icon: () => h(PieChartOutlined),
    label: 'Messenger',
    title: 'Messenger',
  },
]);

const state = reactive({
  selectedKeys: ['messenger'],
  openKeys: [],
  preOpenKeys: [],
});

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);
</script>

<template>
    <Menu
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :inline-collapsed="configStore.isToggleSideBar"
        :items="items"
        @click="(value) => {
          router.push({
            path:  value.key
          })
        }"
    >

    </Menu>
</template>