const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const filesPath = 'dist/apps/converted-pay';
const indexPath = path.join(filesPath, 'index.html');

// Find the styles CSS files
const files = getFilesFromPath(filesPath, '.css');
let data = [];

if (!files || files.length <= 0) {
  console.log('Cannot find style files to purge.');
  return;
}

for (let f of files) {
  // Get original file size
  const originalSize = getFilesizeInKiloBytes(filesPath + '/' + f) + 'kb';
  var o = { file: f, originalSize: originalSize, newSize: '' };
  data.push(o);
}

console.log('Run PurgeCSS...');

exec(
  'purgecss --config ./apps/converted-pay/purge-css.config.js',
  function (error, stdout, stderr) {
    if (error) {
      console.error(`Error during PurgeCSS execution: ${error}`);
      return;
    }
    console.log('PurgeCSS done');

    let updatedFiles = [];

    for (let d of data) {
      // Get the original file path
      let filePath = filesPath + '/' + d.file;

      // Strip old hash if it exists
      const ext = path.extname(d.file);
      let baseName = path.basename(d.file, ext);
      const oldHashRegex = /\.[a-z0-9]{16}$/; // Match existing hash (8-character hex)
      if (oldHashRegex.test(baseName)) {
        baseName = baseName.replace(oldHashRegex, ''); // Remove old hash
      }

      // Generate a new hash for the file content
      const newHash = generateHash(fs.readFileSync(filePath));
      const newFileName = `${baseName}.${newHash}${ext}`;
      const newFilePath = filesPath + '/' + newFileName;

      // Rename the file with the new hash
      fs.renameSync(filePath, newFilePath);

      // Store the original and new filenames for updating the index.html
      updatedFiles.push({ oldFile: d.file, newFile: newFileName });

      // Get new file size
      const newSize = getFilesizeInKiloBytes(newFilePath) + 'kb';
      d.newSize = newSize;
      d.file = newFileName; // Update data object with the new file name
    }

    // Update the CSS links in index.html
    updateCssLinksInHtml(indexPath, updatedFiles);

    console.table(data);
  }
);

function getFilesizeInKiloBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
  let files = fs.readdirSync(dir);
  return files.filter((e) => path.extname(e).toLowerCase() === extension);
}

function generateHash(content) {
  return crypto.createHash('md5').update(content).digest('hex').substr(0, 8);
}

function updateCssLinksInHtml(htmlFilePath, updatedFiles) {
  try {
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    updatedFiles.forEach(({ oldFile, newFile }) => {
      // Regex for <link> with media="print" and onload="this.media='all'"
      const linkWithMediaRegex = new RegExp(
        `<link\\s+rel="stylesheet"\\s+href="${oldFile}"[^>]*media="print"[^>]*onload="this\\.media='all'"`,
        'g'
      );
      // Regex for <link> without media="print"
      const linkWithoutMediaRegex = new RegExp(
        `<link\\s+rel="stylesheet"\\s+href="${oldFile}"`,
        'g'
      );

      // Update <link> tags with or without media="print"
      htmlContent = htmlContent.replace(
        linkWithMediaRegex,
        `<link rel="stylesheet" href="${newFile}" media="print" onload="this.media='all'"`
      );
      htmlContent = htmlContent.replace(
        linkWithoutMediaRegex,
        `<link rel="stylesheet" href="${newFile}"`
      );

      // Regex to update <noscript> tags
      const noscriptRegex = new RegExp(
        `<noscript>\\s*<link\\s+rel="stylesheet"\\s+href="${oldFile}"[^>]*>\\s*</noscript>`,
        'g'
      );
      htmlContent = htmlContent.replace(
        noscriptRegex,
        `<noscript><link rel="stylesheet" href="${newFile}"></noscript>`
      );
    });

    // Write the updated content back to index.html
    fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');

    console.log(`Updated CSS links and noscript tags in ${htmlFilePath}`);
  } catch (err) {
    console.error(`Error updating CSS links in ${htmlFilePath}: ${err}`);
  }
}
