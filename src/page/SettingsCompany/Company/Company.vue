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
      <v-col class="icon-col">
        <div class="icon-wrapper">
          <div class="block-icon">
            <component :is="HouseSvg" color="#61656d" style="padding:20px" />
          </div>
          <p class="icon-caption">Основные параметры организации</p>
        </div>
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
  background: linear-gradient(to top, rgba(255, 255, 255, .7), rgba(255, 255, 255, .8)) !important;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, .3), 2px 2px 8px rgba(17, 44, 18, .1) !important;
  border-radius: 15px !important;
  height: 70vh;
}

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
  from {
    transform: scale(1);
    opacity: .5;
  }

  to {
    transform: scale(1.2);
    opacity: .8;
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
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid rgba(180, 180, 180, .3);
  background: linear-gradient(180deg, #fff, #eff5f7);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 15px rgba(47, 118, 139, .18), inset 0 0 10px rgba(255, 255, 255, .3);
  transition: .5s ease;
  animation: breathe 5s ease-in-out infinite;
}

.block-icon:hover {
  transform: scale(1.06);
  box-shadow: 0 10px 25px rgba(47, 118, 139, .25), inset 0 0 15px rgba(255, 255, 255, .4);
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
  width: 75%;
  margin: 1.2rem auto 0;
  font: 600 1.6rem "Amatic SC", cursive;
  letter-spacing: 1.2px;
  color: #494c54;
  -webkit-text-stroke: .05px #494c54;
  text-align: center;
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

.btn-page {
  display: block;
  width: 60%;
  margin: 10px auto 0;
  padding: 10px 22px !important;
  min-height: 46px;
  border-radius: 12px;
  background: #547c8f;
  color: #fff;
  font-weight: 800;
  font-family: "El Messiri", sans-serif;
  font-size: 1.05rem;
  letter-spacing: .5px;
  box-shadow: 0 4px 12px rgba(50, 70, 90, .08);
  transition: .3s ease;
}

.btn-page:hover {
  transform: translateY(-2px);
  background: #3b5865;
}

.btn-disabled {
  background: #393939 !important;
  transform: none !important;
  cursor: not-allowed !important;
}
</style>