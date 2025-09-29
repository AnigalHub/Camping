<template>
  <v-container min-height="97vh">
    <ButtonBack />
     <h1 class="text-center">Список клиентов</h1>
    <div class="table_bllock content">
      <Search />
      <Table :headers="headers" :items="items" />
    </div>
  </v-container>
</template>

<script setup>
defineOptions({
  name: 'ListClients'
})
// Заголовки 
const headers = [
  [
    { label: 'ФИО', rowspan: 2, key: 'fio' },
    { label: 'Дата рождения', rowspan: 2, key: 'freeSeats' },
    { label: 'Документы паспорт/ свидетельство', rowspan: 2, key: 'freeSeats' },
    { label: 'Номер телефона', rowspan: 2, key: 'freeSeats' },
    { label: 'Дата проживания', rowspan: 2, key: 'freeSeats' },
    { label: 'Аренда домика', rowspan: 2, key: 'freeSeats' },
    { label: 'Транспорт', rowspan: 2, key: 'freeSeats' },
    { label: 'Животные', rowspan: 2, key: 'parkingSeats' },
    { label: 'Поляна', rowspan: 2, key: 'parkingSeats' },
    { label: 'Стоимость', rowspan: 2, key: 'parkingSeats' },
    { label: '', key: 'buttons' },
  ],
]
// Содержимое таблицы
const items = [
  {
    fio: 1,
    freeSeats: '7/30',
    parkingSeats: '2/20',
    date: '2025-08-16T00:00:00.000+00:00',
    people: 10,
    cars: 2,
  },
  {
    fio: 2,
    freeSeats: '3/10',
    parkingSeats: '1/8',
    date: '2025-08-18T00:00:00.000+00:00',
    people: 5,
    cars: 0,
  },
  {
    fio: 3,
    freeSeats: '14/25',
    parkingSeats: '7/15',
    date: '2025-08-18T00:00:00.000+00:00',
    people: 3,
    cars: 3,
  },
  {
    fio: 4,
    freeSeats: '2/15',
    parkingSeats: '5/10',
    date: '2025-08-21T00:00:00.000+00:00',
    people: 6,
    cars: 1,
  },
  {
    fio: 5,
    freeSeats: '4/10',
    parkingSeats: '3/5',
    date: '2025-09-01T00:00:00.000+00:00',
    people: 3,
    cars: 1,
  },
  {
    fio: 6,
    freeSeats: '7/25',
    parkingSeats: '13/20',
    date: '2025-09-04T00:00:00.000+00:00',
    people: 11,
    cars: 1,
  },
  {
    fio: 7,
    freeSeats: '10/25',
    parkingSeats: '9/10',
    date: '2025-09-04T00:00:00.000+00:00',
    people: 3,
    cars: 1,
  },
  {
    fio: 8,
    freeSeats: '4/15',
    parkingSeats: '2/7',
    date: '2025-09-11T00:00:00.000+00:00',
    people: 7,
    cars: 4,
  },
  {
    fio: 9,
    freeSeats: '3/10',
    parkingSeats: '4/5',
    date: '2025-09-11T00:00:00.000+00:00',
    people: 5,
    cars: 2,
  },
  {
    fio: 10,
    freeSeats: '8/20',
    parkingSeats: '6/12',
    date: '2025-09-14T00:00:00.000+00:00',
    people: 8,
    cars: 2,
  },
  {
    fio: 11,
    freeSeats: '1/20',
    parkingSeats: '8/9',
    date: '2025-09-16T00:00:00.000+00:00',
    people: 15,
    cars: 6,
  },
  {
    fio: 12,
    freeSeats: '11/15',
    parkingSeats: '5/6',
    date: '2025-09-17T00:00:00.000+00:00',
    people: 5,
    cars: 1,
  },
  {
    fio: 13,
    freeSeats: '8/20',
    parkingSeats: '5/10',
    date: '2025-09-17T00:00:00.000+00:00',
    people: 10,
    cars: 0,
  },
  {
    fio: 14,
    freeSeats: '7/10',
    parkingSeats: '1/5',
    date: '2025-09-20T00:00:00.000+00:00',
    people: 3,
    cars: 2,
  },
]
</script>

<style>
.table_bllock {
  border-radius: 20px;
  background: white;
  padding: 15px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1);

}

.content {
  min-height: 80vh;
}

.table_bllock .v-table {
  min-height: 60vh;
}

h1 {
  font-family: "El Messiri", sans-serif;
  font-weight: 200;
  color: #4d672c;
  -webkit-text-stroke: 0.25px #4d672c;
  margin: 5px 0 15px;
  transform: scale(1.25);
}
</style>