<template>
  <div class="block-title">
    <button class="back-btn" @click="goBack" title="Назад">
      <v-icon color="#fff" size="22">mdi-arrow-left</v-icon>
    </button>
    <div class="title-wrapper">
      <div class="icon-with-title">
        <div class="icon-wrapper">
          <v-icon class="icon">{{ icon }}</v-icon>
        </div>
        <div class="divider"></div>
        <h3 class="text-center title-animated">{{ title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  icon: {
    type: String,
    default: () => 'mdi-account-group-outline',
  },
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
  gap: 14px;
  margin: 15px 0 10px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: #f0ad29;
  transition: .25s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .15);
}

.back-btn:hover {
  background: #e39b12;
  transform: translateX(-2px);
}

.back-btn:active {
  transform: scale(.95);
}

.title-wrapper {
  display: flex;
  align-items: center;
  padding: 6px 18px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, .05);
  background: linear-gradient(135deg, #fff, #fafafa);
  box-shadow: 0 2px 6px rgba(0, 0, 0, .05), inset 0 1px 1px rgba(255, 255, 255, .6);
  transition: .3s;
  backdrop-filter: blur(3px);
}

.title-wrapper:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
}

.icon-with-title {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #fff;
  border: 2px solid #f0ad29;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .05), inset 0 1px 2px rgba(0, 0, 0, .03);
  transition: .3s;
}

.icon-wrapper:hover {
  background: #fff8ec;
  transform: scale(1.05);
}

.icon {
  color: #f0ad29;
  font-size: 26px;
}

.divider {
  width: 1px;
  height: 28px;
  background: #548615;
  border-radius: 2px;
}

.title-animated {
  font-family: "Poiret One", sans-serif;
  font-size: 1.35rem;
  margin: 0;
  position: relative;
  background: linear-gradient(90deg, #494c54, #7b6f5e, #494c54);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 6s linear infinite;
}

.title-animated::after {
  content: "";
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 60px;
  height: 3px;
  border-radius: 3px;
  background: #f0ad29;
}

@keyframes shimmer {
  from {
    background-position: -150px 0;
  }

  to {
    background-position: 150px 0;
  }
}
</style>
