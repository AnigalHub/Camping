<template>
  <v-row no-gutters>
    <v-col cols="3">
      <img src="./../../../../public/map_3.png" style="width: 100%;opacity: .8; height: 45vh; margin-top: 20%;transform: scale(1.1);" />
    </v-col>
    <v-col>
      <v-card height="65vh" class="coordinates">
        <v-list lines="two">
          <v-list-item
            v-for="(item, index) in halfArray"
            :key="index"
            two-line
            class="list-item-animated"
          >
            <template v-slot:prepend>
              <div class="icon-circle">
                <span class="bounce animated-bounce" style="font-size: 1rem;">{{ index % 2 === 0 ? '🏕️' : '⛺' }}</span>
              </div>
            </template>
            <v-list-item-content>
              <v-list-item-title>
               🌿Поляна {{ index + 1 }}🌿
              </v-list-item-title>
              <v-list-item-subtitle>{{ formattedCoordinates(item.value) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col>
      <v-card height="65vh" class="coordinates">
        <v-list lines="two">
          <v-list-item
            v-for="(item, index) in halfFromEnd"
            :key="index"
            two-line
            class="list-item-animated"
          >
            <template v-slot:prepend>
              <div class="icon-circle">
                <span class="bounce" style="font-size: 1rem;">{{ index % 2 === 0 ? '⛺' : '🏕️' }}</span>
              </div>
            </template>
            
             <v-list-item-content>
              <v-list-item-title>
                🌿Поляна {{halfArray.length + index + 1 }}🌿
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ formattedCoordinates(item.value) }}      
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from "vue";
import { shallowRef } from "vue";

const items = [
  { value: "43.960635, 39.263933" },
  { value: "44.260545, 37.463974" },
  { value: "46.742464, 35.933421" },
  { value: "45.126335, 34.393356" },
  { value: "47.256335, 32.372356" },
  { value: "48.363257, 30.295367" },
  { value: "41.830533, 31.118635" },
  { value: "49.220335, 46.253733" },
];

const halfArray = computed(() => {
  const halfIndex = Math.floor(items.length / 2);
  return items.slice(0, halfIndex);
});

const halfFromEnd = computed(() => {
  const halfIndex = Math.ceil(items.length / 2);
  return items.slice(-halfIndex);
});

// Форматируем координаты с переносом строки
const formattedCoordinates = (value) => {
  return value.replace(", ", ",\n");
};
</script>

<style scoped>
.v-list-item--density-default.v-list-item--two-line {
    min-height: 50px !important;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
    border-radius: 10px !important;
    margin-bottom: 15px !important;
}
/* Общая стилизация для карточек */
.coordinates {
  overflow-y: auto;
  border-radius: 12px;
  margin-top: 5%;
  background-color: #f8f6ea !important;
  box-shadow: 0 4px 12px rgba(90, 112, 47, 0.25);
  padding: 12px 20px;
  color: #3a6210;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.v-col-3 {
    flex: 0 0 32% !important;
    max-width: 32% !important;
}

/* Стили списка */
.v-list {
  margin-top: 3%;
  background: transparent !important;
  padding: 0;
}

/* Элементы списка */
.v-list-item {
  margin-bottom: 10px;
  border-radius: 10px;
  background: rgba(138, 181, 57, 0.08);
  box-shadow: 0 1px 6px rgba(90, 112, 47, 0.12);
  border: 1px solid #cccccc6b;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  padding: 8px;
}
/* При наведении */
.v-list-item:hover {
  cursor: pointer;
  background: var(--background-tr-table-hover);
  border-radius: var(--border-radius-btn-back-page-hover);
  border: var(--border-btn-back-page-hover);
  border-color: var(--border-color-btn-back-page-hover);
  box-shadow: 
   0 5px 10px rgba(17, 44, 18, 0.2);
}

/* Иконка с кругом*/
.icon-circle {
  position: relative;
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background: #f5f0e6;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
}

/* Заголовок поляны с иконой и эффектом */
.v-list-item-title {
  text-align: left;
  font-weight: 600;
  font-size: 1rem; 
  margin-left: 5%;
  color: #3a6210;
}

.v-card .v-card {
  box-shadow: none !important;
}

.v-list-item-subtitle {
  font-family: "Courier New", Courier, monospace;
  width: 90%;
  background-color: rgba(255, 255, 255, 0.75);
  padding: 4px 8px;
  margin-top: 4px;
  border-radius: 6px;
  font-size: .9rem; 
  float: left;
  color: #3a6210;
  user-select: text;
  margin-left: 5%;
  border: 1px solid #d0d0d0;
  transition: background-color 0.3s, border-color 0.3s;
}
</style>