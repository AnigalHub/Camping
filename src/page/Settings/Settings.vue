<template>
  <v-data-table
    :headers="headers"
    :items="items"
   
    class="my-table"
  >
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Age', value: 'age', sortable: true },
        { text: 'Country', value: 'country', sortable: false },
      ],
      items: [
        { name: 'John', age: 30, country: 'USA' },
        { name: 'Anna', age: 22, country: 'Germany' },
        { name: 'Mike', age: 40, country: 'Canada' }
      ],
    };
  },
};
</script>

<style scoped>
/* Стилизуем заголовки с сортировкой */

/* Заголовки, которые не отсортированы */
.my-table th[aria-sort="none"] {
  background-image: url('data:image/svg+xml,%3csvg ...'); /* ваш SVG */
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 16px;
  padding-right: 24px;
}

/* Заголовки, отсортированные по возрастанию */
.my-table th[aria-sort="ascending"] {
  /* Можно поставить другую иконку или стиль */
}

/* Заголовки, отсортированные по убыванию */
.my-table th[aria-sort="descending"] {
  /* Можно поставить другую иконку или стиль */
}
</style>