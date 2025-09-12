<template>
  <div class="block_table">
    <v-table fixed-header striped="even">
      <thead>
        <template v-for="(headerRow, rowIndex) in headers" :key="rowIndex">
          <tr>
            <th
              v-for="(col, colIndex) in headerRow"
              :key="colIndex"
              :colspan="col.colspan || 1"
              :rowspan="col.rowspan || 1"
              class="text-center"
              :style="{ cursor: col.sortable ? 'pointer' : 'default' }"
              @click="col.sortable && sortByColumn(col.key)"
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                "
              >
                <span>{{ col.label }}</span>
                <!-- Иконки сортировки SVG -->
                <div
                  v-if="col.sortable"
                  style="display: flex; flex-direction: column"
                >
                  <svg
                    :fill="
                      sortKey === col.key && sortDirection === 'asc'
                        ? activeColor
                        : inactiveColor
                    "
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 8l-6 6h12l-6-6z" />
                  </svg>
                  <svg
                    style="margin-top: -9px"
                    :fill="
                      sortKey === col.key && sortDirection === 'desc'
                        ? activeColor
                        : inactiveColor
                    "
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
          <td
            v-for="(col, colIndex) in flatColumns"
            :key="colIndex"
            :data-label="col.label"
            :class="[
              col.key === 'fio' || col.key === 'document'
                ? 'text-left'
                : 'text-center',
              col.key === 'buttons' ? 'bg_buttons' : '',
            ]"
          >
            <!-- Форматирование ФИО -->
            <template v-if="col.key === 'fio'">
              <div class="fio-wrapper">
                <span>{{ item.surname }}</span>
                <span>{{ item.name }}</span>
                <span>{{ item.patronymic }}</span>
              </div>
            </template>

            <!-- Форматирование даты -->
            <template v-else-if="col.key === 'date' && item[col.key]">
              {{ formatDate(item[col.key]) }}
            </template>

            <!-- Форматирование диапазона дат -->
            <template v-else-if="col.key === 'dateStay'">
              <div class="date-range">
                <span>{{ formatDate(item.startDate) }}</span>
                <span class="date_line">—</span>
                <span>{{ formatDate(item.endDate) }}</span>
              </div>
            </template>

            <!-- Телефон -->
            <template v-else-if="col.key === 'phone' && item[col.key]">
              {{
                item[col.key].replace(
                  /^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
                  "$1($2)$3-$4-$5"
                )
              }}
            </template>

            <!-- Цена -->
            <template v-else-if="col.key === 'price' && item[col.key]">
              {{ item[col.key].toLocaleString("ru-RU") }}
            </template>

            <!-- Документы -->
            <template v-else-if="col.key === 'document'">
              <div class="document_blocks">
                <div>{{ item.seriesDocument }}</div>
                <div>{{ item.numberDocument }}</div>
              </div>
              <div>{{ item.codeDocument }}</div>
              <div>{{ formatDate(item.dateDocument) }}</div>
              <div>
                {{
                  item.issuedDocument.length > 20
                    ? item.issuedDocument.slice(0, 20) + "..."
                    : item.issuedDocument
                }}
              </div>
              <div>{{ item.cityDocument }}</div>
            </template>

            <!-- Булевы значения (переключатель) -->
            <template
              v-else-if="item[col.key] === true || item[col.key] === false"
            >
              <Switch v-model="item[col.key]" :tumbler="item[col.key]" />
            </template>

            <!-- Кнопки -->
           <!-- Кнопки -->
<template v-else-if="showButtons && col.key === 'buttons'">
  <div class="buttons-wrapper">
    <div class="button-item documents" @click="onModalDocuments('documents', item, true)">
      <component
        :is="documentSvg"
        class="icons"
        v-tooltip:top="'Документы'"
      />
      <span class="button-label">Документы</span>
    </div>

    <div class="button-item edit" @click="onModalDocuments('edit', item)">
      <component
        :is="editSvg"
        class="icons"
        v-tooltip:top="'Изменить'"
      />
      <span class="button-label">Изменить</span>
    </div>

    <div class="button-item delete" @click="onModalDocuments('delete', item, true)">
      <component
        :is="deleteSvg"
        class="icons"
        v-tooltip:top="'Удалить'"
      />
      <span class="button-label">Удалить</span>
    </div>
  </div>
</template>


            <!-- По умолчанию -->
            <template v-else>
              {{ item[col.key] ?? "—" }}
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { computed, ref, shallowRef } from "vue";
import Switch from "../Switch/Switch.vue";
import delete_svg from "./../../svg/delete.vue";
import edit_svg from "./../../svg/edit.vue";
import document_svg from "./../../svg/document.vue";
import { callModalWindow } from "./../../utils/callModalWindow";
import { loadComponent } from "./../../utils/loadComponent";
import { useStore } from "vuex";

