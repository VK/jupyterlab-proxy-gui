# setup jupyterlab as default
c.Spawner.default_url = 'lab'

# use the config file to setup the Proxy auth_token
import configparser
config = configparser.ConfigParser()
config.read('/defaults.cfg')
c.ConfigurableHTTPProxy.auth_token = config["ConfigurableHTTPProxy"]["auth_token"]