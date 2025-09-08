<template>
  <div class="content objects">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto;height: 65vh;">
        <v-card class="pa-6" elevation="2">
          <v-form v-model="valid" @submit.prevent="saveForm">
            <v-expansion-panels v-model="openedPanel" multiple>
              <v-expansion-panel class="custom-panel" v-for="(object, index) in objects" :key="index">
                <v-expansion-panel-title class="custom-title d-flex justify-space-between align-center">
                  <strong>Объект №{{ index + 1 }}</strong>
                  <v-btn icon="mdi-delete" variant="text" size="small" class="delete-btn"
                    @click.stop="removeObject(index)" />
                </v-expansion-panel-title>

                <v-expansion-panel-text class="custom-text">
                  <div class="grid-inputs">
                    <v-text-field v-model="object.name" label="Название" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-text-field v-model="object.description" label="Описание" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-text-field v-model="object.coordinations" label="Координаты объекта" variant="outlined"
                      density="comfortable" rounded="lg" clearable v-mask="['##.######, ##.######']" />
                    <v-text-field v-model="object.maxpeople" label="Количество мест" variant="outlined"
                      density="comfortable" rounded="lg" clearable v-mask="'#########'" />
                    <v-text-field v-model="object.maxcars" label="Количество парковочных мест" variant="outlined"
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
      <v-col class="icon-col">
        <div class="icon-wrapper">
          <div class="block-icon">
            <component :is="TentSvg" color="#61656d" style="padding: 20px" />
          </div>
          <p class="icon-caption">Описание объектов кемпинга</p>
        </div>
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
const openedPanel = ref([0]);
const objects = reactive([
  {
    name: 'У Песчаного Моря',
    description: 'Тёплый песок, мягкий бриз и спокойные волны',
    coordinations: '43.960635, 39.263933',
    maxpeople: 10,
    maxcars: 8,
  }
]);
const addObject = () => {
  objects.push({
    name: "",
    description: "",
    coordinations: "",
    maxpeople: null,
    maxcars: null,
  });
};

const removeObject = (index) => {
  if (objects.length > 1) objects.splice(index, 1);
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
  // Проверка на пустые поля
  const hasEmptyFields = objects.some(obj =>
    !obj.name ||
    !obj.description ||
    !obj.coordinations ||
    obj.maxpeople == null ||
    obj.maxcars == null
  );

  // Нормализуем перед сравнением — чтобы "10" == 10
  const current = normalizeObjects(objects);
  const original = normalizeObjects(originalObjects.value);

  const changed = JSON.stringify(current) !== JSON.stringify(original);

  return changed && !hasEmptyFields;
});
const saveForm = () => console.log(JSON.parse(JSON.stringify(persons)));
</script>

<style>
.objects .v-expansion-panel-text__wrapper {
  padding: 8px 24px 0 !important;
}
</style>
<style scoped>
.content {
  padding: 30px 10px;
  background: linear-gradient(to top,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.8)) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3),
    2px 2px 8px rgba(17, 44, 18, 0.1) !important;
  border-radius: 15px !important;
  height: 70vh;
}

.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -12% !important;
  position: relative;
  overflow: hidden;
}

.icon-col::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgb(57 131 181 / 50%), transparent 10%);
  filter: blur(40px);
  animation: pulse 6s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  100% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.icon-wrapper {
  text-align: center;
  z-index: 2;
  padding: 30px 10px;
}

.block-icon {
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  border: 1px solid rgba(180, 180, 180, 0.3);
  background: linear-gradient(180deg, #ffffff, #eff5f7);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 15px rgba(47, 118, 139, 0.18),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.5s ease;
  animation: breathe 5s ease-in-out infinite;
}

.block-icon:hover {
  transform: scale(1.06);
  box-shadow: 0 10px 25px rgba(47, 118, 139, 0.25),
    inset 0 0 15px rgba(255, 255, 255, 0.4);
}

@keyframes breathe {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }
}

.icon-caption {
  font-weight: 600;
  width: 75%;
  margin: 1.2rem auto 0;
  font-size: 1.6rem;
  color: #494c54;
  font-family: "Amatic SC", cursive;
  letter-spacing: 1.2px;
  -webkit-text-stroke: .05px #494c54;
}

.form-subtitle {
  margin: 10px 0 30px;
  padding-left: 4px;
  font-family: "Poiret One", sans-serif;
  font-size: 1.45rem;
  font-weight: 600;
  letter-spacing: 0.7px;
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
  opacity: 0.9;
}

.grid-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 25px;
}

@media (max-width: 900px) {
  .grid-inputs {
    grid-template-columns: 1fr;
  }
}

.object-title {
  margin: 20px 0 18px;
  padding: 8px 16px;
  display: inline-block;
  background: rgba(45, 154, 197, 0.08);
  border-left: 4px solid #2d9ac5;
  border-radius: 6px;
  backdrop-filter: blur(2px);
  font-family: "Poiret One", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.7px;
  animation: fadeIn 0.6s ease;
}

.subtitle-object {
  margin-bottom: 0;
}

.object-title span {
  background: linear-gradient(90deg, #2d9ac5, #7b6f5e, #2d9ac5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-page {
  background: #547c8f;
  color: #fff;
  font-weight: 800;
  font-family: "El Messiri", sans-serif;
  font-size: 1.05rem;
  border-radius: 12px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(50, 70, 90, 0.08);
  transition: all 0.3s ease;
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
  border: 1.7px solid #fbf0f09e !important;
  transform: none !important;
  cursor: not-allowed !important;
}

.v-expansion-panels,
.v-expansion-panel {
  box-shadow: none !important;
  background: transparent !important;
}

.custom-panel {
  border: 1.5px solid rgba(70, 120, 170, 0.35);
  border-radius: 18px;
  margin-bottom: 18px;
  background: linear-gradient(180deg, #ffffff, #f7f9fc);
  transition: all 0.25s ease;
  overflow: hidden;
  position: relative;
}

.custom-panel:hover {
  border-color: #4a90e2;
  background: linear-gradient(180deg, #ffffff, #f4f8ff);
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
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 0 0 14px 14px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
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
  opacity: 0.8;
  transition: 0.2s;
  margin-left: 10px;
  margin-top: -2.5px;
  border: 1.5px solid rgba(70, 120, 170, 0.35);
  color: rgba(70, 120, 170, 0.8);
  border-radius: 10px;
}

.delete-btn:hover {
  opacity: 1;
  background-color: #f9f0ee;
  color: #c0392b;
  border: 1.5px solid #c0392b;
  transform: scale(1.15);
}
</style>