<template>
  <div class="content">
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
            >
              {{ col.label }}
            </th>
          </tr>
        </template>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td
            v-for="(col, colIndex) in flatColumns"
            :key="colIndex"
            :data-label="col.label"
            :class="[
              col.key === 'fio' || col.key === 'document' ? 'text-left' : 'text-center',
              col.key === 'buttons' ? 'bg-buttons' : ''
            ]"
          >
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
                <v-btn icon="mdi-file-document" variant="text" size="small"
                  class="document-btn btn" v-tooltip:top="'Документы'"
                  @click="onModalDocuments('documents', item, true)" />
                <v-btn icon="mdi-pencil" variant="text" size="small"
                  class="edit-btn btn" v-tooltip:top="'Изменить'"
                  @click="onModalDocuments('edit', item)" />
                <v-btn icon="mdi-delete" variant="text" size="small"
                  class="delete-btn btn" v-tooltip:top="'Удалить'"
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
  </div>
</template>

<script setup>
import { computed, shallowRef } from "vue";
import Switch from "../Switch/Switch.vue";
import { callModalWindow } from "./../../utils/callModalWindow";
import { loadComponent } from "./../../utils/loadComponent";
import { useStore } from "vuex";

const props = defineProps({
  headers: Array,
  items: Array
});

const store = useStore();
const Information = shallowRef(loadComponent("Information"));

const flatColumns = computed(() =>
  props.headers.flatMap((row) => row.filter((col) => col.key))
);

const showButtons = computed(() =>
  props.headers.some((row) => row.some((col) => col.key === "buttons"))
);

function formatDate(date) {
  return date ? date.split("T")[0].split("-").reverse().join(".") : "—";
}

async function onModalDocuments(name, object, disable) {
  await callModalWindow(store, {
    name: "Information",
    component: Information,
    props: { name, object, disable }
  });
}
</script>

<style scoped>
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
  font-size: .92rem;
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
  height: 98% !important;
  transition: all 0.25s ease;
}

.v-table>.v-table__wrapper>table>tbody>tr:hover {
  background: var(--background-tr-table-hover) !important;
}

/* --- Адаптив под карточки --- */
@media (max-width: 1100px) {
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
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    padding: 0 5px 20px 0 !important;
  }

  /** добавить переменные */
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
    font-size: 0.8rem;
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
  margin-left: 2.5px;
  margin-top: -2px;
  border-radius: 10px;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.15);
}

.delete-btn {
  color: #c0392b;
  border: 1.7px solid #c0392b;
}

.delete-btn:hover {
  background-color: #f7f2f1;
}

.edit-btn {
  color: #547c8f;
  border: 1.7px solid #547c8f;
}

.edit-btn:hover {
  background-color: #e9eff9;
}

.document-btn {
  color: #6f9233;
  border: 1.7px solid #6f9233;
}

.document-btn:hover {
  background-color: #ebfbe9;
}
</style>
