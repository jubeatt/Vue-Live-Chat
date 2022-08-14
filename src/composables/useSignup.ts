import { reactive } from 'vue'
import { auth } from '@/firebase/config'
import { FirebaseUser } from '@/types'

export function useSignup() {
  const state = reactive({
    user: null as null | FirebaseUser,
    isPending: false,
    error: null
  })

  async function signup(
    email: string,
    password: string,
    displayName: string
  ): Promise<FirebaseUser> {
    state.isPending = true
    state.error = null
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)
      if (!response.user) {
        throw new Error('Signup failed.')
      }
      await response.user.updateProfile({ displayName })
      state.isPending = false
      return Promise.resolve(response.user)
    } catch (error: any) {
      state.error = error.message
      state.isPending = false
      return Promise.reject(error)
    }
  }

  return { state, signup }
}
