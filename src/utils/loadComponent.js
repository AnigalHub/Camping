// @ts-check
import { defineAsyncComponent } from 'vue';

/** @param {string} componentName */
export const loadComponent = (componentName) =>
  defineAsyncComponent(() =>
    import(`../../src/components/${componentName}/${componentName}.vue`).catch(
      () =>
        import(`../../src/components/${componentName}/${componentName}.vue`),
    ),
  );
