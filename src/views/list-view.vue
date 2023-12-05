<template>
  <div>
    <h1>User List</h1>

    <router-link to="/new">Add User</router-link>

    <table>
      
      <thead>
        <tr>
          <th></th>
          <th>Full Name</th>
          <th>Action</th>
        </tr>
      </thead>
      
      <tbody>
        <tr v-for="(user, index) in users" :key="'user_' + index">
          <td>
            <picture>
              <img :src="user.avatar" 
                   :alt="`${user.first_name} ${user.last_name} profile photo`">
            </picture>
          </td>
          <td>{{ `${user.first_name} ${user.last_name}` }}</td>
          <td>
            <v-icon icon="pencil" />
            <v-icon icon="delete" />
          </td>
        </tr>
      </tbody>

    </table>

    <nav>
      <ul>
        <template v-for="page in pagination.total_pages" :key="'page_' + page">
          <li @click="fetchList(page)" :class="{ active: page == pagination.page}">
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
  import vIcon from '@/components/v-icon.vue';

  const users = ref()
  const pagination = ref()

  async function fetchList(get_page:number = 1): Promise<void> {

    const { data, page, total_pages } = await useFetch().get('users?page=' + get_page)

    users.value = data
    pagination.value = { page, total_pages }

  }

  fetchList()

</script>