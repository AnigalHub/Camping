<template>
  <div class="page">
    <v-container>
      <div style="display: flex; align-items: center; margin-top: .7rem; margin-bottom: .2rem;">
        <ButtonBack />
        <div>
          <h1 class="text-center">Ближайшие выезды</h1>
        </div>
      </div>
      <v-card style="min-height: 85vh;">
        <v-tabs v-model="tab" grow>
          <v-tab v-for="item in tabs" :key="item" :text="item" :value="item"
            :class="{ 'active-tab': tab === item, 'inactive-tab': tab !== item }">
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">

          <v-tabs-window-item v-for="item in tabs" :key="item" :text="item" :value="item">
            <div v-if="filteredItems.length !== 0">
              <Table :headers="headers" :items="filteredItems" sortByKey="fio" />
            </div>
            <div v-else style="padding: 15px;" class="content">
              Данных за день нет.
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { shallowRef } from 'vue';
import { computed } from 'vue';

defineOptions({
  name: 'Trips'
})

function get7Days() {
  const result = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const day = String(nextDate.getDate()).padStart(2, '0');
    const month = String(nextDate.getMonth() + 1).padStart(2, '0'); // месяцы от 0 до 11
    const year = nextDate.getFullYear();

    result.push(`${day}.${month}.${year}`);
  }

  return result;
}

const tabs = get7Days();
const tab = shallowRef(tabs[0]);

//Фильтрация данных по endDate (конечным датам выезда)
const filteredItems = computed(() => {
  const currentDateStr = tab.value;
  const filtered = items.filter(item => {
    const endDate = new Date(item.endDate);
    const day = String(endDate.getDate()).padStart(2, '0');
    const month = String(endDate.getMonth() + 1).padStart(2, '0');
    const year = endDate.getFullYear();

    const endDateStr = `${day}.${month}.${year}`;
    return endDateStr === currentDateStr;
  });

  // сортируем по endDate по возрастанию
  return filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
})


