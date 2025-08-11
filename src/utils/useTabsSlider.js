import { nextTick, onMounted, onBeforeUnmount, watch } from "vue";

/**Вычисление позиции и размера активного таба и передвижение ползунка под него*/
export function useTabsSlider(tabs, tab, tabRefs, sliderStyle, trips) {
  
  const updateSlider = () => {
    nextTick(() => {
      const activeIndex = trips ? tabs.indexOf(tab.value)
      : tabs.findIndex((t) => t.value === tab.value);
      const el = tabRefs.value[activeIndex]?.$el ?? tabRefs.value[activeIndex];
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement.getBoundingClientRect();

      sliderStyle.value = {
        width: `${rect.width}px`,
        transform: `translateX(${rect.left - parentRect.left}px)`
      };
    });
  };

  onMounted(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateSlider);
  });

  watch(tab, updateSlider);

  return {
    updateSlider
  };
}
