<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto;height: 65vh;">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Цены</h3>
            <div class="grid-inputs">
              <v-text-field v-model="prices.person" label="За человека" type="number" variant="outlined"
                density="comfortable" rounded="lg" clearable />
              <v-text-field v-model="prices.animal" label="За животное" type="number" variant="outlined"
                density="comfortable" rounded="lg" clearable />
              <v-text-field v-model="prices.house" label="За аренду домика" type="number" variant="outlined"
                density="comfortable" rounded="lg" clearable />
              <v-text-field v-model="prices.transport" label="За транспорт" type="number" variant="outlined"
                density="comfortable" rounded="lg" clearable />
              <v-text-field v-model="prices.smallTransport" label="За мелкий транспорт" type="number" variant="outlined"
                density="comfortable" rounded="lg" clearable />
            </div>
            <div class="add-object-btn">
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="icon-col">
        <div class="icon-wrapper">
          <div class="block-icon">
            <component :is="CacheSvg" color="#61656d" style="padding: 10px" />
          </div>
          <p class="icon-caption">Действующие тарифы</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import CacheSvg from "./svg/cache.vue";

defineOptions({
  name: "Prices",
});
const prices = reactive({
  person: 500,
  animal: 500,
  house: 4000,
  transport: 500,
  smallTransport: 250
});
const originalPrices = ref(JSON.parse(JSON.stringify(prices)));
const normalize = (obj) => ({
  person: Number(obj.person),
  animal: Number(obj.animal),
  house: Number(obj.house),
  transport: Number(obj.transport),
  smallTransport: Number(obj.smallTransport),
});

const isChanged = computed(() => {
  const current = normalize(prices);
  const original = normalize(originalPrices.value);
  return JSON.stringify(current) !== JSON.stringify(original);
});
</script>

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

/* --- БЛОК ПРАВОЙ ИКОНКИ --- */

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
/* --- ПОДЗАГОЛОВКИ ФОРМЫ --- */

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

.btn-disabled {
  background: #393939 !important;
  border: 1.7px solid #fbf0f09e !important;
  transform: none !important;
  cursor: not-allowed !important;
}
</style>