// Заголовки 
const headers = [
  [
    { label: 'ФИО', rowspan: 2, key: 'fio', sortable: true },
    { label: 'Номер телефона', rowspan: 2, key: 'phone' },
    { label: 'Проживание', rowspan: 2, key: 'dateStay', sortable: true },
    { label: 'Аренда домика', rowspan: 2, key: 'house', sortable: true },
    { label: 'Транспорт', rowspan: 2, key: 'cars', sortable: true },
    { label: 'Животные', rowspan: 2, key: 'animals', sortable: true },
    { label: 'Поляна', rowspan: 2, key: 'object', sortable: true },
    { label: 'Стоимость', rowspan: 2, key: 'price', sortable: true },
    { label: '', key: 'buttons' },
  ],
]
// Содержимое таблицы
const items = [
  {
    surname: 'Иванов',
    name: 'Константин',
    patronymic: 'Иванович',
    date: '1971-08-15T00:00:00.000+00:00',
    seriesDocument: '4511',
    numberDocument: '278534',
    codeDocument: '770-089',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Отрадное',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1971-09-15T00:00:00.000+00:00',
    phone: '+79039004578',
    startDate: '2025-11-01T00:00:00.000+00:00',
    endDate: '2025-11-03T00:00:00.000+00:00',
    house: false,
    object: 7,
    cars: 'Х765СС750',
    animals: 2,
    price: 2500,
  },
  {
    surname: 'Алексеева',
    name: 'Мария',
    patronymic: 'Павловна',
    date: '1980-04-14T00:00:00.000+00:00',
    seriesDocument: '4518',
    numberDocument: '364363',
    codeDocument: '770-087',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Гольяново',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1980-05-15T00:00:00.000+00:00',
    phone: '+79068124233',
    startDate: '2025-10-20T00:00:00.000+00:00',
    endDate: '2025-10-28T00:00:00.000+00:00',
    house: false,
    object: 1,
    cars: null,
    animals: 0,
    price: 5000,
  },
  {
    surname: 'Алексеев',
    name: 'Артем',
    patronymic: 'Викторович',
    date: '2000-08-18T00:00:00.000+00:00',
    phone: '+79501674030',
    seriesDocument: '4512',
    numberDocument: '255634',
    codeDocument: '770-089',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Медведково',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '2000-09-21T00:00:00.000+00:00',
    startDate: '2025-10-22T00:00:00.000+00:00',
    endDate: '2025-10-29T00:00:00.000+00:00',
    house: false,
    cars: 'Н122АК150',
    object: 3,
    animals: 1,
    price: 1500,
  },
  {
    surname: 'Романова',
    name: 'Татьяна',
    patronymic: 'Александровна',
    date: '1999-08-21T00:00:00.000+00:00',
    phone: '+79251542184',
    seriesDocument: '4513',
    numberDocument: '274242',
    codeDocument: '770-082',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Перово',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1999-08-23T00:00:00.000+00:00',
    startDate: '2025-10-25T00:00:00.000+00:00',
    endDate: '2025-10-30T00:00:00.000+00:00',
    cars: null,
    house: true,
    object: 2,
    animals: 1,
    price: 7500,
  },
  {
    surname: 'Петров',
    name: 'Илья',
    patronymic: 'Павлович',
    date: '1986-06-16T00:00:00.000+00:00',
    phone: '+79251445456',
    seriesDocument: '4511',
    numberDocument: '732524',
    codeDocument: '770-083',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Бибирево',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1986-06-15T00:00:00.000+00:00',
    startDate: '2025-10-30T00:00:00.000+00:00',
    endDate: '2025-10-31T00:00:00.000+00:00',
    cars: 'С521КК77',
    house: false,
    object: 2,
    animals: 0,
    price: 3000,
  },
  {
    surname: 'Кузнецов',
    name: 'Роман',
    patronymic: 'Иванович',
    date: '1995-06-07T00:00:00.000+00:00',
    phone: '+79259202678',
    seriesDocument: '4511',
    numberDocument: '622421',
    codeDocument: '770-081',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Отрадное',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1995-07-07T00:00:00.000+00:00',
    startDate: '2025-11-01T00:00:00.000+00:00',
    endDate: '2025-11-03T00:00:00.000+00:00',
    cars: null,
    house: false,
    object: 7,
    animals: 0,
    price: 2500,
  },
  {
    surname: 'Мирзаева',
    name: 'Диана',
    patronymic: 'Сергеевна',
    date: '1993-02-08T00:00:00.000+00:00',
    phone: '+79148816500',
    seriesDocument: '4511',
    numberDocument: '452642',
    codeDocument: '770-088',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Бутово',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1993-03-15T00:00:00.000+00:00',
    startDate: '2025-11-01T00:00:00.000+00:00',
    endDate: '2025-11-02T00:00:00.000+00:00',
    cars: null,
    house: false,
    object: 9,
    animals: 0,
    price: 1500,
  },
  {
    surname: 'Котов',
    name: 'Павел',
    patronymic: 'Юрьевич',
    date: '1992-08-03T00:00:00.000+00:00',
    phone: '+79037260448',
    seriesDocument: '4517',
    numberDocument: '785343',
    codeDocument: '770-082',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Вешняки',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1992-08-11T00:00:00.000+00:00',
    startDate: '2025-11-01T00:00:00.000+00:00',
    endDate: '2025-11-03T00:00:00.000+00:00',
    cars: null,
    house: false,
    object: 4,
    animals: 2,
    price: 1500,
  },
  {
    surname: 'Петухов',
    name: 'Иван',
    patronymic: 'Николаевич',
    date: '1995-03-10T00:00:00.000+00:00',
    phone: '+79688373539',
    seriesDocument: '4518',
    numberDocument: '112255',
    codeDocument: '770-085',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Бирюлево-Восточное',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1995-03-115T00:00:00.000+00:00',
    startDate: '2025-10-30T00:00:00.000+00:00',
    endDate: '2025-10-31T00:00:00.000+00:00',
    cars: null,
    house: true,
    object: 3,
    animals: 0,
    price: 8000,
  },
  {
    surname: 'Арзаева',
    name: 'Кристина',
    patronymic: 'Сергеевна',
    date: '1986-10-11T00:00:00.000+00:00',
    phone: '+79106295047',
    seriesDocument: '4511',
    numberDocument: '865443',
    codeDocument: '770-083',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Измайлово',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1986-10-25T00:00:00.000+00:00',
    startDate: '2025-10-28T00:00:00.000+00:00',
    endDate: '2025-10-29T00:00:00.000+00:00',
    cars: null,
    house: true,
    object: 8,
    animals: 0,
    price: 10000,
  },
  {
    surname: 'Кислов',
    name: 'Петр',
    patronymic: 'Павлович',
    date: '1988-05-12T00:00:00.000+00:00',
    phone: '+79263472779',
    seriesDocument: '4512',
    numberDocument: '241522',
    codeDocument: '770-089',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Новокосино',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1988-05-17T00:00:00.000+00:00',
    startDate: '2025-10-27T00:00:00.000+00:00',
    endDate: '2025-10-30T00:00:00.000+00:00',
    cars: null,
    house: false,
    object: 1,
    animals: 0,
    price: 1000,
  },
  {
    surname: 'Попов',
    name: 'Александр',
    patronymic: 'Михайлович',
    date: '1990-04-10T00:00:00.000+00:00',
    phone: '+79168371011',
    seriesDocument: '4500',
    numberDocument: '200564',
    codeDocument: '770-080',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Рублево',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1990-04-19T00:00:00.000+00:00',
    startDate: '2025-11-01T00:00:00.000+00:00',
    endDate: '2025-11-02T00:00:00.000+00:00',
    cars: null,
    house: true,
    object: 9,
    animals: 1,
    price: 12500,
  },
  {
    surname: 'Михайлов',
    name: 'Аресений',
    patronymic: 'Иванович',
    date: '1991-05-18T00:00:00.000+00:00',
    phone: '+79671335013',
    seriesDocument: '4510',
    numberDocument: '200534',
    codeDocument: '770-081',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Косино',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1991-05-29T00:00:00.000+00:00',
    startDate: '2025-10-30T00:00:00.000+00:00',
    endDate: '2025-11-01T00:00:00.000+00:00',
    cars: null,
    house: false,
    object: 8,
    animals: 0,
    price: 2000,
  },
  {
    surname: 'Уткина',
    name: 'Светлана',
    patronymic: 'Витальевна',
    date: '1994-01-20T00:00:00.000+00:00',
    phone: '+79162493723',
    seriesDocument: '4519',
    numberDocument: '377334',
    codeDocument: '770-087',
    issuedDocument: 'Отделом УФМС России по гор. Москве по району Жулебино',
    cityDocument: 'РОССИЯ, город Москва',
    dateDocument: '1994-03-15T00:00:00.000+00:00',
    startDate: '2025-11-01T00:00:00.000+00:00',
    endDate: '2025-11-02T00:00:00.000+00:00',
    cars: null,
    house: false,
    object: 7,
    animals: 0,
    price: 1500,
  },
]
</script>

<style scoped>
.v-table {
  height: auto !important;
}

.v-window-item,
.v-window-item--active,
.v-tabs-window-item {
  padding: 15px 10px;
}
</style>