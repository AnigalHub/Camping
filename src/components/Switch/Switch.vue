<template>
  <v-switch 
    :disabled="disable"
    :class="tumbler ? (form ? 'custom-switch--true-form' : 'custom-switch--true') : 'custom-switch--false'">
  </v-switch>
</template>

<script setup>
const props = defineProps({
  tumbler: {
    type: Boolean,
    default: () => false,
  },
  disable: {
    type: Boolean,
    default: () => true,
  },
  form: {
    type: Boolean,
    default: () => false,
  }
})
</script>
<style>
.custom-switch--true .v-switch__thumb {
  background-color: var(--background-active-switch) !important;
}

.custom-switch--true-form .v-switch__thumb {
  background-color: #78a0b2 !important;
}

.v-switch__track,
.v-switch__thumb {
  border: var(--border-switch) var(--border-color-switch) !important;
  background-color: #ccc !important;
}
</style>

<style scoped>
.v-switch__thumb {
  width: 18px !important;
  height: 18px !important;
}

.v-switch.v-input {
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
}
</style>