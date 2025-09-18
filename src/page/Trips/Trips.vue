<template>
  <div class="page">
    <v-container min-height="97vh">
      <ButtonBack />
      <h1 class="text-center">Ближайшие выезды</h1>
      <v-card>
        <v-tabs v-model="tab" grow>
          <v-tab v-for="item in tabs" :key="item" :text="item" :value="item"
            :class="{ 'active-tab': tab === item, 'inactive-tab': tab !== item }">
          </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item v-for="item in tabs" :key="item" :text="item" :value="item">
            <div v-if="filteredItems.length !== 0" >
              <Table :headers="headers" :items="filteredItems" sortByKey="fio"/>
            </div>
            <div v-else style="padding: 15px;">
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
    { label: 'ФИО', rowspan: 2, key: 'fio' , sortable: true},
    { label: 'Номер телефона', rowspan: 2, key: 'phone' },
    { label: 'Дата проживания', rowspan: 2, key: 'dateStay' , sortable: true},
    { label: 'Аренда домика', rowspan: 2, key: 'house' , sortable: true},
    { label: 'Транспорт', rowspan: 2, key: 'cars' , sortable: true},
    { label: 'Животные', rowspan: 2, key: 'animals' , sortable: true},
    { label: 'Поляна', rowspan: 2, key: 'object', sortable: true},
    { label: 'Стоимость', rowspan: 2, key: 'price' , sortable: true},
    { label: '', key: 'buttons' },
  ],
]
// Содержимое таблицы
const items = [
  {
    surname: 'Иванов',
    name: 'Константин',
    patronymic: 'Иванович',
    phone: '+79039004578',
    startDate: '2025-10-05T00:00:00.000+00:00',
    endDate: '2025-10-14T00:00:00.000+00:00',
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
    phone: '+79068124233',
    startDate: '2025-10-10T00:00:00.000+00:00',
    endDate: '2025-10-15T00:00:00.000+00:00',
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
    phone: '+79501674030',
    startDate: '2025-10-12T00:00:00.000+00:00',
    endDate: '2025-10-15T00:00:00.000+00:00',
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
    phone: '+79251542184',
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
    phone: '+79251445456',
    startDate: '2025-07-05T00:00:00.000+00:00',
    endDate: '2025-07-08T00:00:00.000+00:00',
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
    phone: '+79259202678',
    startDate: '2025-06-06T00:00:00.000+00:00',
    endDate: '2025-06-09T00:00:00.000+00:00',
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
    phone: '+79148816500',
    startDate: '2025-05-27T00:00:00.000+00:00',
    endDate: '2025-05-29T00:00:00.000+00:00',
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
    phone: '+79037260448',
    startDate: '2025-07-07T00:00:00.000+00:00',
    endDate: '2025-07-08T00:00:00.000+00:00',
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
    phone: '+79688373539',
    startDate: '2025-06-13T00:00:00.000+00:00',
    endDate: '2025-06-24T00:00:00.000+00:00',
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
    phone: '+79106295047',
    startDate: '2025-07-18T00:00:00.000+00:00',
    endDate: '2025-07-23T00:00:00.000+00:00',
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
    phone: '+79263472779',
    startDate: '2025-10-15T00:00:00.000+00:00',
    endDate: '2025-10-16T00:00:00.000+00:00',
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
    phone: '+79168371011',
    startDate: '2025-05-04T00:00:00.000+00:00',
    endDate: '2025-05-29T00:00:00.000+00:00',
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
    phone: '+79671335013',
    startDate: '2025-05-01T00:00:00.000+00:00',
    endDate: '2025-05-03T00:00:00.000+00:00',
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
    phone: '+79162493723',
    startDate: '2025-05-11T00:00:00.000+00:00',
    endDate: '2025-05-14T00:00:00.000+00:00',
    cars: null,
    house: false,
    object: 7,
    animals: 0,
    price: 1500,
  },
]
</script>

<style scoped>
.table_block .v-table {
  height:auto;
}
.v-window-item, .v-window-item--active, .v-tabs-window-item{
  padding: 15px 10px;
}
</style>