const fs = require('fs');
const path = require('path');

// Fix absolute paths to relative in dist/index.html
const indexPath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Replace absolute paths with relative paths
  content = content.replace(/src="\/_expo\//g, 'src="./_expo/');
  content = content.replace(/href="\/_expo\//g, 'href="./_expo/');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Fixed paths in dist/index.html');
} else {
  console.log('❌ dist/index.html not found');
}
