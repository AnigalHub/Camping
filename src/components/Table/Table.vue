<template>
  <div class="content">
    <v-table fixed-header striped="even" ref="tableRef">
      <thead ref="theadRef">
        <template v-for="(headerRow, rowIndex) in headers" :key="rowIndex">
          <tr>
            <th v-for="(col, colIndex) in headerRow" :key="colIndex" :colspan="col.colspan || 1"
              :rowspan="col.rowspan || 1" class="text-center" :style="col.key === 'buttons' ?
                { width: '40px' } :
                { width: columnWidths[colIndex] + 'px' }">
              {{ col.label }}
            </th>
          </tr>
        </template>
      </thead>
      <tbody ref="tbodyRef">
        <tr v-for="(item, index) in paginatedItems" :key="index">
          <td v-for="(col, colIndex) in flatColumns" :key="colIndex" :data-label="col.label" :class="[
            col.key === 'fio' || col.key === 'document' ? 'text-left' : 'text-center',
            col.key === 'buttons' ? 'bg-buttons' : ''
          ]">
            <template v-if="col.key === 'fio'">
              <div class="fio-wrapper">
                <span>{{ item.surname }}</span>
                <span>{{ item.name }}</span>
                <span>{{ item.patronymic }}</span>
              </div>
            </template>
            <template v-else-if="col.key === 'date'">
              {{ formatDate(item.date) }}
            </template>
            <template v-else-if="col.key === 'dateStay'">
              <div class="date-range">
                <span>{{ formatDate(item.startDate) }}</span>
                <span class="date-line">—</span>
                <span>{{ formatDate(item.endDate) }}</span>
              </div>
            </template>
            <template v-else-if="col.key === 'phone'">
              {{
                item.phone?.replace(
                  /^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
                  "$1($2)$3-$4-$5"
                ) || "—"
              }}
            </template>
            <template v-else-if="col.key === 'price'">
              {{ item.price?.toLocaleString("ru-RU") || "—" }}
            </template>
            <template v-else-if="col.key === 'document'">
              <div class="document-blocks">
                <div>{{ item.seriesDocument }}</div>
                <div>{{ item.numberDocument }}</div>
              </div>
              <div>{{ item.codeDocument }}</div>
              <div>{{ formatDate(item.dateDocument) }}</div>
              <div>
                {{
                  item.issuedDocument?.length > 20
                    ? item.issuedDocument.slice(0, 20) + "..."
                    : item.issuedDocument
                }}
              </div>
              <div>{{ item.cityDocument }}</div>
            </template>
            <template v-else-if="typeof item[col.key] === 'boolean'">
              <Switch v-model="item[col.key]" :tumbler="item[col.key]" />
            </template>
            <template v-else-if="showButtons && col.key === 'buttons'">
              <div class="buttons-wrapper">
                <v-btn icon="mdi-file-document" variant="text" size="small" class="document-btn btn"
                  v-tooltip:top="'Документы'" @click="onModalDocuments('documents', item, true)" />
                <v-btn icon="mdi-pencil" variant="text" size="small" class="edit-btn btn" v-tooltip:top="'Изменить'"
                  @click="onModalDocuments('edit', item)" />
                <v-btn icon="mdi-delete" variant="text" size="small" class="delete-btn btn" v-tooltip:top="'Удалить'"
                  @click="onModalDocuments('delete', item, true)" />
              </div>
            </template>
            <template v-else>
              {{ item[col.key] ?? "—" }}
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-if="isDesktop" class="pagination">
      <v-btn icon="mdi-chevron-left" variant="text" size="small" class="pagination-btn" v-tooltip:top="'Предыдущие'"
        :disabled="currentPage === 1" @click="prevPage"  >
      </v-btn>
      <v-text-field v-model.number="inputPage" @keyup.enter="goToPage" type="number" :min="1" :max="totalPages"
        class="page-input" hide-details density="compact" />
      <span class="page-info">из {{ totalPages }}</span>
      <v-btn icon="mdi-chevron-right" variant="text" size="small" class="pagination-btn" v-tooltip:top="'Следующие'"
        :disabled="currentPage === totalPages" @click="nextPage">
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import Switch from "../Switch/Switch.vue";
import { callModalWindow } from "../../utils/callModalWindow";
import { loadComponent } from "../../utils/loadComponent";
import { useStore } from "vuex";

