// Import main dependencies.
import path from 'path';
import dotenv from 'dotenv';
import enquirer from 'enquirer';
import logger from 'pino';

// Import tools.
import resizeImage from './tools/resize-image.js';
import readDirectory from './tools/read-directory.js';
import sendNotification from './tools/send-notification.js';
import { showMessage, clearTerminal } from './tools/prompt.js';

// Import constants.
import UI from './config/ui.js';

// Init dotenv in order to load .env file content.
dotenv.config();

(async () => {
  try {
    // Clear terminal and show welcome message and init form to execute or not the process.
    clearTerminal();
    showMessage(UI.WELCOME);
    const { execute } = await enquirer.prompt(UI.INPUT);
    if (execute === UI.INPUT.choices[1].value) {
      showMessage(UI.BYE_BYE);
      process.exit(0);
    }

    // Get the list of images from origin directory.
    const images = await readDirectory(process.env.ORIGIN_IMAGES_PATH);

    // Iterate in order to resize the images.
    const allTasks = images.map((image) => resizeImage({
      originPath: path.resolve(`${process.env.ORIGIN_IMAGES_PATH}/${image}`),
      destinationPath: path.resolve(`${process.env.DESTINATION_IMAGES_PATH}/${path.basename(image)}`),
      width: 400,
    }));
    await Promise.all(allTasks);
    // Send notification in order to alert the user that the process is finished.
    await sendNotification({
      title: UI.NOTIFICATION.TITLE,
      message: UI.NOTIFICATION.MESSAGE,
      directoryPathToOpen: path.resolve(process.env.DESTINATION_IMAGES_PATH),
    });
    showMessage(UI.BYE_BYE);
  } catch (err) {
    logger.error(err);
  }
})();
