const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 🖼️ Image Optimization Script untuk Website TopUp Game Premium
// Script ini akan mengoptimalkan semua gambar untuk performa terbaik

const QUALITY_SETTINGS = {
  jpeg: { quality: 85, progressive: true },
  png: { quality: 90, compressionLevel: 8 },
  webp: { quality: 85, effort: 6 },
};

const SIZES = {
  games: { width: 512, height: 512 },
  providers: { width: 256, height: 256 },
  banners: { width: 1920, height: 1080 },
  icons: { width: 192, height: 192 },
};

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const { width, height, format = 'webp' } = options;
    
    let sharpInstance = sharp(inputPath);
    
    if (width && height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'cover',
        position: 'center'
      });
    }
    
    // Convert to WebP for better compression
    if (format === 'webp') {
      sharpInstance = sharpInstance.webp(QUALITY_SETTINGS.webp);
    } else if (format === 'jpeg') {
      sharpInstance = sharpInstance.jpeg(QUALITY_SETTINGS.jpeg);
    } else if (format === 'png') {
      sharpInstance = sharpInstance.png(QUALITY_SETTINGS.png);
    }
    
    await sharpInstance.toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${savings}% smaller)`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

async function processDirectory(dirPath, category) {
  if (!fs.existsSync(dirPath)) {
    console.log(`📁 Directory ${dirPath} does not exist, creating...`);
    fs.mkdirSync(dirPath, { recursive: true });
    return;
  }
  
  const files = fs.readdirSync(dirPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );
  
  if (imageFiles.length === 0) {
    console.log(`📂 No images found in ${dirPath}`);
    return;
  }
  
  console.log(`\n🖼️  Processing ${imageFiles.length} images in ${category}...`);
  
  const sizeConfig = SIZES[category] || {};
  
  for (const file of imageFiles) {
    const inputPath = path.join(dirPath, file);
    const nameWithoutExt = path.parse(file).name;
    const outputPath = path.join(dirPath, `${nameWithoutExt}.webp`);
    
    // Skip if WebP version already exists and is newer
    if (fs.existsSync(outputPath)) {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      
      if (outputStats.mtime > inputStats.mtime) {
        console.log(`⏭️  Skipping ${file} (WebP version is up to date)`);
        continue;
      }
    }
    
    await optimizeImage(inputPath, outputPath, {
      ...sizeConfig,
      format: 'webp'
    });
  }
}

async function generateFavicons() {
  const iconPath = path.join(__dirname, 'public', 'images', 'icons');
  const faviconSource = path.join(iconPath, 'icon.png');
  
  if (!fs.existsSync(faviconSource)) {
    console.log('⚠️  No icon.png found for favicon generation');
    return;
  }
  
  console.log('\n🔖 Generating favicons...');
  
  const faviconSizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];
  
  for (const size of faviconSizes) {
    const outputPath = path.join(__dirname, 'public', `icon-${size}x${size}.png`);
    await optimizeImage(faviconSource, outputPath, {
      width: size,
      height: size,
      format: 'png'
    });
  }
  
  // Generate favicon.ico
  try {
    await sharp(faviconSource)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon.ico'));
    console.log('✅ favicon.ico generated');
  } catch (error) {
    console.log('❌ Failed to generate favicon.ico:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...');
  console.log('==================================');
  
  const categories = [
    { name: 'games', path: path.join(__dirname, 'public', 'images', 'games') },
    { name: 'providers', path: path.join(__dirname, 'public', 'images', 'providers') },
    { name: 'banners', path: path.join(__dirname, 'public', 'images', 'banners') },
    { name: 'icons', path: path.join(__dirname, 'public', 'images', 'icons') }
  ];
  
  for (const category of categories) {
    await processDirectory(category.path, category.name);
  }
  
  await generateFavicons();
  
  console.log('\n🎉 Image optimization completed!');
  console.log('==================================');
  console.log('💡 Tips:');
  console.log('• WebP format provides better compression than JPEG/PNG');
  console.log('• Original files are kept for backup');
  console.log('• Run this script after adding new images');
  console.log('• Check public/images/ folders for optimized files');
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  main().catch(console.error);
} catch (error) {
  console.log('📦 Sharp not found. Installing...');
  console.log('Run: npm install sharp --save-dev');
  console.log('Then run this script again.');
}