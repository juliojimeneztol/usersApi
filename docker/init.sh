BASEDIR=$PWD/../
echo "$BASEDIR"
echo "Creacion de imagen docker"
docker build . -t gigigo
echo "Creacion del network"
docker network create --driver=bridge --subnet=192.168.0.0/16 --ip-range=192.168.56.0/24 --gateway=192.168.56.1 gigigo
echo "Creacion de contenedor"
cd $BASEDIR
docker run -itd -v $PWD:/var/www/sites/ --net gigigo --ip 192.168.56.10 -p 9080:80 -p 9022:22 -p 9006:3306 --privileged --name gigigo gigigo
#docker run -itd -v $PWD:/var/www/sites/ -p 9080:80 -p 9022:22 -p 9006:3306 --privileged --name gigigo gigigo
echo "Provision puppet"
docker exec -ti gigigo ./setup.sh
echo "Container stop"
docker stop gigigo
echo "Container stop"
docker start gigigo
echo "Redis start"
docker exec -ti gigigo /usr/bin/systemctl start redis 
echo "Redis enable"
docker exec -ti gigigo /usr/bin/systemctl enable redis 