const props = defineProps({ headers: Array, items: Array });
const store = useStore();
const Information = shallowRef(loadComponent("Information"));

const tableRef = ref(null);
const tbodyRef = ref(null);
const columnWidths = ref({});

// Вычисляем все колонки и наличие кнопок
const flatColumns = computed(() => props.headers.flatMap(row => row.filter(col => col.key)));
const showButtons = computed(() => props.headers.some(row => row.some(col => col.key === "buttons")));

// Форматирование даты
const formatDate = date => date ? date.split("T")[0].split("-").reverse().join(".") : "—";

// Пагинация
const currentPage = ref(1);
const pageSize = 10;
const inputPage = ref(currentPage.value);

const totalPages = computed(() => Math.ceil(props.items.length / pageSize));
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return props.items.slice(start, start + pageSize);
});
watch(currentPage, val => inputPage.value = val);

const prevPage = () => currentPage.value > 1 && currentPage.value--;
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++;
const goToPage = () => {
  if (inputPage.value < 1) inputPage.value = 1;
  if (inputPage.value > totalPages.value) inputPage.value = totalPages.value;
  currentPage.value = inputPage.value;
};

// Модальное окно
const onModalDocuments = async (name, object, disable) => {
  await callModalWindow(store, { name: "Information", component: Information, props: { name, object, disable } });
};

// Ширина колонок
const updateColumnWidths = () => {
  nextTick(() => {
    const tbody = tbodyRef.value;
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll("tr"));
    if (!rows.length) return;

    const colCount = rows[0].children.length;
    const widths = Array(colCount).fill(0);

    rows.forEach(row => {
      Array.from(row.children).forEach((cell, index) => {
        const w = cell.scrollWidth;
        if (w > widths[index]) widths[index] = w;
      });
    });

    columnWidths.value = Object.fromEntries(widths.map((w, i) => [i, w]));
  });
};

// Отслеживаем ресайз и обновление данных
const windowWidth = ref(window.innerWidth);
const isDesktop = computed(() => windowWidth.value >= 1200);

const handleResize = () => windowWidth.value = window.innerWidth;

onMounted(() => {
  updateColumnWidths();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => window.removeEventListener("resize", handleResize));
watch(() => props.items, updateColumnWidths, { deep: true });
</script>

<style>
.page-input .v-field__slot {
  padding: 0 !important;
}

.page-input .v-field__input {
  padding: 0 !important;
  text-align: center;
}

.pagination .v-input--density-compact .v-field--no-label {
  margin-top: -5px !important;
}
</style>

<style scoped>
.page-input {
  width: 40px;
  height: 30px;
  min-width: 40px;
  min-height: 30px;
  margin-top: -5px;
  margin: 0;
  padding: 0;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 5px;
  right: 10px;
}

.pagination-btn {
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  border-radius: 50%;
  background-color: #6c92a4;
  color: #fff;
  box-shadow: none !important;
}

.pagination-btn:hover {
  background-color: #5d7c8a;
}

.pagination-btn:disabled {
  background-color: rgb(170, 201, 246);
  color: #fff;
}

.page-info {
  font-weight: 500;
  color: #104155;
}

.date-line {
  display: none;
}

.buttons-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.v-table tbody td {
  font-size: 1rem;
}

.button-label {
  display: none;
  font-size: 0.85rem;
  font-weight: 500;
  color: #000;
  margin-top: 2px;
}

.fio-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  line-height: 1.3;
}

