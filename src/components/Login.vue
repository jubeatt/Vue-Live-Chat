<template>
  <div class="form">
    <div class="container">
      <h2 class="form-heading">Login</h2>
      <form @submit.prevent="onSave">
        <p class="error" v-if="error"><span class="material-icons">info</span>{{ error }}</p>
        <input v-model="email" type="email" placeholder="email" required />
        <input v-model="password" type="password" placeholder="password" required />
        <div class="form-btn-wrap">
          <button v-if="isPending" disabled><Spinner /></button>
          <button v-else>Login</button>
        </div>
        <div class="form-footer">
          <p>
            No account yet?
            <span @click="onSwitchTab('signup')" class="form-link">Sign up</span> instead.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { LoginData, OnSwitchTab } from '@/types'
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { useLogin } from '@/composables/useLogin'
import { useRouter } from 'vue-router'
import Spinner from '@/components/Spinner.vue'

export default defineComponent({
  props: {
    onSwitchTab: {
      required: true,
      type: Function as PropType<OnSwitchTab>
    }
  },
  components: { Spinner },
  setup() {
    const router = useRouter()
    const inputs = reactive<LoginData>({
      email: '' as string,
      password: '' as string
    })
    const { state, login } = useLogin()

    async function onSave() {
      login(inputs.email, inputs.password)
        .then(() => router.push({ name: 'ChatRoom' }))
        .catch((error: any) => console.log(error.message))
    }

    return { ...toRefs(inputs), ...toRefs(state), onSave }
  }
})
</script>
