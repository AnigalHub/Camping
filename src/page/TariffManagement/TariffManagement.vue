<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-cog-outline'" />
      <div class="content">
        <v-row dense align="stretch">
          <v-col cols="9" style="overflow: auto;height: 74vh;">
            <v-card class="pa-6" elevation="2">
              <v-form>
                <h3 class="form-subtitle">Организация</h3>
                <div class="grid-inputs">
                  <v-text-field v-model="organization.name" label="Название" variant="outlined" density="comfortable"
                    rounded="lg" clearable />
                  <v-text-field v-model="organization.slogan" label="Слоган" variant="outlined" density="comfortable"
                    rounded="lg" clearable />
                </div>
                <h3 class="form-subtitle">Цены</h3>
                <div class="price-grid">
                  <v-text-field v-model="prices.person" label="За человека" type="number" variant="outlined"
                    density="comfortable" rounded="lg" clearable />
                  <v-text-field v-model="prices.animal" label="За животное" type="number" variant="outlined"
                    density="comfortable" rounded="lg" clearable />
                  <v-text-field v-model="prices.house" label="За аренду домика" type="number" variant="outlined"
                    density="comfortable" rounded="lg" clearable />
                  <v-text-field v-model="prices.transport" label="За транспорт" type="number" variant="outlined"
                    density="comfortable" rounded="lg" clearable />
                  <v-text-field v-model="prices.smallTransport" label="За мелкий транспорт" type="number"
                    variant="outlined" density="comfortable" rounded="lg" clearable />
                </div>
                <h3 class="form-subtitle subtitle-object">Объекты заселения</h3>
                <div v-for="(object, i) in objects" :key="i">
                  <div class="object-title">
                    <span>Объект №{{ i + 1 }}</span>
                  </div>
                  <div class="grid-inputs">
                    <v-text-field v-model="object.name" label="Название" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-text-field v-model="object.description" label="Описание" variant="outlined" density="comfortable"
                      rounded="lg" clearable />
                    <v-text-field v-model="object.coordinations" label="Координаты объекта" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                    <v-text-field v-model="object.maxpeople" label="Количество мест" type="number" variant="outlined"
                      density="comfortable" rounded="lg" clearable />
                    <v-text-field v-model="object.maxcars" label="Количество парковочных мест" type="number"
                      variant="outlined" density="comfortable" rounded="lg" clearable />
                  </div>
                  <hr />
                </div>
                <div class="add-object-btn">
                  <v-btn class="btn-page" @click="addObject">
                    Добавить объект
                  </v-btn>
                </div>
              </v-form>
            </v-card>
          </v-col>
          <v-col class="icon-col">
            <div class="icon-wrapper">
              <div class="block-icon">
                <component :is="CacheSvg" color="#61656d" style="padding: 10px" />
              </div>
              <p class="icon-caption">Управление всеми параметрами кемпинга</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import CacheSvg from "./svg/cache.vue";

defineOptions({
  name: "TariffManagement",
});
const title = "Управление лагерем и тарифами";
const organization = reactive({
  name: "Ромашка",
  slogan: "Кемпинг у моря — природа, которой хочется делиться!",
});
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
const prices = reactive({
  person: 500,
  animal: 500,
  house: 4000,
  transport: 500,
  smallTransport: 250
});
</script>

<style scoped>
.content {
  margin-top: 25px;
  min-height: 78vh;
  padding: 20px 25px 15px 15px !important;
}

/* --- БЛОК ПРАВОЙ ИКОНКИ --- */

.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  position: relative;
  overflow: hidden;
}

.icon-col::before {
  content: "";
  position: absolute;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(57, 131, 181, 0.4), transparent 12%);
  filter: blur(45px);
  animation: pulse 6s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 0.45;
  }

  to {
    transform: scale(1.18);
    opacity: 0.7;
  }
}

.icon-wrapper {
  text-align: center;
  z-index: 2;
  padding: 25px 10px;
}

.block-icon {
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  border: 1px solid rgba(150, 150, 150, 0.25);
  background: linear-gradient(180deg, #ffffff, #eff5f7);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 15px rgba(47, 118, 139, 0.18),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.4s ease;
  animation: breathe 5s ease-in-out infinite;
}

.block-icon:hover {
  transform: scale(1.06);
  box-shadow: 0 12px 26px rgba(47, 118, 139, 0.3),
    inset 0 0 14px rgba(255, 255, 255, 0.5);
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
  width: 90%;
  margin: 1.2rem auto 0;
  font-size: 1.6rem;
  color: #494c54;
  font-family: "Amatic SC", cursive;
  letter-spacing: 1.2px;
}

/* --- ПОДЗАГОЛОВКИ ФОРМЫ --- */

.form-subtitle {
  margin: 10px 0 20px;
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

/* --- СЕТКИ --- */

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

.price-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 25px;
}

@media (max-width: 1100px) {
  .price-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .price-grid {
    grid-template-columns: 1fr;
  }
}

/* --- ОБЪЕКТЫ ЗАСЕЛЕНИЯ --- */

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

/* Разделители */

hr {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

/* Кнопка поиска */
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
  margin-top: 10px;
  min-height: 46px;
  width: 100%;
}

.btn-page:hover {
  transform: translateY(-2px);
  background: #3b5865;
}
</style>