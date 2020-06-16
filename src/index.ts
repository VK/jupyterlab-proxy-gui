import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ProxyTab } from './proxytab';

import { ILauncher } from '@jupyterlab/launcher';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { MainAreaWidget } from '@jupyterlab/apputils';

import { Menu } from '@lumino/widgets';

import { requestAPI } from './jupyterlab-proxy-gui';

/**
 * Activate function of the plugin
 */
function activate(
  app: JupyterFrontEnd,
  launcher: ILauncher,
  menu: IMainMenu
): void {
  requestAPI<any>('proxygui')
    .then(data => {
      const { commands } = app;
      if ('routes' in data && data['routes'].length > 0) {
        const proxyMenu = new Menu({ commands: commands });
        proxyMenu.title.label = 'Proxy';

        const style = document.createElement('style');
        style.type = 'text/css';

        data['routes'].forEach((el: any) => {
          const commandString = 'proxy-gui-' + el.path;
          const iconClass = 'proxy-icon-' + el.path;

          style.innerHTML +=
            '.' +
            iconClass +
            ' {   background-image: url(' +
            el.icon +
            '); }\n\n';

          commands.addCommand(commandString, {
            label: el.name,
            caption: 'Open ' + el.name,
            iconClass: iconClass,
            execute: args => {
              const t = new ProxyTab({
                name: el.name,
                fullpath: el.fullpath,
                icon: iconClass
              });
              const tb = new MainAreaWidget({ content: t });
              app.shell.add(tb, 'main');
              app.shell.activateById(tb.id);
              return tb;
            }
          });

          launcher.add({
            command: commandString,
            category: 'Proxy',
            rank: 4
          });

          proxyMenu.addItem({
            command: commandString,
            args: {}
          });
        });

        menu.addMenu(proxyMenu, { rank: 40 });
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    })
    .catch(reason => {
      console.error(
        `The jupyterlab_proxy_gui server extension appears to be missing.\n${reason}`
      );
    });
}

/**
 * Initialization data for the extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-proxy-gui',
  requires: [ILauncher, IMainMenu],
  autoStart: true,
  activate
};

export default extension;
