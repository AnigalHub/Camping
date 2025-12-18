<template>
  <div class="content objects">
    <v-row>
      <v-col cols="9">
        <div class="wrapper_content" ref="scrollContainer">
          <v-card elevation="2" class="pa-4">
            <v-form v-model="valid" @submit.prevent="saveForm">
              <v-expansion-panels v-model="openedPanel" multiple>
                <v-expansion-panel class="custom-panel" v-for="(obj, i) in objects" :key="i">
                  <!-- Заголовок -->
                  <v-expansion-panel-title>
                    <div class="panel-title">
                      <div class="title">
                        <v-icon :color="obj.color || 'grey'">
                          {{ obj.icon || 'mdi-map-marker' }}
                        </v-icon>
                        <span><strong>{{ obj.name || 'Новый объект' }}</strong></span>
                      </div>
                      <v-btn icon="mdi-delete" variant="text" size="small" class="action delete-btn"
                        @click.stop="removeObject(i)" />
                    </div>
                  </v-expansion-panel-title>
                  <!-- Контент -->
                  <v-expansion-panel-text class="custom-text">
                    <v-text-field v-model="obj.name" label="Название" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-textarea v-model="obj.description" label="Описание" variant="outlined" density="comfortable"
                      auto-grow rows="2" rounded="lg" clearable />
                    <div class="grid-inputs">
                      <v-text-field v-model="obj.coordinations" label="Координаты" variant="outlined"
                        density="comfortable" rounded="lg" v-maska="['##.######, ##.######']" clearable />
                      <v-text-field v-model="obj.people" label="Места" type="number" density="comfortable" rounded="lg"
                        variant="outlined" clearable />
                      <v-text-field v-model="obj.cars" label="Парковка" type="number" density="comfortable" rounded="lg"
                        variant="outlined" clearable />
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
        <icon-circle :svg="TentSvg" text="Описание объектов кемпинга" :animated="true"/>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import TentSvg from "./svg/tent.vue";
import places from '../../../../public/data/places.json'

defineOptions({
  name: "Objects",
});

const valid = ref(false)
const objects = reactive(places)
const openedPanel = ref([objects.length - 1])
const scrollContainer = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  requestAnimationFrame(() => {
    const el = scrollContainer.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

onMounted(scrollToBottom)

const addObject = async () => {
  objects.push({
    name: '',
    description: '',
    coordinations: '',
    people: null,
    cars: null,
  })
  openedPanel.value = [objects.length - 1]
  scrollToBottom()
}

const removeObject = (i) => {
  if (objects.length > 1) objects.splice(i, 1)
}

const originalObjects = JSON.parse(JSON.stringify(objects))

const isChanged = computed(() => {
  return JSON.stringify(objects) !== JSON.stringify(originalObjects)
})

const saveForm = () => {
  console.log(JSON.parse(JSON.stringify(objects)))
}
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

.grid-inputs {
  grid-template-columns: repeat(3, 1fr);
}

.wrapper_content {
  height: 100%;
  overflow-y: auto;
}

.object-panel {
  margin-bottom: 8px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.panel-header .title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
}

.btn-page {
  width: auto;
  margin: -10px 0;
}
</style>