/**
 * Извлечение уникальных font-family из DOM
 */
export function extractUsedFonts() {
  const elements = document.querySelectorAll('*');
  const fontFamilies = new Set();

  elements.forEach((el) => {
    const style = window.getComputedStyle(el);
    const { fontFamily } = style;
    if (fontFamily) {
      // имя шрифта до ","
      const match = fontFamily.match(/["']?([^,"']+)["']?/);
      if (match && match[1]) fontFamilies.add(match[1].trim());
    }
  });

  return Array.from(fontFamilies);
}
