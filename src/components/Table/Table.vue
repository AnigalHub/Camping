<template>
  <div class="block_table">
    <v-table fixed-header striped="even">
      <thead>
        <template v-for="(headerRow, rowIndex) in headers" :key="rowIndex">
          <tr>
            <th v-for="(col, colIndex) in headerRow" :key="colIndex" :colspan="col.colspan || 1"
              :rowspan="col.rowspan || 1" class="text-center" :style="{ cursor: col.sortable ? 'pointer' : 'default' }"
              @click="col.sortable && sortByColumn(col.key)">
              <div style="display: flex; align-items: center; justify-content: center; width: 100%;">
                <span>{{ col.label }}</span>
                <!-- Иконки сортировки SVG -->
                <div v-if="col.sortable" style="display: flex; flex-direction: column; ">
                  <svg :fill="sortKey === col.key && sortDirection === 'asc' ? activeColor : inactiveColor" width="15"
                    height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8l-6 6h12l-6-6z" />
                  </svg>
                  <svg style="margin-top: -9px;"
                    :fill="sortKey === col.key && sortDirection === 'desc' ? activeColor : inactiveColor" width="15"
                    height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16l6-6H6l6 6z" />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </template>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedItems" :key="index">
          <td v-for="(col, colIndex) in flatColumns" :key="colIndex" :class="[col.key === 'fio' || col.key === 'document' ? 'text-left' : 'text-center',
          col.key === 'buttons' ? 'bg_buttons' : '']">
            <template v-if="col.key === 'date' && item[col.key]">
              {{ formatDate(item[col.key]) }}
            </template>
            <template v-else-if="col.key === 'dateStay'">
              <div>{{ formatDate(item.startDate) }}</div>
              <div>{{ formatDate(item.endDate) }}</div>
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
            <template v-else-if="col.key === 'document'">
              <div class="document_blocks">
                <div>{{ item.seriesDocument }}</div>
                <div>{{ item.numberDocument }}</div>
              </div>
              <div>{{ item.codeDocument }}</div>
              <div>{{ formatDate(item.dateDocument) }}</div>
              <div>{{ item.issuedDocument.length > 20 ? item.issuedDocument.slice(0, 20) + '...' : item.issuedDocument
              }}
              </div>
              <div>{{ item.cityDocument }}</div>
            </template>
            <template v-else-if="item[col.key] === true || item[col.key] === false">
              <Switch v-model="item[col.key]" :tumbler="item[col.key]" />
            </template>
            <template v-else-if="showButtons && col.key === 'buttons'">
              <component :is="documentSvg" class="icons" v-tooltip:top="'Документы'"
                @click="onModalDocuments('document', item, true)" />
              <component :is="editSvg" class="icons" v-tooltip:top="'Изменить'" @click="onModalDocuments('edit', item)" />
              <component :is="deleteSvg" v-tooltip:top="'Удалить'" class="icons" @click="onModalDocuments('delete', item, true)"/>
            </template>
            <template v-else>
              {{ item[col.key] ?? '—' }}
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { computed, ref, shallowRef } from 'vue';
import Switch from '../Switch/Switch.vue';
import delete_svg from './../../svg/delete.vue';
import edit_svg from './../../svg/edit.vue';
import document_svg from './../../svg/document.vue';

import { callModalWindow } from './../../utils/callModalWindow';
import { loadComponent } from './../../utils/loadComponent';
import { useStore } from 'vuex';

const Information = shallowRef(loadComponent('Information'));
const store = useStore();



const deleteSvg = shallowRef(delete_svg);
const editSvg = shallowRef(edit_svg);
const documentSvg = shallowRef(document_svg);

const activeColor = '#4d672c'; // цвет активной сортировки
const inactiveColor = '#ccc';  // цвет неактивной

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  sortByKey: {
    type: String,
    default: () => null,
  },
  sortByDirection: {
    type: String,
    //asc || desc
    default: () => 'asc',
  },
  items: {
    type: Array,
    default: () => [],
  },
});

// Состояние сортировки
const sortKey = ref(props.sortByKey);
const sortDirection = ref(props.sortByDirection);


// Функция сравнения для нескольких полей
function compareMultipleFields(a, b) {
  const fields = ['surname', 'name', 'patronymic'];

  for (const field of fields) {
    const aVal = a[field];
    const bVal = b[field];

    // Если оба значения - строки, сравниваем по localeCompare
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const cmp = aVal.localeCompare(bVal);
      if (cmp !== 0) return cmp;
    } else {
      const aStr = String(aVal || '');
      const bStr = String(bVal || '');
      const cmp = aStr.localeCompare(bStr);
      if (cmp !== 0) return cmp;
    }
  }
  return 0; // если все поля равны
}

