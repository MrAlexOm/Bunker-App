const fs = require('fs');
const path = require('path');

// Path to the generated index.html
const indexPath = path.join(__dirname, 'dist', 'index.html');

console.log('🔧 Post-build: Fixing absolute paths in index.html...');

try {
  // Read the index.html file
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Replace absolute paths with relative paths
  content = content.replace(/src="\/_expo/g, 'src="./_expo');
  content = content.replace(/href="\/_/g, 'href="./_');
  content = content.replace(/href="\/favicon/g, 'href="./favicon');
  
  // Replace Day X with BUNKER
  content = content.replace(/Day X/g, 'BUNKER');
  
  // Write the fixed content back
  fs.writeFileSync(indexPath, content, 'utf8');
  
  console.log('✅ Post-build: Paths fixed successfully!');
  console.log('📁 Ready for deployment to Netlify');
  
} catch (error) {
  console.error('❌ Post-build error:', error);
  process.exit(1);
}
