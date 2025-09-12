<template>
  <div class="page">
    <v-container>
      <Title :title="title" />
      <div class="block_table">
ввввв
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'AddClients'
})

const title = 'Регистрация отдыхающих';
</script>

<style scoped>
/* Общий контейнер */
.block_table {
  min-height: 82.5vh;
  padding: 15px 25px 15px 15px !important;
  display: flex;
  align-items: center;
}

/* Заголовки секций */
.section-title {
  margin-bottom: 10px;
  font-weight: 500;
  font-family: "El Messiri", sans-serif;
  color: #425e38;
  font-size: 1.05rem;
  letter-spacing: 0.3px;
}

/* Левая карточка */
.settings-card {
  padding: 30px 35px;
  margin: 0 15px;
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid rgba(180, 180, 180, 0.3);
  backdrop-filter: blur(8px);
  box-shadow:
    0 8px 25px rgba(76, 175, 80, 0.12),
    inset 0 0 12px rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
}

.settings-card:hover {
  box-shadow:
    0 12px 30px rgba(76, 175, 80, 0.2),
    inset 0 0 14px rgba(255, 255, 255, 0.35);
}

/* Правая колонка */
.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;

  position: relative;
  overflow: hidden;
}

/* Мягкое свечение */
.icon-col::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(138, 181, 57, 0.18), transparent 70%);
  filter: blur(40px);
  animation: pulse 6s ease-in-out infinite alternate;
}

/* Плавная анимация свечения */
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

/* Контейнер для иконки */
.icon-wrapper {
  text-align: center;
  z-index: 2;
  padding: 30px 10px;
}

/* Обводка вокруг иконки */
.block_icon {
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
    border: 1px solid rgba(180, 180, 180, 0.3);
  background: linear-gradient(180deg, #ffffff, #f3f7ef);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:
    0 6px 15px rgba(85, 139, 47, 0.18),
    inset 0 0 10px rgba(255, 255, 255, 0.3);
  transition: all 0.5s ease;
  animation: breathe 5s ease-in-out infinite;
}

.block_icon:hover {
  transform: scale(1.06);
  box-shadow:
    0 10px 25px rgba(76, 175, 80, 0.25),
    inset 0 0 15px rgba(255, 255, 255, 0.4);
}

/* Дыхание */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}

/* Изображение */
.camp-image {
  width: 68%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 10px rgba(85, 139, 47, 0.12));
  transition: transform 0.4s ease;
}

.block_icon:hover .camp-image {
  transform: scale(1.1);
}

/* Подпись */
.icon-caption {
  margin-top: 1.2rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: #4d672c;
  font-family: "El Messiri", sans-serif;
  letter-spacing: 0.2px;
}
</style>

<style>
.v-field.v-field--appended {
  background: #fff !important;
}
/* Сжимаем расстояние между инпутами */
.v-text-field {
  margin-bottom: 12px !important; /* раньше было 24px */
}

/* Последнему инпуту оставим чуть больше воздуха перед кнопкой */
.v-text-field:last-of-type {
  margin-bottom: 18px !important;
}
</style>
