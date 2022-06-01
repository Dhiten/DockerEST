# DockerEST  
Instrucciones para crear los contenedores y conectarlos: 
1. Paso 1: Clonar el repositorio 
$ git clone https://github.com/Dhiten/DockerEST.git
2. Paso 2: Crear la imagen dentro de docker
$ docker build estapp
3. Paso 3: Crear una red local: 
$ docker network create --atachable EstRed (creo la red)
4. Paso 4: Crear un contenedor con mongo db
$ docker run -d --name db mongo (creo el contenedor de la BBDD)
5. Paso 5: Conectar el  contenedor a la red:
$ docker network connect EstRed db
6. Paso 6: Usar la imagen creada en el paso 2 para crear un contendor:
$ docker run -d -name app -p 3000:3000 --env MONGO_URL=mondodb://db:27017/test estapp
7. Paso 7: Conectar el app a la red
$ docker network connect EstRed app 
