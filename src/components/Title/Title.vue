<template>
  <div class="block-title">
    <button v-if="showBack" class="back-btn" @click="goBack">
      <v-icon color="#fff" size="22">mdi-arrow-left</v-icon>
    </button>
    <div class="title-wrapper">
      <div class="icon-with-title">
        <div class="icon-wrapper">
          <v-icon class="icon">{{ icon }}</v-icon>
        </div>
        <h3 class="text-center title-animated">{{ title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  showBack: {
    type: Boolean,
    default: () => true,
  },
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
  margin: 15px 0 5px;
}

.back-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  background: #f0ad29;
  transition: .25s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .15);
  flex-shrink: 0;
}

.back-btn:hover {
  background: #e39b12;
  transform: translateX(-2px);
}

.back-btn:active {
  transform: scale(.95);
}

.title-wrapper {
  padding: 6px 18px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, .05);
  background: linear-gradient(135deg, #fff, #fafafa);
  box-shadow: 0 2px 6px rgba(0, 0, 0, .05), inset 0 1px 1px rgba(255, 255, 255, .6);
  transition: .3s;
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
}

.title-wrapper:hover {
  transform: translateY(-2px);
}

.title-wrapper:hover .icon-wrapper{
  background: #fff8ec;
}

.icon-with-title {
  display: flex;
  align-items: center;
  gap: 14px;
  overflow: hidden;
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
  flex-shrink: 0;
}

.icon {
  color: #f0ad29;
  font-size: 26px;
}

/* --- ТЕКСТ --- */
.title-animated {
  font-family: var(--font-family-title);
  font-size: 1.35rem;
  margin: 0;
  position: relative;
  background: linear-gradient(90deg, #494c54, #7b6f5e, #494c54);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

@media (max-width: 900px) {
  .title-animated {
    font-size: 1.3rem;
  }
  .icon-wrapper {
    width: 38px;
    height: 38px;
  }
  .icon {
    font-size: 22px;
  }
}

@media (max-width: 600px) {
  .block-title {
    gap: 10px;
    margin: 10px 0 5px;
  }

  .title-wrapper {
    padding: 6px 10px;
  }

  .icon-with-title {
    gap: 10px;
  }

  .icon-wrapper {
    width: 34px;
    height: 34px;
    border-width: 1.5px;
  }

  .icon {
    font-size: 20px;
  }

  .title-animated::after {
    width: 45px;
  }
}

@media (max-width: 400px) {
  .icon-wrapper {
    width: 30px;
    height: 30px;
  }

  .icon {
    font-size: 18px;
  }
}

</style>