const Information = shallowRef(loadComponent("Information"));
const store = useStore();

const deleteSvg = shallowRef(delete_svg);
const editSvg = shallowRef(edit_svg);
const documentSvg = shallowRef(document_svg);

const activeColor = "#4d672c";
const inactiveColor = "#ccc";

const props = defineProps({
  headers: Array,
  sortByKey: String,
  sortByDirection: { type: String, default: "asc" },
  items: Array,
});

const sortKey = ref(props.sortByKey);
const sortDirection = ref(props.sortByDirection);

function compareMultipleFields(a, b) {
  const fields = ["surname", "name", "patronymic"];
  for (const field of fields) {
    const cmp = (a[field] || "").localeCompare(b[field] || "");
    if (cmp !== 0) return cmp;
  }
  return 0;
}

const sortedItems = computed(() => {
  if (!sortKey.value) return props.items;
  const sorted = [...props.items].sort((a, b) => {
    if (sortKey.value === "fio") return compareMultipleFields(a, b);
    if (sortKey.value === "date") return new Date(b.date) - new Date(a.date);
    if (sortKey.value === "dateStay")
      return new Date(b.endDate) - new Date(a.endDate);
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];
    return String(aVal || "").localeCompare(String(bVal || ""));
  });
  return sortDirection.value === "asc" ? sorted : sorted.reverse();
});

const flatColumns = computed(() => {
  return props.headers.flatMap((row) => row.filter((col) => col.key));
});

const showButtons = computed(() =>
  props.headers.some((row) => row.some((col) => col.key === "buttons"))
);

function sortByColumn(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
}

function formatDate(dateStr) {
  return dateStr ? dateStr.split("T")[0].split("-").reverse().join(".") : "—";
}

async function onModalDocuments(name, object, disable) {
  await callModalWindow(store, {
    name: "Information",
    component: Information,
    props: { name, object, disable },
  });
}
</script>

<style scoped>
.date_line {
  display: none;
}

/* --- Базовые стили --- */
.buttons-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.button-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  font-family: var(--font-family-main);
  position: relative;
 transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  color: #000;
  -webkit-text-stroke: .45px #000;
}

.button-item:hover {
  background: rgba(138, 181, 57, 0.1);
  transform: scale(1.02);
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
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}

.document_blocks {
  display: flex;
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

/* --- Заголовки и таблица --- */
.v-table > .v-table__wrapper > table > thead > tr > th {
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

.v-table > .v-table__wrapper > table > tbody > tr:first-child > td {
  border-top: none !important;
}

.v-table > .v-table__wrapper > table > tbody > tr > td {
  padding: 0 8px;
}

.v-table .v-table__wrapper > table > tbody > tr > td,
.v-table .v-table__wrapper > table > tbody > tr > th {
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.v-table.v-table--striped-even
  > .v-table__wrapper
  > table
  > tbody
  > tr:nth-child(even) {
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

.v-table > .v-table__wrapper > table > tbody > tr:hover {
  background: var(--background-tr-table-hover);
}

/* --- Адаптив под карточки --- */
@media (max-width: 1100px) {
  .button-item.documents, .button-item.edit, .button-item.delete {
  border: .5px solid #4d672c;
}
.v-table {
  margin: 0;
}

.block_table {
    padding: 0;
    background: transparent !important; 
    box-shadow: none !important; 
}

  .date_line {
    display: block;
  }

  .buttons-wrapper {
    width: 100%;
    gap: 10px;
  }

  .button-item {
    flex-direction: row; /* ✅ иконка + текст рядом */
    border-radius: 8px;
    padding: 8px;
    justify-content: center;
  }

  .button-label {
    display: inline;
     margin-left: 6px;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .v-table tbody td.bg_buttons {
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

  .v-table > .v-table__wrapper {
    overflow: visible !important;
  }

  .v-table thead {
    display: none;
  }

  .v-table tbody {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    padding: 0 20px 20px 0 !important;
  }

  .v-table tbody tr {
    display: flex;
    flex-direction: column;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.8)) !important;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);
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
    font-weight: 600;
    color: var(--color-th-table, #555);
  }

  .date-range {
    justify-content: flex-end;
    text-align: right;
    gap: 6px;
  }

  .v-table > .v-table__wrapper > table > tbody > tr > td {
    padding: 5px;
    height: auto !important;
  }
}

/* --- Мобильная версия --- */
@media (max-width: 600px) {
  .buttons-wrapper {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }

  .button-item {
    width: 100%;
    flex: none;
    flex-direction: row;
    border-radius: 8px;
    padding: 6px;
    justify-content: center;
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
    font-size: 0.8rem;
    padding: 4px 0;
  }

  .date-range {
    font-size: 0.85rem;
    gap: 4px;
  }
}
</style>
