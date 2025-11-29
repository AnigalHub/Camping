<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto;height: 65vh;">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Цены</h3>
            <div class="grid-inputs">
              <v-text-field v-model="prices.person" label="За человека" variant="outlined" density="comfortable"
                rounded="lg" clearable v-mask="'#########'" />
              <v-text-field v-model="prices.animal" label="За животное" variant="outlined" density="comfortable"
                rounded="lg" clearable v-mask="'#########'" />
              <v-text-field v-model="prices.house" label="За аренду домика" variant="outlined" density="comfortable"
                rounded="lg" clearable v-mask="'#########'" />
              <v-text-field v-model="prices.transport" label="За транспорт" variant="outlined" density="comfortable"
                rounded="lg" clearable v-mask="'#########'" />
              <v-text-field v-model="prices.smallTransport" label="За мелкий транспорт" variant="outlined"
                density="comfortable" rounded="lg" clearable v-mask="'#########'" />
            </div>
            <div class="add-object-btn">
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
      <v-col>
        <icon-circle :svg="CacheSvg" text="Действующие тарифы" :min="true"/>
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
  const allFilled = Object.values(current).every(v => v !== 0 && v !== "" && !isNaN(v));

  return allFilled && JSON.stringify(current) !== JSON.stringify(original);
});
</script>

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
  animation: shimmer 7s linear infinite;
  position: relative;
}

.form-subtitle:first-of-type {
  margin-top: 0;
}

@keyframes shimmer {
  from {
    background-position: -160px 0;
  }

  to {
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

.object-title {
  margin: 20px 0 18px;
  padding: 8px 16px;
  display: inline-block;
  background: rgba(45, 154, 197, .08);
  border-left: 4px solid #2d9ac5;
  border-radius: 6px;
  backdrop-filter: blur(2px);
  font-family: "Poiret One", sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: .7px;
  animation: fadeIn .6s ease;
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
  width: 60%;
  margin: 10px auto 0;
}
</style>