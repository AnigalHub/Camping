<script>
/**
* Vue-компонент Информация
*/
export default {
  name: 'Information',
  props: {
    title: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<template>
  <div>
    <h6 v-html="title"></h6>
  </div>
</template>

<style scoped lang="scss">
</style>
