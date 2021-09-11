# jupyterlab-proxy-gui

![Github Actions Status](https://github.com/VK/jupyterlab-proxy-gui/workflows/Build/badge.svg) [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/VK/jupyterlab-proxy-gui/master?urlpath=lab)
[![npm](https://img.shields.io/npm/v/jupyterlab-proxy-gui.svg?logo=npm)](https://www.npmjs.com/package/jupyterlab-proxy-gui)

A JupyterLab extension show endpoins of proxy routes as new tabs. JupyterHub and the configurable-http-proxy is used to forward the data.

A docker setup can be found at [examples/docker](examples/docker)

![proxy-gui-example](https://raw.githubusercontent.com/VK/jupyterlab-proxy-gui/master/media/example.gif)


This extension is composed of a Python package named `jupyterlab_proxy_gui`
for the server extension and a NPM package named `jupyterlab-proxy-gui`
for the frontend extension.


## Requirements

* JupyterLab >= 3.0
* JupyterHub

## Install

Note: You will need NodeJS to install the extension.

```bash
pip install jupyterlab_proxy_gui
jupyter lab build
```

## Troubleshoot

If you are seeing the frontend extension but it is not working, check
that the server extension is enabled:

```bash
jupyter serverextension list
```

If the server extension is installed and enabled but you are not seeing
the frontend, check the frontend is installed:

```bash
jupyter labextension list
```

If it is installed, try:

```bash
jupyter lab clean
jupyter lab build
```

## Contributing

### Install

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Move to jupyterlab-proxy-gui directory

# Install server extension
pip install -e .
# Register server extension
jupyter serverextension enable --py jupyterlab_proxy_gui --sys-prefix

# Install dependencies
jlpm
# Build Typescript source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter labextension link .
# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
```

You can watch the source directory and run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild the extension and application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter lab --watch
```

### Uninstall

```bash
pip uninstall jupyterlab_proxy_gui
jupyter labextension uninstall jupyterlab-proxy-gui
```
