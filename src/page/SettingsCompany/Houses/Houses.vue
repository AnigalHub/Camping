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
                      <strong>{{ obj.name || 'Новый глэмпинг' }}</strong>
                      <v-btn icon="mdi-delete" variant="text" size="small" class="action delete-btn"
                        @click.stop="removeObject(i)" />
                    </div>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text class="custom-text">
                    <div >
                      <v-text-field v-model="obj.name" label="Название" variant="outlined" density="comfortable"
                        rounded="lg" clearable />
                      <v-textarea v-model="obj.description" label="Описание" variant="outlined" density="comfortable"
                        rounded="lg" rows="2" clearable />
                    </div>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
               <div class="actions">
                <v-btn class="btn-page" variant="outlined" @click="addObject">
                  Добавить объект
                </v-btn>
                <v-btn class="btn-page" :disabled="!isChanged" type="submit">
                  Сохранить
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </div>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="TentSvg" text="Аренда палаток на полянах" :animated="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from "vue";
import TentSvg from "./svg/tent.vue";
import glampingData from './../../../../public/data/glamping.json';


defineOptions({
  name: "Houses",
});

const valid = ref(false);
const objects = reactive(glampingData);
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
  }));

const isChanged = computed(() => {
  const hasEmpty = objects.some(o => !o.name || !o.description);
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

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
}

.btn-page{
  width: auto;
  margin: -10px 0;
}

.wrapper_content {
  height: 65vh;
  overflow-y: auto;
}
</style>