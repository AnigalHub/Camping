<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9">
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
              <v-text-field v-model="prices.smallTransport" label="За мелкий транспорт" variant="outlined" density="comfortable" 
              rounded="lg" clearable v-mask="'#########'" />
            </div>
            <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="CacheSvg" text="Действующие тарифы" :min="true"/>
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
@import "../../../../public/form.css";
.content {
  padding: 20px 10px;
  height: 70vh;
}
</style>