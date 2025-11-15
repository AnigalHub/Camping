<template>
  <div class="page">
    <v-container>
      <Title :title="title" :icon="'mdi-cog-outline'" />
      <div class="content">
        <v-row dense align="stretch">
          <v-col cols="9">
            <v-card class="pa-6" elevation="2">
              <v-form>
               
              </v-form>
            </v-card>
          </v-col>
          <v-col class="icon-col">
            <div class="icon-wrapper">
              <div class="block-icon">
                <component :is="CacheSvg" color="#61656d" style="padding: 10px;" />
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
import CacheSvg from "./svg/cache.vue";

defineOptions({
  name: "TariffManagement",
});
const title = "Управление лагерем и тарифами";
</script>

<style scoped>
.content{
  margin-top: 25px;
}
.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7%;
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
  width: 90%;
  margin: 1.2rem auto 0;
  font-size: 1.6rem;
  color: #494c54;
  font-family: "Amatic SC", cursive;
  letter-spacing: 1.2px;
  -webkit-text-stroke: .05px #494c54;
}
</style>