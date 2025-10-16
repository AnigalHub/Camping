/** Вызов модального окна
 * @param name {String} название модального окна
 * @param data {Object} Данные
 * @param data.name {Object} Наименование модального окна
 * @param data.component {Object} компонента
 * @param data.props {Object} пропсы компоненты
 * @param data.params {Object} параметры: функция успешного|неудачного выполнения промиса + настройки модального окна
 */
export const callModalWindow = async (
  store,
  { name, component, props, params = null },
) => {
  await new Promise((resolve, reject) => {
    store.dispatch('Modal/setModal', {
      modalData: {
        name,
        component,
        props,
        isVisible: false,
        submitHandler: async (value) => {
          if (params?.onSubmit) {
            await params.onSubmit(resolve, value);
          } else {
            resolve();
          }
        },
        closeHandler: async (value) => {
          if (params?.onClose) {
            await params.onClose(resolve, value);
          } else {
            resolve();
          }
        },
        resolve: resolve,
        reject: reject,
        ...params?.settings, // пример - {positionBottom: true}
      },
    });
  });
  await store.dispatch('Modal/unsetModal', name);
};
