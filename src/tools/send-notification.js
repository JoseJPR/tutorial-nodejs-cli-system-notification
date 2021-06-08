// Import main dependencies.
import { NotificationCenter } from 'node-notifier';
import open from 'open';

export default async (options) => {
  try {
    // Check the required params.
    const { title, message, directoryPathToOpen } = options;
    if (!title || !message) throw new Error('Title and message params are required.');

    // Define notifier instance and launch it.
    const notifier = new NotificationCenter({ withFallback: false, customPath: undefined });
    notifier.notify({ title, message });

    // Opens the URL in the default browser or file explorer.
    if (directoryPathToOpen) {
      notifier.on('click', () => open(directoryPathToOpen));
    }
    return true;
  } catch (err) {
    return err;
  }
};
