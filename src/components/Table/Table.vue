<template>
  <v-table height="50vh" fixed-header striped="even">
    <thead>
      <template v-for="(headerRow, index) in headers" :key="index">
        <tr>
          <th v-for="(col, colIndex) in headerRow" :key="colIndex" :colspan="col.colspan || 1"
            :rowspan="col.rowspan || 1" class="text-center">
            {{ col.label }}
          </th>
        </tr>
      </template>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(col, colIndex) in flatColumns" :key="colIndex"
          :class="['text-center', col.key === 'buttons' ? 'bg_buttons' : '']">
          <template v-if="col.key === 'date' && item[col.key]">
            {{ formatDate(item[col.key]) }}
          </template>
          <template v-else>
            <template v-if="showButtons && col.key === 'buttons'">
              <component :is="editSvg" />
              <component :is="deleteSvg" />
            </template>
            <template v-else>
              {{ item[col.key] ? item[col.key] : '' }}
            </template>
          </template>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import delete_svg from './../../svg/delete.vue'
import edit_svg from './../../svg/edit.vue'
import { computed } from 'vue';
import { shallowRef } from 'vue'
const deleteSvg = shallowRef(delete_svg)
const editSvg = shallowRef(edit_svg)

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const flatColumns = computed(() => {
  const flat = []
  props.headers.forEach(row =>
    row.forEach(col => {
      if (col.key) flat.push(col);
    })
  )
  return flat;
})

const showButtons = computed(() => {
  return props.headers.some(row => row.some(col => col.key === 'buttons'));
})

// Форматирование даты в формат ДД.ММ.ГГГГ
function formatDate(dateStr) {
  return dateStr ? dateStr.split('T')[0].split('-').reverse().join('.') : '';
}
</script>

<style>
.v-table__wrapper {
  padding-right: 30px !important;
}

/* Общий стиль для элементов с прокруткой внутри .v-table__wrapper */
.v-table__wrapper::-webkit-scrollbar {
  width: 8px;
  /* ширина полосы прокрутки */
  height: 8px;
  /* ширина полосы прокрутки */
}

/* Стиль ползунка */
.v-table__wrapper::-webkit-scrollbar-thumb {
  background-color: #8AB539;
  /* желаемый цвет ползунка */
  border-radius: 4px;
}

/* Стиль трека (фон полоски) */
.v-table__wrapper::-webkit-scrollbar-track {
  background-color: #e0e0e0;
  /* цвет фона полоски */
  border: .3px solid #9f9f9f;
  border-radius: 4px;
}

.v-table>.v-table__wrapper>table {
  border: 1px solid rgba(0, 0, 0, .2) !important;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
<style scoped>
.bg_buttons {
  background: rgba(217, 217, 217, 0.24);
}

svg {
  width: 20px;
  height: 20px;
  margin: 0 10px;
  cursor: pointer;
}

.v-table {
  padding: 10px;
  font-size: 1rem;
}

.v-table>.v-table__wrapper>table>tbody>tr:hover,
.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even):hover {
  background: rgba(138, 181, 57, .2);
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
  height: 30px !important;
  background: #F2F2F2 !important;
  color: #3A6210;
  -webkit-text-stroke: .05px #5F8835;
  border: 1.75px solid white;
  padding: 10px !important;
}

.v-table>.v-table__wrapper>table>thead {
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
}

.no_shadow {
  box-shadow: none !important;
}

.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even) {
  background: rgba(138, 181, 57, 0.08);
}
</style>