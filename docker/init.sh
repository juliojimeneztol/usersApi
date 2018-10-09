BASEDIR=$PWD/../
echo "$BASEDIR"
echo "Creacion de imagen docker"
docker build . -t gigigo
echo "Creacion de contenedor"
cd $BASEDIR
echo "$PWD"
docker run -itd -v $PWD:/var/www/sites/ --net claroshop --ip 192.168.56.10 -p 9080:80 -p 9022:22 -p 9006:3306 --privileged --name gigigo gigigo
echo "Provision puppet"
docker exec -ti gigigo ./setup.sh