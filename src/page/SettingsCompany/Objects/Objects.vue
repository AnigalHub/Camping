<template>
  <div class="content objects">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto;height: 65vh;" class="wrapper_content">
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
                    <v-text-field v-model="obj.maxpeople" label="Количество мест" variant="outlined"
                      density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                    <v-text-field v-model="obj.maxcars" label="Количество парковочных мест" variant="outlined"
                      density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <div class="add-object-btn">
              <v-btn class="btn-page" @click="addObject">Добавить объект</v-btn>
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="TentSvg" text="Описание объектов кемпинга" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import TentSvg from "./svg/tent.vue";

defineOptions({
  name: "Objects",
});

const valid = ref(false);
const objects = reactive([
  {
    name: 'У Песчаного Моря',
    description: 'Тёплый песок, мягкий бриз и спокойные волны',
    coordinations: '43.960635, 39.263933',
    maxpeople: 10,
    maxcars: 8
  },
  {
    name: 'У Песчаного Моря',
    description: 'Тёплый песок, мягкий бриз и спокойные волны',
    coordinations: '43.960635, 39.263933',
    maxpeople: 10,
    maxcars: 8
  }
]);
const openedPanel = ref([objects.length - 1]);

const addObject = () => {
  objects.push({
    name: "",
    description: "",
    coordinations: "",
    maxpeople: null,
    maxcars: null,
  });
  openedPanel.value = [objects.length - 1];
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
    maxpeople: obj.maxpeople !== null ? Number(obj.maxpeople) : null,
    maxcars: obj.maxcars !== null ? Number(obj.maxcars) : null,
  }));

const isChanged = computed(() => {
  const hasEmpty = objects.some(o => !o.name || !o.description || !o.coordinations || o.maxpeople == null || o.maxcars == null);
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