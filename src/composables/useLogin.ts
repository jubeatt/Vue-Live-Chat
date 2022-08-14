import { reactive } from 'vue'
import { auth } from '@/firebase/config'
import { FirebaseUser } from '@/types'

export function useLogin() {
  const state = reactive({
    user: null as null | FirebaseUser,
    isPending: false,
    error: null
  })

  async function login(email: string, password: string): Promise<FirebaseUser> {
    state.isPending = true
    state.error = null
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
      if (!response.user) {
        throw new Error('Signup failed.')
      }
      state.isPending = false
      return Promise.resolve(response.user)
    } catch (error: any) {
      state.error = error.message
      state.isPending = false
      return Promise.reject(error)
    }
  }

  return { state, login }
}
