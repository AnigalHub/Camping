<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Организация</h3>
            <v-text-field v-model="company.name" label="Название" variant="outlined" density="comfortable"
              rounded="lg" clearable />
            <v-textarea v-model="company.slogan" label="Слоган" variant="outlined" density="comfortable" auto-grow
              rows="4" max-rows="6" rounded="lg" clearable />
            <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="HouseSvg" text="Основные параметры организации"/>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import HouseSvg from "./svg/house.vue";
import organization from './../../../../public/data/organization.json';

defineOptions({
  name: "Company",
});

const company = reactive(organization);
const originalOrganization = ref(JSON.parse(JSON.stringify(company)));
const isChanged = computed(() => JSON.stringify(company) !== JSON.stringify(originalOrganization.value));
</script>

<style scoped>
@import "../../../../public/form.css";
.content {
  padding: 20px 10px;
  height: 70vh;
}
</style>