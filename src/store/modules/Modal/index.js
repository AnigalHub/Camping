export const Modal = {
  namespaced: true,
  state: {
    modals: [],
    /**@type {import('vue').Component} */
  },
  getters: {
    modals: (state) => state.modals,
  },
  mutations: {
    /**
     * Добавить компонент
     * @param {any} state Состояние
     * @param {import('vue').Component} value Компонент для показ
     */
    add(state, value) {
      let found = state.modals.find((x) => x.name === value.name);
      if (found) {
        throw new Error('Не уникальное имя модального окна!');
      }
      state.modals.push(value);
    },
    open(state, name) {
      if (!state.modals.some((x) => x.isVisible)) {
        let found = state.modals.find((x) => x.name === name);
        if (found) {
          found.isVisible = true;
        }
      }
    },
    hide(state, name) {
      let found = state.modals.find((x) => x.name === name);
      if (found) {
        found.isVisible = false;
      }
    },
    removeModal(state, name) {
      let modalIndex = state.modals.findIndex((x) => x.name === name);
      if (modalIndex > -1) {
        state.modals.splice(modalIndex, 1);
      }
    },
  },
  actions: {
    setModal(store, { modalData }) {
      // console.log('setModal', { modalData });
      store.commit('add', modalData);
      store.commit('open', modalData.name);
    },
    unsetModal(store, name) {
      // Удаляем текущее
      store.commit('removeModal', name);
      // Открываем другое если оно есть
      setTimeout(() => {
        if (store.state.modals.length !== 0) {
          store.state.modals[0].isVisible = true;
        }
      }, 100);
    },
  },
};
