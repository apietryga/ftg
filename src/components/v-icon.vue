<template>
  <i class="mdi" :class="`mdi-${props.icon}`"></i>
</template>

<script setup lang="ts">

  import { defineProps } from 'vue'

  const props = defineProps({
    icon: { required: true }
  })

</script>

<style>
  .material-symbols-outlined{
    color: var(--color-button);
  }
</style>