<template>
  <div class="block-title">
    <button v-if="showBack" class="back-btn" @click="goBack">
      <v-icon color="#fff" size="22">mdi-arrow-left</v-icon>
    </button>
    <div class="title-wrapper">
      <h3 class="form-subtitle">{{ title }}</h3>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  showBack: { type: Boolean, default: true },
  title: { type: String, default: '' },
})

const router = useRouter()
function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<style scoped>
.block-title {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 15px 0 12px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  background: linear-gradient(135deg, #f0ad29, #eaab30);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateX(-2px) scale(1.05);
  background: linear-gradient(135deg, #f0ad29, #c09032);
}

.back-btn:active {
  transform: scale(0.95);
}

/* Заголовок как form-subtitle */
.form-subtitle {
  font-family: var(--font-family-title);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: .7px;
  background: linear-gradient(90deg, #3f4a52, #162126, #3f4a52);
  -webkit-text-stroke: .65px #4e4e4e2b;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  margin: 0;
}

.form-subtitle::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 70px;
  height: 3.5px;
  border-radius: 3px;
  background: #ecac31;
  opacity: .9;
}

@media (max-width: 900px) {
  .form-subtitle {
    font-size: 1.3rem;
  }
}

@media (max-width: 400px) {
  .back-btn {
    width: 35px;
    height: 35px;
  }
}
</style>
