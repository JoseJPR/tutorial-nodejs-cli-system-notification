// Import main dependencies.
import fs from 'fs';

export default (diretoryPath) => new Promise((resolve, reject) => {
  // Check the required params.
  if (!diretoryPath) reject(new Error('The diretoryPath param is required.'));

  // Read the list of files from a local directory.
  fs.readdir(diretoryPath, (err, files) => {
    resolve(files);
  });
});
