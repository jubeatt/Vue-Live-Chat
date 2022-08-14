<template>
  <div class="chatroom">
    <div class="container">
      <template v-if="!isInit">
        <SkelectonProfile />
        <SkelectonCard />
      </template>
      <template v-else>
        <div class="chatroom-header">
          <div>
            <p class="chatroom-header-display-name">Hey there {{ currentUser?.displayName }}</p>
            <p class="chatroom-header-email">Currently logged in as {{ currentUser?.email }}</p>
          </div>
          <div>
            <button v-if="isPending" disabled><Spinner /></button>
            <button v-else @click="onLogout">Logout</button>
          </div>
          <p v-if="error" class="error">{{ error }}</p>
        </div>
        <div ref="chatRoomBody" class="chatroom-body">
          <div v-for="comment of comments" :key="comment.id" class="chatroom-body-message">
            <div class="chatroom-body-message-day">
              {{ formatDistanceToNow(comment.createdAt.toDate()) }}
            </div>
            <div class="chatroom-body-message-author">{{ comment.displayName }}</div>
            <div class="chatroom-body-message-content">
              {{ comment.message }}
            </div>
          </div>
        </div>
        <div class="chatroom-input">
          <textarea
            v-model.trim="message"
            @keydown.enter.prevent="onSend"
            placeholder="Type message and hit enter to send..."
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onBeforeUnmount, nextTick } from 'vue'
import { useLogout } from '@/composables/useLogout'
import Spinner from '@/components/Spinner.vue'
import SkelectonCard from '@/components/skeletons/SkelectonCard.vue'
import SkelectonProfile from '@/components/skeletons/SkelectonProfile.vue'
import { auth, db, timestamp } from '@/firebase/config'
import { FirebaseUnsubscribe, FirebaseUser, Comment } from '@/types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: { SkelectonCard, SkelectonProfile, Spinner },
  setup() {
    const router = useRouter()
    const { state, logout } = useLogout()
    const currentUser = ref<FirebaseUser | null>(null)
    const comments = ref<Comment[]>([])
    const chatRoomBody = ref<HTMLDivElement | null>(null)
    const isInit = ref<boolean>(false)
    const message = ref<string>('')

    const unsubscribeAuth = initUser()
    const unsubscribeCollection = setRealTimeComments()

    onBeforeUnmount(() => {
      unsubscribeAuth()
      unsubscribeCollection()
    })

    function initUser(): FirebaseUnsubscribe {
      return auth.onAuthStateChanged({
        next: (user: FirebaseUser | null) => {
          setTimeout(() => {
            currentUser.value = user
            isInit.value = true
            nextTick(() => chatRoomBody.value?.scrollTo(0, chatRoomBody.value?.scrollHeight))
          }, 2000)
        },
        error: (error) => {
          setTimeout(() => {
            console.log(error.message)
            state.error = error.message
            isInit.value = true
          }, 2000)
        },
        complete: () => console.log('complete')
      })
    }

    function setRealTimeComments() {
      return db
        .collection('comments')
        .orderBy('createdAt', 'asc')
        .onSnapshot({
          next: (snapshot) => {
            const response = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            })) as Comment[]
            comments.value = response
            nextTick(() => chatRoomBody.value?.scrollTo(0, chatRoomBody.value?.scrollHeight))
          },
          error: (error) => {
            console.log(error.message)
            state.error = error.message
          },
          complete: () => console.log('completed')
        })
    }

    function onLogout() {
      logout()
        .then(() => router.push({ name: 'Home' }))
        .catch((error: any) => {
          state.error = error.message
          console.log(error.message)
        })
    }

    async function onSend() {
      if (!message.value) return
      const comment: Comment = {
        createdAt: timestamp.fromDate(new Date()),
        displayName: currentUser.value?.displayName as string,
        message: message.value
      }
      state.error = null
      message.value = ''
      try {
        await db.collection('comments').add(comment)
      } catch (error: any) {
        state.error = error.message
      }
    }

    return {
      ...toRefs(state),
      isInit,
      currentUser,
      message,
      comments,
      chatRoomBody,
      onLogout,
      onSend,
      formatDistanceToNow
    }
  }
})
</script>
