import { IFrame } from '@jupyterlab/apputils';

/**
 * A widget which manages an iframe routing to the proxy url
 */
export class ProxyTab extends IFrame {
  /**
   * Construct a new iframe.
   */
  constructor(options?: ProxyTab.IOptions) {
    super({
      sandbox: [
        'allow-scripts',
        'allow-forms',
        'allow-modals',
        'allow-same-origin'
      ]
    });

    // Initialize settings.
    this.id = `jp-ProxyTab-${Private.id++}`;
    this.title.label = options.name;
    this.title.icon = options.icon;
    this.title.closable = true;
    this.title.caption = 'Name: ' + options.name;
    const url = new URL(document.URL.split('?')[0]);
    url.pathname = options.fullpath;

    this.url = url.href;

    const iframeElement = this.node.children[0] as HTMLHtmlElement;

    //some pages don't want to use 100% of the height :)
    iframeElement.onload = function(): void {
      iframeElement.style.height = '100%';
      setTimeout(() => {
        iframeElement.style.height = '100%';
      }, 50);
      setTimeout(() => {
        iframeElement.style.height = '100vh';
      }, 100);
      setTimeout(() => {
        iframeElement.style.height = '100%';
      }, 200);
      setTimeout(() => {
        iframeElement.style.height = '100vh';
      }, 400);
      setTimeout(() => {
        iframeElement.style.height = '100%';
      }, 500);
    };
  }
}

export declare namespace ProxyTab {
  interface IOptions {
    name: string;
    fullpath: string;
    icon: string;
  }
}

namespace Private {
  /* eslint-disable */
  export let id = 0;
  /* eslint-enable */
}
