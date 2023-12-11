<template>
  <div>

    <h1>User list</h1>

    <div class="card">

      <div class="card-title">

        <div class="search">

          <form class="search-field" @submit.prevent="searchUser()" ref="search">
            <input type="text" placeholder="Search for users..." name="search" v-model="search_phrase">
            <template v-if="!isFiltered">
              <v-icon icon="magnify" class="search-icon" @click="searchUser()"/>
            </template>
            <template v-else>
              <v-icon icon="close" class="search-icon" @click="clearSearcher()"/>
            </template>
          </form>

        </div>

        <router-link to="/new" class="cta radius shadow">
          <v-icon icon="plus"/>
          <span>Add User</span>
        </router-link>

      </div>
  
      <div class="card-body">

        <table class="table">
          
          <thead>
            <tr>
              <th></th>
              <th class="th-name">Full Name</th>
              <th class="th-actions">Action</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="'user_' + index">
              <td class="td-avatar">
                <picture>
                  <img :src="user.avatar" 
                       :alt="`${user.first_name} ${user.last_name} profile photo`">
                </picture>
              </td>
              <td>
                {{ `${user.first_name} ${user.last_name}` }}
              </td>
              <td class="td-actions actions">
                <router-link :to="'/edit/' +  user.id">
                  <i class="mdi mdi-pencil"></i>
                </router-link>
                <a @click="deleteUser(user.id)">
                  <v-icon icon="delete" />
                </a>
              </td>
            </tr>
          </tbody>
    
        </table>

      </div>

    </div>

    <v-pagination :pagination="pagination" @changePage="getList" />

  </div>
</template>

<script setup lang="ts">

  import { ref } from 'vue'
  import { useFetch } from '../composables/useFetch'
  import vIcon from '@/components/v-icon.vue'
  import vPagination from '@/components/v-pagination.vue'

  const search_phrase = ref()
  const users = ref()
  const filteredUsers = ref()
  const isFiltered = ref(false)
  const pagination = ref()

  async function getList(get_page:number = 1): Promise<void> {

    const { data: { data, page, total_pages } } = await useFetch().get('users?page=' + get_page)

    users.value = data
    filteredUsers.value = data
    pagination.value = { page, total_pages }

  }

  async function deleteUser(id:number): Promise<void> {

    const { status } = await useFetch()._delete('users/' + id)

    if(status === 204){
      users.value = users.value.filter((user: any) => user.id !== id)
      filteredUsers.value = users.value
    }

  }

  function searchUser(): boolean {

    const phrase = search_phrase.value?.toLowerCase()

    if(!phrase || phrase === ''){
      return filteredUsers.value = users.value
    }

    filteredUsers.value = users.value.filter((user:any) => {

      const first_name = user.first_name.toLowerCase()
      if(first_name.includes(phrase)){
        return true
      }

      const last_name = user.last_name.toLowerCase()
      if(last_name.includes(phrase)){
        return true
      }

      return false

    })

    return isFiltered.value = true


  }

  function clearSearcher(): void {
    search_phrase.value = ''
    isFiltered.value = false
    searchUser()
  }

  getList()

</script>

<style lang="scss" scoped>

  .table {
    .th-name{
      width:80%;
      text-align: left;
    }
    .th-actions {
      width:20%;
    }
    .td-avatar {
      picture{
        width:3rem;
        height:3rem;
        display:flex;
        img{
          max-width: 100%;
          max-height: 100%;
          border-radius:50%;
        }
      }
    }
    .td-actions {
      text-align: center;
    }
  }

</style>