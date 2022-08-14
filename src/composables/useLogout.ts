import { reactive } from 'vue'
import { auth } from '@/firebase/config'

export function useLogout() {
  const state = reactive({
    isPending: false,
    error: null as null | string
  })

  async function logout(): Promise<void> {
    state.isPending = true
    state.error = null
    try {
      await auth.signOut()
      state.isPending = false
    } catch (error: any) {
      state.error = error.message
      state.isPending = false
      return Promise.reject(error)
    }
  }

  return { state, logout }
}
