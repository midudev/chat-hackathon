import { writable } from "svelte/store";

type User = {
  avatar: string,
  userName: string,
  name: string,
  email: string,
  token: string
}

export const activeConversation = writable<any>(null)
export const user = writable<User|null>(null)
