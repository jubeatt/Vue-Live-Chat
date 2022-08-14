import firebase from 'firebase'

export type FirebaseUser = firebase.User
export type FirebaseUnsubscribe = firebase.Unsubscribe

export type TabType = 'login' | 'signup'
export type OnSwitchTab = (tab: TabType) => void
export type LoginData = {
  email: string
  password: string
}
export type SignupData = {
  displayName: string
  email: string
  password: string
}
export type Comment = {
  id?: string
  message: string
  displayName: string
  createdAt: firebase.firestore.Timestamp
}
