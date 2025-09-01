<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9" style="overflow: auto;height: 65vh;">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Организация</h3>
            <v-text-field v-model="organization.name" label="Название" variant="outlined" density="comfortable"
              rounded="lg" clearable />
            <v-textarea v-model="organization.slogan" label="Слоган" variant="outlined" density="comfortable" auto-grow
              rows="4" max-rows="6" rounded="lg" clearable />
            <div class="add-object-btn">
              <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
            </div>
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
import { reactive, ref, computed } from "vue";
import HouseSvg from "./svg/house.vue";

defineOptions({
  name: "Company",
});
const organization = reactive({
  name: "Ромашка",
  slogan: "Кемпинг у моря — природа, которой хочется делиться!",
});

const originalOrganization = ref(JSON.parse(JSON.stringify(organization)));
const isChanged = computed(() => JSON.stringify(organization) !== JSON.stringify(originalOrganization.value));
</script>

<style scoped>
@import "../../../../public/form.css";
.content {
  padding: 20px 10px;
  height: 70vh;
}
</style>