import json

from notebook.base.handlers import APIHandler
from notebook.utils import url_path_join
import tornado

import requests


class GetConfigHandler(APIHandler):
    @tornado.web.authenticated
    def get(self):
        data = { "routes": [] }
        #try:
        with open("jupyterlab-proxy-gui-config.json", "r") as f:
            data = json.loads(f.read())
        #except:
        #    pass

        headers = {'Authorization': "access_token {}".format(config["ConfigurableHTTPProxy"]["auth_token"]) }
        baseurl = "http://127.0.0.1:8001"

        for r in data["routes"]:
            requests.post("{}/api/routes/user/{}/{}".format(baseurl, "name", r["path"]), headers=headers, data=json.dumps(d["proxy"]))

        self.finish(json.dumps(data))

def setup_handlers(web_app):
    host_pattern = ".*$"
    
    base_url = web_app.settings["base_url"]
    get_config_pattern = url_path_join(base_url, "jupyterlab-proxy-gui", "get_config")
    handlers = [(get_config_pattern, GetConfigHandler)]
    web_app.add_handlers(host_pattern, handlers)
