<template>
  <div class="content objects">
    <v-row dense align="stretch">
      <v-col cols="9">
        <div class="wrapper_content" ref="scrollContainer">
          <v-card class="pa-6" elevation="2">
            <v-form v-model="valid" @submit.prevent="saveForm">
              <v-expansion-panels v-model="openedPanel" multiple>
                <v-expansion-panel class="custom-panel" v-for="(obj, i) in objects" :key="i">
                  <v-expansion-panel-title>
                    <div class="panel-title">
                      <strong>Объект №{{ i + 1 }}</strong>
                      <v-btn icon="mdi-delete" variant="text" size="small" class="action delete-btn"
                        @click.stop="removeObject(i)" />
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="custom-text">
                    <div class="grid-inputs">
                      <v-text-field v-model="obj.name" label="Название" variant="outlined" density="comfortable"
                        rounded="lg" clearable />
                      <v-text-field v-model="obj.description" label="Описание" variant="outlined" density="comfortable"
                        rounded="lg" clearable />
                      <v-text-field v-model="obj.coordinations" label="Координаты объекта" variant="outlined"
                        density="comfortable" rounded="lg" clearable v-mask="['##.######, ##.######']" />
                      <v-text-field v-model="obj.people" label="Количество мест" variant="outlined"
                        density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                      <v-text-field v-model="obj.cars" label="Количество парковочных мест" variant="outlined"
                        density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-btn class="btn-page" @click="addObject">Добавить объект</v-btn>
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
            </v-form>
          </v-card>
        </div>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="TentSvg" text="Описание объектов кемпинга" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from "vue";
import TentSvg from "./svg/tent.vue";
import places from './../../../../public/data/places.json';


defineOptions({
  name: "Objects",
});

const valid = ref(false);
const objects = reactive(places);
const openedPanel = ref([objects.length - 1]);
const scrollContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    const el = scrollContainer.value;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  });
};

onMounted(async () => {
  await nextTick(); 
  await nextTick(); // отрисовка всех элементов
  scrollToBottom();
});


const addObject = () => {
  objects.push({
    name: "",
    description: "",
    coordinations: "",
    people: null,
    cars: null,
  });
  openedPanel.value = [objects.length - 1];
  scrollToBottom();
};

const removeObject = (i) => {
  if (objects.length > 1) objects.splice(i, 1);
  openedPanel.value = [0];
};

const originalObjects = ref(JSON.parse(JSON.stringify(objects)));
const normalizeObjects = (arr) =>
  arr.map((obj) => ({
    name: obj.name,
    description: obj.description,
    coordinations: obj.coordinations,
    people: obj.people !== null ? Number(obj.people) : null,
    cars: obj.cars !== null ? Number(obj.cars) : null,
  }));

const isChanged = computed(() => {
  const hasEmpty = objects.some(o => !o.name || !o.description || !o.coordinations || o.people == null || o.cars == null);
  return JSON.stringify(normalizeObjects(objects)) !== JSON.stringify(normalizeObjects(originalObjects.value)) && !hasEmpty;
});

const saveForm = () => console.log(JSON.parse(JSON.stringify(objects)));
</script>

<style>
.objects .v-expansion-panel-text__wrapper {
  padding: 8px 16px 0 !important;
}

.v-expansion-panel-title {
  padding: 8px 16px !important;
  background: #edeef050;
}

.v-expansion-panel--active:not(:first-child) {
  margin-top: 0 !important;
}
</style>

<style scoped>
@import "../../../../public/form.css";

.content {
  padding: 20px 10px;
  height: 70vh;
}
</style>