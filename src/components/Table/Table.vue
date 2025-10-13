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
            </div>
            <div class="document_blocks">
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

.v-switch__thumb{
  width: 18px !important;
  height: 18px !important;
}

tbody,
thead {
  border-radius: 15px !important;
}

.v-table__wrapper {
  padding-right: 30px !important;
}
</style>
<style scoped>
.document_blocks {
  display: flex;
}

.document_blocks div, .document_block {
  margin: 5px 8px 2.5px 0;
}

.bg_buttons {
  background: rgba(217, 217, 217, 0.24);
}

svg {
  width: 15px;
  height: 15px;
  margin: 0 10px;
  cursor: pointer;
}

.v-table>.v-table__wrapper>table>tbody>tr>td {
  font-size: .8rem;
}

.v-table>.v-table__wrapper>table>tbody>tr:hover,
.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even):hover {
  background: rgba(138, 181, 57, .2);
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th {
  height: 20px !important;
  background: #F2F2F2 !important;
  color: #3A6210;
  -webkit-text-stroke: .05px #5F8835;
  border: 2.5px solid white;
  font-size: .8rem;
  font-family:  var(--font-family);
  font-weight: 500;
  padding: 8px 5px !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
  2px 2px 8px rgba(17, 44, 18, 0.1);
}
.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th:first-child {
  border-radius: 10px 0 0 0 !important;
}
.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th:last-child {
  border-radius: 0 10px 0 0 !important;
}
table>tbody>tr:last-child td:last-child{
  border-radius: 0 0 10px 0 !important;
}

.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even) {
  background: rgba(138, 181, 57, 0.08);
}
.v-table > .v-table__wrapper > table > tbody > tr > td{

}

.v-table{
  border-radius: 10px !important;
  margin: 0 10px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: transparent;
  transition: all 0.25s ease;
}

.v-switch.v-input {
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
}
</style>