<template>
  <div class="content objects">
    <v-row>
      <v-col cols="9">
        <div class="wrapper_content" ref="scrollContainer">
          <v-card elevation="2" class="pa-4">
            <v-form v-model="valid" @submit.prevent="saveForm">
              <v-expansion-panels v-model="openedPanel" multiple>
                <v-expansion-panel
                  v-for="(obj, i) in objects"
                  :key="i"
                  class="custom-panel"
                >
                  <!-- Заголовок -->
                  <v-expansion-panel-title>
                    <div class="panel-title">
                      <div class="title">
                        <v-icon :color="obj.color">
                          {{ obj.icon }}
                        </v-icon>
                        <strong>{{ obj.name || 'Новый объект' }}</strong>
                      </div>

                      <v-btn
                        icon="mdi-delete"
                        variant="text"
                        size="small"
                        class="action delete-btn"
                        @click.stop="removeObject(i)"
                      />
                    </div>
                  </v-expansion-panel-title>

                  <!-- Контент -->
                  <v-expansion-panel-text>
                    <v-text-field
                      v-model="obj.name"
                      label="Название"
                      variant="outlined"
                      rounded="lg"
                      density="comfortable"
                    />

                    <v-textarea
                      v-model="obj.description"
                      label="Описание"
                      auto-grow
                      rows="2"
                      variant="outlined"
                      rounded="lg"
                      density="comfortable"
                    />

                    <div class="grid-inputs">
                      <v-text-field
                        v-model="obj.coordinations"
                        label="Координаты"
                        variant="outlined"
                        rounded="lg"
                        density="comfortable"
                        v-maska="['##.######, ##.######']"
                      />

                      <v-text-field
                        v-model="obj.people"
                        label="Места"
                        type="number"
                        variant="outlined"
                        rounded="lg"
                      />

                      <v-text-field
                        v-model="obj.cars"
                        label="Парковка"
                        type="number"
                        variant="outlined"
                        rounded="lg"
                      />
                    </div>

                    <!-- Глэмпинги -->
                    <div class="glamping-section">
                      <div class="section-title">
                        Типы глэмпингов
                      </div>

                      <div class="glamping-grid">
                        <div
                          v-for="item in glampingTypes"
                          :key="item.key"
                          class="glamping-tile"
                        >
                          <div class="tile-header">
                            <v-icon :color="'#547c8f'">{{ item.icon }}</v-icon>
                            <span>{{ item.label }}</span>
                          </div>

                          <div class="tile-input">
                            <v-text-field
                              v-model="obj.glamping[item.key]"
                              label="Количество"
                              type="number"
                              variant="outlined"
                              density="compact"
                              hide-details
                            />
                          </div>
                        </div>
                      </div>
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
import glampingData from '../../../../public/data/glamping.json'

defineOptions({
  name: "Objects",
});

const valid = ref(false)

const glampingKeyMap = {
  'Стандарт (2+1)': 'standard',
  'Семейная (2+1)': 'family',
  'Премиум (тент-хаус)': 'premium',
}

const glampingTypes = glampingData.map(item => ({
  key: glampingKeyMap[item.name],
  label: item.name,
  icon: item.icon,
  color: item.color,
  description: item.description,
}))

const initObject = (obj = {}) => ({
  name: obj.name ?? '',
  description: obj.description ?? '',
  coordinations: obj.coordinations ?? '',
  people: obj.people ?? null,
  cars: obj.cars ?? null,
  icon: obj.icon ?? 'mdi-map-marker',
  color: obj.color ?? 'grey',

  glamping: {
    standard: obj.standard ?? null,
    family: obj.family ?? null,
    premium: obj.premium ?? null,
  },
})

const objects = reactive(places.map(initObject))
const openedPanel = ref([objects.length - 1])
const scrollContainer = ref(null)

const addObject = async () => {
  objects.push(initObject())
  openedPanel.value = [objects.length - 1]
  await nextTick()
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
}

const removeObject = (i) => {
  if (objects.length > 1) objects.splice(i, 1)
}

onMounted(async () => {
  await nextTick()
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
})

const originalObjects = JSON.parse(JSON.stringify(objects))
const isChanged = computed(
  () => JSON.stringify(objects) !== JSON.stringify(originalObjects)
)

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

.grid-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.glamping-section {
  margin-top: 20px;
}

.section-title {
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: -25px;
}

.glamping-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.glamping-tile {
  border: 1px solid #878787;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 20px;
}

.tile-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #777777;
}

.tile-input {
  margin-top: 10px;
}

.actions {
  margin-top: 16px;
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