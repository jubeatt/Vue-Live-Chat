<template>
  <div class="form">
    <div class="container">
      <h2 class="form-heading">Sign up</h2>
      <form @submit.prevent="onSave">
        <p class="error" v-if="error"><span class="material-icons"> info </span>{{ error }}</p>
        <input v-model="displayName" type="text" placeholder="display name" required />
        <input v-model="email" type="email" placeholder="email" required />
        <input v-model="password" type="password" placeholder="password" required />
        <div class="form-btn-wrap">
          <button v-if="isPending" disabled><Spinner /></button>
          <button v-else>Sign up</button>
        </div>
        <div class="form-footer">
          <p>
            Already registered?
            <span @click="onSwitchTab('login')" class="form-link">Login</span> instead.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRefs } from 'vue'
import { OnSwitchTab, SignupData, FirebaseUser } from '@/types'
import { useSignup } from '@/composables/useSignup'
import Spinner from '@/components/Spinner.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { Spinner },
  props: {
    onSwitchTab: {
      required: true,
      type: Function as PropType<OnSwitchTab>
    }
  },
  setup() {
    const router = useRouter()
    const inputs = reactive<SignupData>({
      displayName: '',
      email: '',
      password: ''
    })

    const { state, signup } = useSignup()

    function onSave() {
      signup(inputs.email, inputs.password, inputs.displayName)
        .then((user: FirebaseUser) => {
          console.log('create success', user)
          router.push({ name: 'ChatRoom' })
        })
        .catch((error: any) => {
          console.log('ERROR', error.message)
        })
    }

    return { ...toRefs(inputs), ...toRefs(state), onSave }
  }
})
</script>
