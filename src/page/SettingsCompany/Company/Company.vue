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
      <v-col>
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
.content {
  padding: 20px 10px;
  height: 70vh;
}

.form-subtitle {
  margin: 10px 0 30px;
  font-family: var(--font-family-title);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: .7px;
  background: linear-gradient(90deg, #3f4a52, #7b6f5e, #3f4a52);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}
.form-subtitle:first-of-type {
  margin-top: 0;
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

.btn-page {
  width: 60%;
  margin: 10px auto 0;
}
</style>