<template>
    <v-table height="50vh" fixed-header striped="even">
        <thead>
            <tr>
                <th rowspan="2" class="text-center">Поляна</th>
                <th rowspan="2" class="text-center">Свободные места</th>
                <th rowspan="2" class="text-center">Парковочные места</th>
                <th colspan="3" class="text-center no_shadow">Ближайшие выезды</th>
            </tr>
            <tr>
                <th class="text-center">Дата</th>
                <th class="text-center">Количество человек</th>
                <th class="text-center">Количество машин</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in desserts" :key="item.name">
                <td class="text-center">{{ item.glade }}</td>
                <td class="text-center">{{ item.freeSeats }}</td>
                <td class="text-center">{{ item.parkingSeats }}</td>
                <td class="text-center">{{ item.date.split('T')[0].split('-').reverse().join('.') }}</td>
                <td class="text-center">{{ item.people }}</td>
                <td class="text-center">{{ item.cars }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup>
const desserts = [
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

<style>
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

.v-table>.v-table__wrapper>table {
    border: 1px solid rgba(0, 0, 0, .2) !important;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
</style>
<style scoped>
.v-table {
    padding: 10px;
    font-size: 1rem;
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
    border: 1.75px solid white;
    padding: 10px !important;
}

.v-table>.v-table__wrapper>table>thead {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
}

.no_shadow {
    box-shadow: none !important;
}


.v-table.v-table--striped-even>.v-table__wrapper>table>tbody>tr:nth-child(even) {
    background: rgba(138, 181, 57, 0.08);
}
</style>