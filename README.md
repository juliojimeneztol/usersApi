# usersApi
Rest API users, Docker, Slim, angular

# Docker
Para iniciar el compilado del proyecto ejecutar el script /docker/init.sh
Dependencias: Docker 17.x

Si se ejecuta en sistemas operativos Mac Os, Windows, comentar las lineas 6, 9 y descomentar la linea 10 del script /docker/init.sh

Si existe algun problema en la ejecucion del comando:
docker network create --driver=bridge --subnet=192.168.0.0/16 --ip-range=192.168.56.0/24 --gateway=192.168.56.1 gigigo
puede validar la documentacion oficial:
https://docs.docker.com/engine/reference/commandline/network_create
Es posible omitir la configuracion al comentar las lineas 6, 9 y descomentar la linea 10 del script /docker/init.sh

Si existe algun problema de ejecucion en el script, se pueden ejecutar los comandos de forma manual, el script esta diseñado para sistemas operativos linux.

#Virtual host
La aplicacion se encuantra configurada para resolver bajo los dominios
http://www.front.com -> Angular
http://www.api.com   -> Slim API

Es necesario agregar los siguientes hosts en el archivo de configuracion /etc/hosts
192.168.56.10  www.api.com
192.168.56.10  www.front.com

Para sistemas operativos Mac Os se requiere modificar la ip por localhost.