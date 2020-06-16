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

      if (
        'routes' in data && data['routes'].length > 0
      ) {

        const proxyMenu = new Menu({ commands: commands });
        proxyMenu.title.label = 'Proxy';

        let style = document.createElement('style');
        style.type = 'text/css';


        data['routes'].forEach((el: any) => {
          const command_string = 'proxy-gui-' + el.path;
          const icon_class = 'proxy-icon-' + el.path;

          style.innerHTML += '.' + icon_class + ' {   background-image: url(' + el.icon + '); }\n\n';


          commands.addCommand(command_string, {
            label: el.name,
            caption: 'Open ' + el.name,
            iconClass: icon_class,
            execute: args => {
              let t = new ProxyTab({ name: el.name, fullpath: el.fullpath, icon: icon_class });
              let tb = new MainAreaWidget({ content: t });
              app.shell.add(tb, 'main');
              app.shell.activateById(tb.id);
              return tb;
            },
          });

          launcher.add({
            command: command_string,
            category: 'Proxy',
            rank: 4,
          });

          proxyMenu.addItem({
            command: command_string,
            args: {},
          });

        })

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
  activate,
};

export default extension;