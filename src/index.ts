import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './jupyterlab-proxy-gui';

/**
 * Initialization data for the jupyterlab-proxy-gui extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-proxy-gui',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-proxy-gui is activated!');

    requestAPI<any>('proxygui')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyterlab_proxy_gui server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default extension;
