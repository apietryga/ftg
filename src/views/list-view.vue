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

        <router-link to="/new">Add User</router-link>

      </div>
  
      <table>
        
        <thead>
          <tr>
            <th></th>
            <th>Full Name</th>
            <th>Action</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="'user_' + index">
            <td>
              <picture>
                <img :src="user.avatar" 
                     :alt="`${user.first_name} ${user.last_name} profile photo`">
              </picture>
            </td>
            <td>{{ `${user.first_name} ${user.last_name}` }}</td>
            <td>
              <router-link :to="'/edit/' +  user.id">
                <i class="mdi mdi-pencil"></i>
              </router-link>
              <button @click="deleteUser(user.id)">
                <v-icon icon="delete" />
              </button>
            </td>
          </tr>
        </tbody>
  
      </table>

    </div>

    <nav>
      <ul>
        {{ pagination }}
        <template v-for="page in pagination?.total_pages" :key="'page_' + page">
          <li @click="getList(page)" :class="{ active: page == pagination.page}">
            {{ page }}
          </li>
        </template>
      </ul>
    </nav>

  </div>
</template>

<script setup lang="ts">

  import { ref } from 'vue'
  import { useFetch } from '../composables/useFetch'
  import vIcon from '@/components/v-icon.vue'

  const search_phrase = ref()
  const users = ref()
  const filteredUsers = ref()
  const isFiltered = ref(false)
  const pagination = ref()

  async function getList(get_page:number = 1): Promise<void> {

    const { data, page, total_pages } = await useFetch().get('users?page=' + get_page)

    users.value = data
    filteredUsers.value = data
    pagination.value = { page, total_pages }

  }

  async function deleteUser(id:number): Promise<void> {

    const result = await useFetch()._delete('users/' + id)
    console.log(result)

  }

  function searchUser(): boolean {

    const phrase = search_phrase.value.toLowerCase()

    if(phrase === ''){
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