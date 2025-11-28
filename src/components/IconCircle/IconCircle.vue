<template>
  <div class="icon-col">
    <div class="icon-wrapper">
      <div class="block-icon">
        <component :is="svg" color="#61656d" :style="{ padding: min ? '10px' : '20px' }" />
      </div>
      <p class="icon-caption">{{ text }}</p>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "IconCircle",
});
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  svg: {
    type: Object,
    default: () => ({}),
  },
  min: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped>
.icon-col {
  margin-top: -12%;
}

.icon-col::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(57, 131, 181, .5), transparent 10%);
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
  padding: 30px 10px;
  margin-top: 60px;
}

.block-icon {
  width: 9rem;
  height: 9rem;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid rgba(180, 180, 180, .3);
  background: linear-gradient(180deg, #fff, #eff5f7);
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
  font-weight: 600;
  width: 75%;
  margin: 1.2rem auto 0;
  text-align: center;
  font-size: 1.6rem;
  color: #494c54;
  font-family: "Amatic SC", cursive;
  letter-spacing: 1.2px;
  -webkit-text-stroke: .05px #494c54;
}
</style>