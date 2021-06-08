export default {
  WELCOME: `👋 Welcome! This CLI application allows you to resize multiple images.

  Remember that you must add the images in the ./resources/ folder. (In this tutorial there are two.)
  `,
  INPUT: {
    type: 'select',
    name: 'execute',
    message: 'Do you want to start the process?',
    choices: [
      { text: 'Yes', value: 'yes' },
      { text: 'No', value: 'no' },
    ],
  },
  BYE_BYE: 'Process finished. See you soon!',
  NOTIFICATION: {
    TITLE: 'Image Magic Tool',
    MESSAGE: 'All the images has been resized. Click here in order to open the main folder.',
  },
};