.date-range {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.document-blocks {
  display: flex;
}

.bg-buttons {
  background: var(--background-btn-block-table);
  min-width: 88px;
}

.icons {
  width: var(--svg-table);
  height: var(--svg-table);
  margin: 0 5px;
  cursor: pointer;
}

/* --- Заголовки и таблица --- */
.v-table>.v-table__wrapper>table>thead>tr>th {
  height: 20px !important;
  background: #fff !important;
  color: #104155;
  -webkit-text-stroke: .2px #104155;
  font-size: 1rem;
  letter-spacing: .4px;
  font-family: var(--font-family-text);
  font-weight: 500;
  padding: 16px 0 !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3), 2px 2px 8px rgba(17, 44, 18, 0.1) !important;
  user-select: none;
  cursor: pointer;
}

.v-table>.v-table__wrapper>table>thead>tr>th:first-child {
  border-radius: 15px 0 0 0 !important;
}

.v-table>.v-table__wrapper>table>thead>tr>th:last-child {
  border-radius: 0 15px 0 0 !important;
}

.v-table>.v-table__wrapper>table>tbody>tr:first-child>td {
  border-top: none !important;
}

.v-table>.v-table__wrapper>table>tbody>tr>td {
  padding: 3px 8px;
}

.v-table .v-table__wrapper>table>tbody>tr>td,
.v-table .v-table__wrapper>table>tbody>tr>th {
  /** добавить переменную */
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even) {
  background: var(--background-even-tr-table);
}

.v-table {
  backdrop-filter: var(--filter-background-table);
  -webkit-backdrop-filter: var(--filter-background-table);
  background: var(--background-table) !important;
  border-radius: var(--border-radius-table) !important;
  height: 90% !important;
  transition: all 0.25s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);

}

.v-table>.v-table__wrapper>table>tbody>tr:hover {
  background: var(--background-tr-table-hover) !important;
}

/* --- Адаптив под карточки --- */
@media (max-width: 1200px) {
  .v-table {
    margin: 0;
  }

  .content {
    padding: 0;
    background: transparent !important;
    box-shadow: none !important;
  }

  .date-line {
    display: block;
  }

  .buttons-wrapper {
    width: 100%;
    gap: 10px;
  }

  .v-table tbody td.bg-buttons {
    justify-content: center;
    padding-top: 15px !important;
    background: transparent;
    border-bottom: none !important;
  }

  .fio-wrapper {
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    gap: 6px;
    flex-wrap: wrap;
  }

  .v-table>.v-table__wrapper {
    overflow: visible !important;
  }

  .v-table thead {
    display: none;
  }

  .v-table tbody {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 0 20px 0 !important;
  }

  /** добавить переменные */
  .v-table tbody tr {
    display: flex;
    flex-direction: column;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)) !important;
    border-radius: 15px;
    padding: 16px 18px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .v-table tbody td {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 6px 0;
  }

  .v-table tbody td::before {
    content: attr(data-label);
    font-weight: 500;
    color: var(--color-th-table);
  }

  .date-range {
    justify-content: flex-end;
    flex-direction: row;
    text-align: right;
    gap: 6px;
  }

  .v-table>.v-table__wrapper>table>tbody>tr>td {
    padding: 5px;
    height: auto !important;
    text-align: right !important;
  }
}

@media (max-width: 600px) {
  .buttons-wrapper {
    width: 100%;
    gap: 8px;
  }

  .button-label {
    font-weight: 500;
    font-size: 0.9rem;
  }

  .fio-wrapper {
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    gap: 6px;
    flex-wrap: wrap;
  }

  .v-table tbody {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 10px;
  }

  .v-table tbody tr {
    padding: 8px 10px;
    border-radius: 12px;
  }

  .v-table tbody td {
    text-align: left;
    font-size: 0.95rem;
    padding: 4px 0;
  }

  .date-range {
    font-size: 0.85rem;
    gap: 4px;
  }
}

.btn {
  opacity: 0.65;
  transition: 0.2s;
  margin-top: -2px;
  border-radius: 50%;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.15);
  color: #fff;
}

.delete-btn {
  color: #c0392b;
  border: 1.7px solid #c0392b;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.edit-btn {
  color: #547c8f;
  border: 1.7px solid #547c8f;
}

.edit-btn:hover {
  background-color: #547c8f;
}

.document-btn {
  color: #6f9233;
  border: 1.7px solid #6f9233;
}

.document-btn:hover {
  background-color: #6f9233;
}
</style>
