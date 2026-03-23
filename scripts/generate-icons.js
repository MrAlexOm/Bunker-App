const fs = require('fs');
const path = require('path');

// Создаём правильную структуру папок для иконок
const createIconStructure = () => {
  const assetsDir = path.join(__dirname, '../assets');
  
  // Проверяем существует ли основная иконка
  const mainIcon = path.join(assetsDir, 'icon.png');
  
  if (!fs.existsSync(mainIcon)) {
    console.log('❌ Основная иконка icon.png не найдена!');
    return false;
  }
  
  console.log('✅ Основная иконка найдена');
  
  // Проверяем размеры иконок
  const stats = fs.statSync(mainIcon);
  const fileSizeKB = Math.round(stats.size / 1024);
  
  console.log(`📊 Размер icon.png: ${fileSizeKB} KB`);
  
  if (fileSizeKB > 500) {
    console.log('⚠️ Иконка слишком большая! Оптимальный размер: 100-300KB');
    console.log('💡 Рекомендуется оптимизировать иконку до 1024x1024 пикселей');
  }
  
  // Проверяем iOS иконку
  const iosIcon = path.join(assetsDir, 'ios-icon.png');
  if (!fs.existsSync(iosIcon)) {
    console.log('❌ iOS иконка не найдена!');
    console.log('💡 Создаём копию основной иконки для iOS...');
    fs.copyFileSync(mainIcon, iosIcon);
    console.log('✅ iOS иконка создана');
  }
  
  return true;
};

createIconStructure();
