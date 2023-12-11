<template>
  <div>

    <h1>
      <router-link to="/">
        <v-icon icon="arrow-left" />
      </router-link>
      <template v-if="name == 'edit'">Edit user</template>
      <template v-else>Add user</template>
    </h1>

    <div class="edit-wrapper">

      <form>
  
        <div class="card wrapper-details">
          <div class="form-wrapper">
  
            <div class="form-field">
              <label for="first_name">
                <p>First Name</p>
              </label>
              <input type="text" id="first_name" v-model="user.first_name" class="border">
            </div>
  
            <div class="form-field">
              <label for="last_name">
                <p>Last Name</p>
              </label>
              <input type="text" id="last_name" v-model="user.last_name" class="border">
            </div>
  
          </div>
  
          <div class="form-actions">

            <button v-if="name == 'edit'" @click.prevent="updateUser()" class="cta">
              Update Details
            </button>

            <button v-else @click.prevent="addNewUser()" class="cta">
              Add new user
            </button>
            
            <router-link to="/" class="cta danger">
              Cancel
            </router-link>

          </div>
  
        </div>
  
        <div class="card wrapper-avatar">
  
          <picture class="avatar">
            <img 
              :src="user.avatar != '' ? user.avatar : '/ftg/images/default-avatar.webp'"
              :alt="(user.avatar != '' ? `${user.first_name} ${user.last_name}` : 'User') + ' profile photo'"
            >
          </picture>
  
          <div class="actions">
            
            <button class="cta outline" v-if="!photoEditor.progress" 
              @click.prevent="() => {
                photoEditor.progress = true
                photoEditor.url = user.avatar
              }">
              <v-icon icon="camera" />
              <span>Change Photo</span>
            </button>

            <div class='wrapper-photo-editing' v-else>

              <input type="text" v-model="photoEditor.url" 
                ref="newPhotoURL" @click="newPhotoURL.select()" class="border" >

              <div class="cta" 
                @click.prevent="() => {
                  photoEditor.progress = false
                  user.avatar = photoEditor.url
                }">
                Save
              </div>

              <div class="cta danger" 
                @click.prevent="photoEditor.progress = false">
                Cancel
              </div>

            </div>

          </div>
  
        </div>
  
      </form>

    </div>
    
  </div>
</template>

<script setup lang="ts">
  
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { useFetch } from '../composables/useFetch'
  import vIcon from '@/components/v-icon.vue'
  
  const { name, params: { id } } = useRoute()
  const router = useRouter()
  const newPhotoURL = ref()

  const photoEditor = ref({
    progress: false,
    url: '',
  })

  const user = ref({
    first_name: '',
    last_name: '',
    avatar: '',
  })

  async function getUser(id:any): Promise<void> {

    const { data: { data } } = await useFetch().get('users/' +id)

    Object.assign(user.value, data)

  }

  async function updateUser(){

    const { status } = await useFetch().patch('users/' + id, user.value)
    if(status === 200){
      return router.back()
    }

    // throw error

  }

  async function addNewUser(){

    const { status } = await useFetch().post('users', user.value)
    if(status === 201){
      return router.back()
    }

    // throw error

  }

  if(id){
    getUser(id)
  }

</script>

<style lang="scss" scoped>

  h1 {
    display:flex;
    align-items: center;
    a {
      color: var(--color-text);
      font-size:1.5rem;
      margin-right: .5rem;
    }
  }

  .edit-wrapper {
    form {
      display:flex;
      gap:0 1rem;
      .wrapper {
        &-details {
          flex:2;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
          .form {
            &-wrapper {
              display:flex;
              gap:0 1rem;
            }
            &-field {
              flex:1;
              label p{
                font-weight: 900;
              }
              input {
                width:100%;
              }
            }
            &-actions {
              display: flex;
              align-items: stretch;
              gap:.5rem;
            }
          }
        }
        &-avatar {
          display:flex;
          flex-direction: column;
          align-items: center;
          flex:1;
          .avatar{
            width:8rem;
            height:8rem;
            margin-bottom: 3rem;
            display:flex;
            justify-content: center;
            align-items: center;
            img{
              max-width: 100%;
              max-height: 100%;
              border-radius:50%;
            }
          }
          .actions {
            width: 100%;
            .wrapper-photo-editing{
              // border:2px dashed red;
              display:flex;
              align-items: center;
              gap:5px;
            }
            .cta {
              width: 100%;
              justify-content: center;
              font-size:.7rem !important;
            }
          }
        }
      }
    }
  }

</style>