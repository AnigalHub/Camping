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
          :class="[col.key === 'fio' ||  col.key === 'document' ? 'text-left' : 'text-center', col.key === 'buttons' ? 'bg_buttons' : '']">
          <template v-if="col.key === 'date' && item[col.key]">
            {{ formatDate(item[col.key]) }}
          </template>
          <template v-else-if="col.key === 'dateStay'">
            <div>с {{ formatDate(item.startDate) }}</div>
            <div>по {{ formatDate(item.endDate) }}</div>
          </template>
          <template v-else-if="col.key === 'fio'">
            <div>{{ item.surname }}</div>
            <div>{{ item.name }}</div>
            <div>{{ item.patronymic }}</div>
          </template>
          <template v-else-if="col.key === 'phone' && item[col.key]">
            {{ item[col.key].replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1($2)$3-$4-$5') }}
          </template>
          <template v-else-if="col.key === 'price' && item[col.key]">
            {{ item[col.key].toLocaleString('ru-RU') }}
          </template>
          <template v-else-if="col.key === 'document'" >
            <div class="document_blocks">
              <div>{{ item.seriesDocument }}</div>
              <div>{{ item.numberDocument }}</div>
            </div>
            <div class="document_blocks">
              <div>{{ item.codeDocument }}</div>
              <div>{{ formatDate(item.dateDocument) }}</div>
            </div>
            <div class="document_block">
               {{ item.issuedDocument.length > 20 ? item.issuedDocument.slice(0, 20) + '...' : item.issuedDocument }}
            </div>
            <div class="document_block">{{ item.cityDocument }}</div>
          </template>

          <template v-else-if="item[col.key] === true || item[col.key] === false">
            <v-switch v-model="item[col.key]" :disabled="true"
              :class="item[col.key] ? 'custom-switch--true' : 'custom-switch--false'"></v-switch>
          </template>
          <template v-else-if="showButtons && col.key === 'buttons'">
            <component :is="editSvg" />
            <component :is="deleteSvg" />
          </template>
          <template v-else>
            {{ item[col.key] ?? '—' }}
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
  console.log('----', dateStr.split('T')[0].split('-').reverse().join('.'));
  return dateStr ? dateStr.split('T')[0].split('-').reverse().join('.') : null;
}
</script>

<style>
.custom-switch--true .v-switch__thumb {
  background-color: #87bd23 !important;
}

.v-switch__track,
.v-switch__thumb {
  border: 1px solid #000;
}


.v-table {
  padding: 10px;
  font-size: 1rem;
  border-radius: 15px !important;
}

tbody,
thead {
  border-radius: 15px !important;
}

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
</style>
<style scoped>
.document_blocks {
  display: flex;
}

.document_blocks div, .document_block {
  margin: 5px 10px 6px 0;
}

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

.v-table>.v-table__wrapper>table>tbody>tr>td {
  font-size: 1.2;
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
  border: 2.5px solid white;
  font-size: 1.2rem;
  font-family: "El Messiri", sans-serif;
  font-weight: 500;
  box-shadow: none !important;
  padding: 15px 5px !important;
}

.no_shadow {
  box-shadow: none !important;
}

.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even) {
  background: rgba(138, 181, 57, 0.08);
}
.v-table > .v-table__wrapper > table > tbody > tr > td{
  padding: 0 5px;
}

.v-switch.v-input {
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
}
</style>