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
      <v-col>
        <icon-circle :svg="TentSvg" text="Описание объектов кемпинга"/>
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
.v-expansion-panel-title{
  padding: 8px 16px !important;
}
.v-expansion-panel--active:not(:first-child){
  margin-top: 0 !important;
}
</style>
<style scoped>
.content {
  padding: 20px 10px;
  height: 70vh;
}

.form-subtitle {
  margin: 10px 0 30px;
  padding-left: 4px;
  font-family: "Poiret One", sans-serif;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: .7px;
  background: linear-gradient(90deg, #3f4a52, #7b6f5e, #3f4a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 7s infinite linear;
  position: relative;
}

.form-subtitle:first-of-type {
  margin-top: 0;
}

@keyframes shimmer {
  0% {
    background-position: -160px 0;
  }

  100% {
    background-position: 160px 0;
  }
}

.form-subtitle::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 70px;
  height: 3px;
  border-radius: 3px;
  background: #2d9ac5;
  opacity: .9;
}

.grid-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}

@media (max-width: 900px) {
  .grid-inputs {
    grid-template-columns: 1fr;
  }
}

.btn-page {
  background: #547c8f;
  color: #fff;
  font-weight: 800;
  font-family: "El Messiri", sans-serif;
  font-size: 1.05rem;
  border-radius: 12px;
  letter-spacing: .5px;
  box-shadow: 0 4px 12px rgba(50, 70, 90, .08);
  transition: .3s ease;
  padding: 10px 22px !important;
  min-height: 46px;
  margin: 10px auto 0;
  display: block;
  width: 60%;
}

.btn-page:hover {
  transform: translateY(-2px);
  background: #3b5865;
}

.btn-disabled {
  background: #393939 !important;
  transform: none !important;
  cursor: not-allowed !important;
}

.v-expansion-panels,
.v-expansion-panel {
  box-shadow: none !important;
  background: transparent !important;
}

.custom-panel {
  border: 1.5px solid rgba(70, 120, 170, .35);
  border-radius: 18px;
  margin-bottom: 18px;
  background: linear-gradient(180deg, #fff, #f7f9fc);
  transition: .25s ease;
  overflow: hidden;
  position: relative;
}

.custom-panel:hover {
  border-color: #4a90e2;
  background: linear-gradient(180deg, #fff, #f4f8ff);
}

.custom-title {
  font-weight: 600;
  font-size: 1.15rem;
  padding: 10px 12px;
  color: #39424e;
  font-family: "El Messiri", sans-serif;
}

.custom-text {
  padding: 20px 10px 0;
  background: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, .06);
  border-radius: 0 0 14px 14px;
  animation: fadeBlocks .3s ease;
}

@keyframes fadeBlocks {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.delete-btn {
  opacity: .8;
  transition: .2s;
  margin-left: 10px;
  margin-top: -2.5px;
  border: 1.5px solid rgba(70, 120, 170, .35);
  color: rgba(70, 120, 170, .8);
  border-radius: 10px;
}

.delete-btn:hover {
  opacity: 1;
  background: #f9f0ee;
  color: #c0392b;
  border-color: #c0392b;
  transform: scale(1.15);
}
.panel-title {
  width: 100%;
  display: flex;
  align-items: center;
}

.panel-title .action {
  margin-left: auto;
  margin-right: 20px;
}
</style>