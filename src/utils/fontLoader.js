// eslint-disable-next-line import/no-extraneous-dependencies
import WebFont from 'webfontloader'; // шрифты

// Кеш для предотвращения повторной загрузки
const loadedFonts = new Set();

/**
 * Загрузка шрифтов с Google Fonts
 * @param {string[]} families - имена шрифтов
 */
export function loadGoogleFonts(families) {
  const newFonts = families.filter((f) => !loadedFonts.has(f));
  if (newFonts.length === 0) return;
  WebFont.load({
    google: { families: newFonts },
    active() {
      newFonts.forEach((f) => loadedFonts.add(f));
    },
  });
}
