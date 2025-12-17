<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9">
        <v-card class="pa-6" elevation="2">
          <v-form class="form-layout">
            <!-- Цены -->
            <div class="section-block">
              <h3 class="form-subtitle">Цены</h3>
              <div class="grid-inputs">
                <v-text-field v-model="prices.person" label="За человека" variant="outlined" density="comfortable"
                  rounded="lg" clearable v-maska="'#########'" type="number"/>
                <v-text-field v-model="prices.animal" label="За животное" variant="outlined" density="comfortable"
                  rounded="lg" clearable v-maska="'#########'" type="number"/>
              </div>
            </div>
            <!-- Транспорт -->
            <div class="section-block">
              <h3 class="form-subtitle">Транспорт</h3>
              <div class="grid-inputs">
                <v-text-field v-model="prices.transport" label="Машина/автодом" variant="outlined" density="comfortable"
                  rounded="lg" clearable v-maska="'#########'" type="number"/>
                <v-text-field v-model="prices.smallTransport" label="Мотоцикл" variant="outlined" density="comfortable"
                  rounded="lg" clearable v-maska="'#########'" type="number"/>
              </div>
            </div>
            <!-- Глэмпинг -->
            <div class="section-block">
              <h3 class="form-subtitle">Глэмпинг</h3>
              <div class="grid-inputs">
                <v-text-field v-model="prices.tent" label="Стандарт 2+1" variant="outlined" density="comfortable"
                  rounded="lg" clearable v-maska="'#########'" type="number"/>
                <v-text-field v-model="prices.familyTent" label="Семейная 2+1" variant="outlined" density="comfortable"
                  rounded="lg" clearable v-maska="'#########'" type="number"/>
                <v-text-field v-model="prices.premiumTent" label="Премиум тент-хаус" variant="outlined"
                  density="comfortable" rounded="lg" clearable v-maska="'#########'" type="number"/>
              </div>
            </div>
            <div class="actions">
              <v-btn class="btn-page" :disabled="!isChanged" type="submit">
                Сохранить
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="CacheSvg" text="Действующие тарифы" :min="true" :animated="true"/>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import CacheSvg from "./svg/cache.vue";
import pricelist from './../../../../public/data/prices.json';

defineOptions({
  name: "Prices",
});

const prices = reactive(pricelist);
const originalPrices = ref(JSON.parse(JSON.stringify(prices)));
const normalize = (obj) => ({
  person: Number(obj.person),
  animal: Number(obj.animal),
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

<style>
  .section-block  .v-field {
  background: #ffffff8a;
}
</style>
<style scoped>
@import "../../../../public/form.css";

.content {
  padding: 20px 10px;
  height: 70vh;
}

/* Общий layout формы */
.form-layout {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Визуальные секции */
.section-block {
  background: #f6f7f8;
  border-radius: 14px;
  padding: 8px 10px 0;
  border: 1.5px solid rgba(70, 120, 170, .35);
}
.section-block:hover {
  border-color: #4a90e2;
}

/* Сетка инпутов */
.grid-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.actions {
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 10px;
}

.btn-page {
  width: auto;
  margin: -10px 0;
}
</style>