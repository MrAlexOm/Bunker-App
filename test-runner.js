/**
 * Bunker App - Automated Test Runner
 * Tests core functionality before publishing
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Bunker MVP 2.0 - Automated Testing\n');

// Test 1: Check all language files exist
console.log('📁 Testing language files structure...');
const languages = ['ru', 'en', 'es', 'ar', 'zh'];
const dataFiles = ['danger.json', 'medical.json', 'scenarios.json', 'supplies.json', 'map_points.json'];

let allFilesExist = true;

languages.forEach(lang => {
  dataFiles.forEach(file => {
    const filePath = path.join(__dirname, 'src', 'data', lang, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${lang}/${file}`);
    } else {
      console.log(`❌ MISSING: ${lang}/${file}`);
      allFilesExist = false;
    }
  });
});

// Test 2: Check JSON validity
console.log('\n🔍 Testing JSON validity...');
let allJsonValid = true;

languages.forEach(lang => {
  dataFiles.forEach(file => {
    try {
      const filePath = path.join(__dirname, 'src', 'data', lang, file);
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
      console.log(`✅ Valid JSON: ${lang}/${file}`);
    } catch (error) {
      console.log(`❌ Invalid JSON: ${lang}/${file} - ${error.message}`);
      allJsonValid = false;
    }
  });
});

// Test 3: Check required translations
console.log('\n🌍 Testing required translations...');
const requiredKeys = [
  'sos', 'inDanger', 'findSafety', 'firstAid', 'supplies', 
  'scenarios', 'inPanic', 'home', 'medical', 'inventory', 
  'settings', 'water', 'food', 'batteries', 'people', 
  'days', 'enoughFor', 'dangerousSituations', 'firstAidTitle',
  'inventoryTitle', 'scenariosTitle', 'safePlaces'
];

// Check LanguageContext for required keys
const languageContextPath = path.join(__dirname, 'src', 'contexts', 'LanguageContext.tsx');
const languageContext = fs.readFileSync(languageContextPath, 'utf8');

let allTranslationsPresent = true;
requiredKeys.forEach(key => {
  if (languageContext.includes(`${key}:`)) {
    console.log(`✅ Translation key: ${key}`);
  } else {
    console.log(`❌ Missing translation key: ${key}`);
    allTranslationsPresent = false;
  }
});

// Test 4: Check build files
console.log('\n📦 Testing build files...');
const distPath = path.join(__dirname, 'dist');
const requiredDistFiles = ['index.html', 'favicon.ico', 'metadata.json'];

let buildReady = true;
if (fs.existsSync(distPath)) {
  requiredDistFiles.forEach(file => {
    const filePath = path.join(distPath, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ Build file: ${file}`);
    } else {
      console.log(`❌ Missing build file: ${file}`);
      buildReady = false;
    }
  });
  
  // Check for JS bundle
  const jsFiles = fs.readdirSync(path.join(distPath, '_expo', 'static', 'js', 'web'));
  if (jsFiles.some(f => f.includes('index-'))) {
    console.log('✅ JS bundle found');
  } else {
    console.log('❌ JS bundle missing');
    buildReady = false;
  }
} else {
  console.log('❌ dist folder missing');
  buildReady = false;
}

// Test 5: Check RTL support
console.log('\n🔄 Testing RTL support...');
const rtlFiles = ['HomeScreen.tsx', 'BigButton.tsx', 'SafetyScreen.tsx'];
let rtlSupport = true;

rtlFiles.forEach(file => {
  const filePath = path.join(__dirname, 'src', 'screens', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('isRTL')) {
      console.log(`✅ RTL support: ${file}`);
    } else {
      console.log(`❌ No RTL support: ${file}`);
      rtlSupport = false;
    }
  }
});

// Test 6: Check geolocation support
console.log('\n📍 Testing geolocation support...');
const safetyScreenPath = path.join(__dirname, 'src', 'screens', 'SafetyScreen.tsx');
const safetyScreen = fs.readFileSync(safetyScreenPath, 'utf8');

const geolocationFeatures = [
  'navigator.geolocation',
  'getCurrentLocation',
  'getDistanceFromLatLonInKm',
  'formatDistance'
];

let geolocationSupport = true;
geolocationFeatures.forEach(feature => {
  if (safetyScreen.includes(feature)) {
    console.log(`✅ Geolocation feature: ${feature}`);
  } else {
    console.log(`❌ Missing geolocation: ${feature}`);
    geolocationSupport = false;
  }
});

// Test 7: Check offline support
console.log('\n📱 Testing offline support...');
const appPath = path.join(__dirname, 'App.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

if (appContent.includes('LanguageProvider')) {
  console.log('✅ Language context for offline');
} else {
  console.log('❌ Language context missing');
}

// Summary
console.log('\n📊 TEST RESULTS SUMMARY:');
console.log('=========================');

const results = [
  { name: 'Language Files', passed: allFilesExist },
  { name: 'JSON Validity', passed: allJsonValid },
  { name: 'Translations', passed: allTranslationsPresent },
  { name: 'Build Ready', passed: buildReady },
  { name: 'RTL Support', passed: rtlSupport },
  { name: 'Geolocation', passed: geolocationSupport }
];

let allPassed = true;
results.forEach(result => {
  const status = result.passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${result.name}`);
  if (!result.passed) allPassed = false;
});

console.log('\n🎯 FINAL RESULT:');
if (allPassed) {
  console.log('🚀 READY TO PUBLISH! All tests passed.');
  console.log('\n📋 Manual testing still required:');
  console.log('• Language switching in browser');
  console.log('• Geolocation permissions');
  console.log('• Offline mode testing');
  console.log('• RTL Arabic layout');
  console.log('• Chinese character display');
  console.log('• Panic screen swipes');
} else {
  console.log('❌ NOT READY - Fix failed tests before publishing');
}

console.log('\n📱 Open http://localhost:8081 for manual testing');
