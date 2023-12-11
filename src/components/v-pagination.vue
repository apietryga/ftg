<template>
  <nav class="pagination">
    <ul>
      <li class="static prev" :class="{ disabled: pagination?.page == 1}" @click="changePage(-1)">
        <v-icon icon="chevron-double-left" />
      </li>
      <template v-for="page in pagination?.total_pages" :key="'page_' + page">
        <li @click="emit('changePage', page)" :class="{ active: page == pagination.page}">
          {{ page }}
        </li>
      </template>
      <li class="static next" :class="{ disabled: pagination?.page == pagination?.total_pages }" @click="changePage(1)">
        <v-icon icon="chevron-double-right" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>

  import vIcon from '@/components/v-icon.vue'
  import { defineProps, defineEmits } from "vue"

  const { pagination } = defineProps(['pagination'])
  const emit = defineEmits(['changePage'])

  function changePage(changingBy: number): void {
    let page = pagination?.page || 0
    page += changingBy
    emit('changePage', page)
  }

</script>

<style lang="scss" scoped>

  .pagination ul {

    list-style:none;
    padding:0;
    display:flex;
    align-items: stretch;

    li {
      background-color: var(--color-background-light);
      border:1px solid var(--color-border);
      cursor:pointer;
      color: var(--color-success);
      font-size:0.8rem;
      padding:.4rem .8rem;
      &.active {
        background-color: var(--color-success);
        color: var(--color-text-light);
      }
      &.static {
        &.disabled {
          cursor:not-allowed;
          pointer-events: none;
          opacity:0.5;
        }
        &.next {
          border-radius:0 5px 5px 0;
        }
        &.prev{
          border-radius:5px 0 0 5px;
        }
      }
    }
    
  }

</style>