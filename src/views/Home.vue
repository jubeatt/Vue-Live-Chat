<template>
  <div class="home">
    <template v-if="currentTab === 'signup'">
      <Signup :onSwitchTab="onSwitchTab" />
    </template>
    <template v-else>
      <Login :onSwitchTab="onSwitchTab" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'
import { TabType } from '@/types'

export default defineComponent({
  components: { Login, Signup },
  setup() {
    const currentTab = ref<TabType>('login')

    function onSwitchTab(tab: TabType) {
      currentTab.value = tab
    }

    return { currentTab, onSwitchTab }
  }
})
</script>
