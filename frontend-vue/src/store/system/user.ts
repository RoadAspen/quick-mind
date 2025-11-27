/** 用户列表 */
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
interface User {
  name: string;
}
export const useUserStore = defineStore('user', () => {
  const userList: Ref<User[]> = ref([]);

  return {
    userList
  };
});