// Вспомогательная переменная для отсортированных элементов
const sortedItems = computed(() => {
  if (!sortKey.value) return props.items;
  const sorted = [...props.items].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];

    if (sortKey.value === 'cars') {
      if (aVal && !bVal) return -1;
      if (!aVal && bVal) return 1;
      if (aVal && bVal) {
        return aVal.localeCompare(bVal);
      }
      return 0;
    }
    if (sortKey.value === 'date') {
      const cVal = a[sortKey.value] ? new Date(a[sortKey.value]) : new Date(0);
      const dVal = b[sortKey.value] ? new Date(b[sortKey.value]) : new Date(0);
      return dVal - cVal;
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal);
    } else if (
      (typeof aVal === 'number' && typeof bVal === 'number') ||
      (typeof aVal === 'boolean' && typeof bVal === 'boolean')
    ) {
      return bVal - aVal;
    } else if (!aVal && !bVal) {
      if (sortKey.value === 'dateStay') {
        const cVal = a.endDate ? new Date(a.endDate) : new Date(0);
        const dVal = b.endDate ? new Date(b.endDate) : new Date(0);
        return dVal - cVal;
      }
      if (sortKey.value === 'fio') {
        return compareMultipleFields(a, b);
      }
    } else if (aVal || bVal) {
      return String(aVal).localeCompare(String(bVal));
    }
    return 0;
  });
  return sortDirection.value === 'asc' ? sorted : sorted.reverse();
});

// Вытягиваем все колонки без заголовков (для данных)
const flatColumns = computed(() => {
  const flat = [];
  props.headers.forEach(row =>
    row.forEach(col => {
      if (col.key) flat.push(col);
    })
  );
  return flat;
});

// Проверяем, есть ли кнопки
const showButtons = computed(() => {
  return props.headers.some(row => row.some(col => col.key === 'buttons'));
});

// Текущая сортируемая колонка
function sortByColumn(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
}

// Форматирование даты
function formatDate(dateStr) {
  return dateStr ? dateStr.split('T')[0].split('-').reverse().join('.') : null;
}

/** Вызов Модального окна*/
async function onModalDocuments(name, object, disable) {
  await callModalWindow(store, {
    name: 'Information',
    component: Information,
    props: {
      name,
      object,
      disable
    },
  });
}
</script>

<style scoped>
.document_blocks {
  display: flex;
}

.document_blocks div {
  margin-right: 8px;
  margin-top: 2.5px;
}

.bg_buttons {
  background: var(--background-btn-block-table);
  min-width: 88px;
}

.icons {
  width: var(--svg-table);
  height: var(--svg-table);
  margin: 0 5px;
  cursor: pointer;
}

.v-table>.v-table__wrapper>table>tbody>tr>td {
  font-size: .94rem;
}

/* Заголовки с сортировкой */
.v-table>.v-table__wrapper>table>thead>tr>th {
  height: 20px !important;
  background: var(--background-th-table) !important;
  color: var(--color-th-table);
  -webkit-text-stroke: var(--text-stroke-th-table);
  border: var(--border-th-table) var(--border-color-th-table) !important;
  font-size: 1rem;
  font-family: var(--font-family);
  font-weight: 500;
  padding: 10px 0 !important;
  box-shadow: var(--box-shadow-th-table);
  user-select: none;
  cursor: pointer;
}

.v-table>.v-table__wrapper>table>tbody>tr:first-child>td {
  border-top: none !important;

}

.v-table>.v-table__wrapper>table>tbody>tr>td {
  padding: 0 8px !important;

}

.v-table>.v-table__wrapper>table>thead>tr>th:first-child {
  border-radius: var(--border-radius-table) 0 0 0 !important;
}

.v-table>.v-table__wrapper>table>thead>tr>th:last-child {
  border-radius: 0 var(--border-radius-table) 0 0 !important;
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th:first-child {
  border-radius: var(--border-radius-table) 0 0 0 !important;
}

.v-table.v-table--fixed-header>.v-table__wrapper>table>thead>tr>th:last-child {
  border-radius: 0 var(--border-radius-table) 0 0 !important;
}

table>tbody>tr:last-child td:last-child {
  border-radius: 0 0 var(--border-radius-table) 0 !important;
}

.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even) {
  background: var(--background-even-tr-table);
}

.v-table {
  backdrop-filter: var(--filter-background-table);
  -webkit-backdrop-filter: var(--filter-background-table);
  background: transparent !important;
  border-radius: var(--border-radius-table) !important;
  margin: 0 10px;
  height: 98% !important;
  transition: all 0.25s ease;
}

.v-table>.v-table__wrapper>table>tbody>tr:hover,
.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even):hover {
  background: var(--background-tr-table-hover);
}
</style>