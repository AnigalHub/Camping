<template>
  <div class="content">
    <v-row dense align="stretch">
      <v-col cols="9">
        <v-card class="pa-6" elevation="2">
          <v-form>
            <h3 class="form-subtitle">Организация</h3>
            <v-text-field v-model="company.name" label="Название" variant="outlined" density="comfortable" rounded="lg"
              clearable />
            <v-textarea v-model="company.slogan" label="Слоган" variant="outlined" density="comfortable" auto-grow
              rows="4" max-rows="6" rounded="lg" clearable />
            <div class="file-input-wrapper form-input" @change="onFileChange">
              <label class="file-input-label">
                <input type="file" accept="image/*" />
                <span>{{ preview ? "Изменить логотип" : "Выберите логотип" }}</span>
              </label>
              <div v-if="preview" class="preview-wrapper">
                <img :src="preview" alt="preview" />
                <v-btn icon="mdi-delete" variant="text" size="small" class="delete-btn" @click="removeImage" />
              </div>
            </div>
            <v-btn class="btn-page" :disabled="!isChanged" :class="{ 'btn-disabled': !isChanged }">Сохранить</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col class="content-icons">
        <icon-circle :svg="HouseSvg" text="Основные параметры организации" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import HouseSvg from "./svg/house.vue";
import organization from './../../../../public/data/organization.json';

defineOptions({
  name: "Company",
});

const company = reactive(organization);
const originalOrganization = ref(JSON.parse(JSON.stringify(company)));
const isChanged = computed(() => JSON.stringify(company) !== JSON.stringify(originalOrganization.value));

const preview = ref(null);
const imageFile = ref(null);


onMounted(() => {
  if (company.img) {
    preview.value = company.img;
  }
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) {
    removeImage();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    preview.value = reader.result;
    imageFile.value = file;
    company.img = reader.result;
  };
  reader.readAsDataURL(file);
};

const removeImage = () => {
  preview.value = null;
  imageFile.value = null;
  company.img = null;
};
</script>


<style scoped>
@import "../../../../public/form.css";

.content {
  padding: 20px 10px;
  height: 70vh;
}

.form-input {
  margin-bottom: 20px;
}

.file-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #a7a7a8;
  background: #edeef066;
  border-radius: 8px;
  padding: 10px 12px;
  position: relative;
  cursor: pointer;
  transition: border-color 0.2s;
  min-height: 85px;
}

.file-input-wrapper:hover {
  background: #eef1f6d7;
}

.file-input-wrapper:hover .file-input-label {
  color: #547c8f;
  font-weight: 500;
}

.file-input-wrapper input {
  display: none;
}

.file-input-label {
  flex-grow: 1;
  font-size: 0.95rem;
  color: #4b4b4b;
  cursor: pointer;
}

.preview-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
  position: relative;
}

.preview-wrapper img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  border: 1.5px solid rgba(70, 120, 170, .35);
}
</style>