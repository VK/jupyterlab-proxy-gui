import json
import os
from os import environ
import configparser

from notebook.base.handlers import APIHandler
from notebook.utils import url_path_join
import tornado

import requests

auth_token = ""
base_url = ""
proxy_config = { "routes": [] }


def register_proxy_routes():
    global auth_token
    global proxy_config
    
    headers = {'Authorization': "access_token {}".format(auth_token) }
    proxyurl = "http://127.0.0.1:8001"
    
       
    for r in proxy_config["routes"]:
        try:
            
            request_url = "{}{}".format(proxyurl, os.path.join("/api/routes/", base_url[1:], r["path"]))
            r["fullpath"] = os.path.join(base_url, r["path"])

            if ("rootpath" in r and r["rootpath"]):
                request_url = "{}{}".format(proxyurl, os.path.join("/api/routes/", r["path"]))
                r["fullpath"] = os.path.join( "/", r["path"])

            requests.post(request_url, headers=headers, data=json.dumps(r["proxy"]))
        except:
            pass

        if "extra" in r:
            for e in r["extra"]:
                try:
                    request_url = "{}{}".format(proxyurl, os.path.join("/api/routes/", e["path"]))
                    requests.post(request_url, headers=headers, data=json.dumps(e["proxy"]))
                except:
                    pass


    

class GetConfigHandler(APIHandler):
    @tornado.web.authenticated
    def get(self):
        global proxy_config
        register_proxy_routes()
        self.finish(json.dumps(proxy_config))




def setup_handlers(web_app):

    
    global auth_token
    global base_url
    global proxy_config
    
    host_pattern = ".*$"
    
    #try to load the config file
    try:
        with open(".jupyterlab-proxy-gui-config.json", "r") as f:
            proxy_config = json.loads(f.read())
    except:
        pass
    
    try:
        #try to read proxy auth token form env variable
        if environ.get('CONFIGPROXY_AUTH_TOKEN') is not None:
            auth_token = environ.get('CONFIGPROXY_AUTH_TOKEN')
        else:
            #try to read proxy auth token from config file
            config = configparser.ConfigParser()
            config.read('/defaults.cfg')
            auth_token = config["ConfigurableHTTPProxy"]["auth_token"]
    except:
        pass
        
    base_url = web_app.settings["base_url"]

   
    get_config_pattern = url_path_join(base_url, "jupyterlab-proxy-gui", "proxygui")
    handlers = [(get_config_pattern, GetConfigHandler)]
    web_app.add_handlers(host_pattern, handlers)

    