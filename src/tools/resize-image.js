// Import main dependencies.
import Jimp from 'jimp';

export default async (options) => {
  try {
    const {
      originPath, destinationPath, width, height,
    } = options;
    // Check the required params.
    if (!width && !height) throw new Error('You need to specify at least the new Width or Height or both.');
    if (!originPath || !destinationPath) throw new Error('originPath and destinationPath params are required.');

    // Execute Jimp in order to read image and resize with the new custom size.
    const lenna = await Jimp.read(originPath);
    const result = lenna.resize(width || Jimp.AUTO, height || Jimp.AUTO).write(destinationPath);
    return result;
  } catch (err) {
    return err;
  }
};
