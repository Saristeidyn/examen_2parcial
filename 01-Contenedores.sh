# comandos para levantar cnotenedores

docker run <Imagen del contendor> || docker container run <Imagen del contenedor>
docker run  hello-world || docker container run hello-world

docker run -d -p 8080:80 docker/getting-started || docker container run -d -p 8080:80 docker/getting-started

# Comando para ver todos los contenedores
docker ps -a || docker container ls -a

# apagar contenedor
docker  stop <id-Contenedor> || docker container stop <Id-Contenedor>

# Encender un contenedor
docker start <Id-Contenedor> || docker container start <Id-Contenedor>

# Remover un contenedor
docker rm -fv <Id-Contenedor> || docker container rm -fv <Id-Contenedor

docker container run --name=ubuntu -d ubuntu