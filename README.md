# DockerEST
Instrucciones para crear los contenedores y conectarlos: 
Paso 1: Clonar el repositorio 
$ git clone https://github.com/Dhiten/DockerEST.git
Paso 2: Crear la imagen dentro de docker
$ docker build estapp
Paso 3: Crear una red local: 
$ docker network create --atachable EstRed (creo la red)
Paso 4: Crear un contenedor con mongo db
$ docker run -d --name db mongo (creo el contenedor de la BBDD)
Paso 5: Conectar el  contenedor a la red:
$ docker network connect EstRed db
Paso 6: Usar la imagen creada en el paso 2 para crear un contendor:
$ docker run -d -name app -p 3000:3000 --env MONGO_URL=mondodb://db:27017/test estapp
Paso 7: Conectar el app a la red
$ docker network connect EstRed app 