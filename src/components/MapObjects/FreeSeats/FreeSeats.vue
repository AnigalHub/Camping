<template>
  <Table :headers="headers" :items="items"/>
</template>

<script setup>
// Заголовки 
const headers = [
  [
    { label: 'Поляна', rowspan: 2, key: 'glade' },
    { label: 'Свободные места', rowspan: 2, key: 'freeSeats' },
    { label: 'Парковочные места', rowspan: 2, key: 'parkingSeats' },
    { label: 'Ближайшие выезды', colspan: 3, key: null },
  ],
  [
    { label: 'Дата', key: 'date' },
    { label: 'Количество человек', key: 'people' },
    { label: 'Количество машин', key: 'cars' },
  ],
]
// Содержимое таблицы
const items = [
  {
    glade: 1,
    freeSeats: '7/30',
    parkingSeats: '2/20',
    date: '2025-08-16T00:00:00.000+00:00',
    people: 10,
    cars: 2,
  },
  {
    glade: 2,
    freeSeats: '3/10',
    parkingSeats: '1/8',
    date: '2025-08-18T00:00:00.000+00:00',
    people: 5,
    cars: 0,
  },
  {
    glade: 3,
    freeSeats: '14/25',
    parkingSeats: '7/15',
    date: '2025-08-18T00:00:00.000+00:00',
    people: 3,
    cars: 3,
  },
  {
    glade: 4,
    freeSeats: '2/15',
    parkingSeats: '5/10',
    date: '2025-08-21T00:00:00.000+00:00',
    people: 6,
    cars: 1,
  },
  {
    glade: 5,
    freeSeats: '4/10',
    parkingSeats: '3/5',
    date: '2025-09-01T00:00:00.000+00:00',
    people: 3,
    cars: 1,
  },
  {
    glade: 6,
    freeSeats: '7/25',
    parkingSeats: '13/20',
    date: '2025-09-04T00:00:00.000+00:00',
    people: 11,
    cars: 1,
  },
  {
    glade: 7,
    freeSeats: '10/25',
    parkingSeats: '9/10',
    date: '2025-09-04T00:00:00.000+00:00',
    people: 3,
    cars: 1,
  },
  {
    glade: 8,
    freeSeats: '4/15',
    parkingSeats: '2/7',
    date: '2025-09-11T00:00:00.000+00:00',
    people: 7,
    cars: 4,
  },
  {
    glade: 9,
    freeSeats: '3/10',
    parkingSeats: '4/5',
    date: '2025-09-11T00:00:00.000+00:00',
    people: 5,
    cars: 2,
  },
  {
    glade: 10,
    freeSeats: '8/20',
    parkingSeats: '6/12',
    date: '2025-09-14T00:00:00.000+00:00',
    people: 8,
    cars: 2,
  },
  {
    glade: 11,
    freeSeats: '1/20',
    parkingSeats: '8/9',
    date: '2025-09-16T00:00:00.000+00:00',
    people: 15,
    cars: 6,
  },
  {
    glade: 12,
    freeSeats: '11/15',
    parkingSeats: '5/6',
    date: '2025-09-17T00:00:00.000+00:00',
    people: 5,
    cars: 1,
  },
  {
    glade: 13,
    freeSeats: '8/20',
    parkingSeats: '5/10',
    date: '2025-09-17T00:00:00.000+00:00',
    people: 10,
    cars: 0,
  },
  {
    glade: 14,
    freeSeats: '7/10',
    parkingSeats: '1/5',
    date: '2025-09-20T00:00:00.000+00:00',
    people: 3,
    cars: 2,
  },
]
</script>