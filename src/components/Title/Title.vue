<template>
  <div class="block_title">
    <ButtonBack />
    <div>
      <h1 class="text-center">{{ title }}</h1>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
});
</script>
<style scoped>
.block_title{
  display: flex;
  align-items: center;
  margin-top: .7rem;
  margin-bottom: .2rem;
}
</style>
