<template>
  <div>

    <router-link to="/">BACK</router-link>

    <h1>
      <template v-if="name == 'edit'">Edit user</template>
      <template v-else>Add user</template>
      {{ id }}
    </h1>

    <form>

      <div>
        <div>

          <div>
            <p>First Name</p>
            <input type="text" v-model="user.first_name">
          </div>

          <div>
            <p>Last Name</p>
            <input type="text" v-model="user.last_name">
          </div>

        </div>

        <!-- <router-link to="/">Update Details</router-link> -->
        <button v-if="name == 'edit'" @click.prevent="updateUser()">
          Update Details
        </button>
        <button v-else @click.prevent="addNewUser()">
          Add new user
        </button>

      </div>

      <div>

        <picture>
          <img v-if="user.avatar != ''" :src="user.avatar" :alt="`${user.first_name} ${user.last_name} profile photo`">
        </picture>

        <button>Change Photo</button>

      </div>

    </form>
    
  </div>
</template>

<script setup lang="ts">
  
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import { useFetch } from '../composables/useFetch'
  
  const { name, params: { id } } = useRoute()

  const user = ref({
    first_name: '',
    last_name: '',
    avatar: '',
  })

  async function getUser(id:any): Promise<void> {

    const { data } = await useFetch().get('users/' +id)

    Object.assign(user.value, data)

  }

  async function updateUser(){

    const result = await useFetch().patch('users/' + id, user.value)
    console.log(result)

  }

  async function addNewUser(){

    const result = await useFetch().post('users', user.value)
    console.log(result)

  }

  if(id){
    getUser(id)
  }

</script>