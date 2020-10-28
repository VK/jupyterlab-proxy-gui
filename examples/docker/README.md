# jupyterlab-proxy-gui -- Docker Example

A basic example where **jupyterlab-proxy-gui** is used to add a Mongo Express web interface to the JupyterLab GUI.

## Run
```
docker-compose up --build
```
**Username:** test  
**Password:** test


## Config Files
* **.jupyterlab-proxy-gui-config.json**:  
A configuration file that contains the endpoints to be published. This file is saved in the home directory of the Jupyterhub test user.
* **defaults.cfg**:  
 Contains the authentication token for the ConfigurableHTTPProxy. If not available, the environment variable `CONFIGPROXY_AUTH_TOKEN` is used.
* **jupyterhub_config.py**   
Setup file for JupyterHub (ConfigurableHTTPProxy and JupyterLab as default).