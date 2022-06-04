# DockerEST  
Instrucciones para crear los contenedores y conectarlos:
1. Paso 1: Clonar el repositorio 
* git clone https://github.com/Dhiten/DockerEST.git
2. Paso 2: Crear la imagen dentro de docker
* cd DockerEST
* docker build -t estapp .
3. Paso 3: crear los contenedores con docker compose
* docker-compose up -d
4. Paso 4: Verificar la conexión a la base de datos (Este paso debe hacerse antes que el resto, ya que acá se generan las tablas)
* curl http://localhost:3000/ 
5. Paso 5: En caso de querer registrar un ID y recibir un hash
* curl http://localhost:3000/ID Done ID deberá ser el número que se desea asignar
6. Paso 6: Si se desea verificar un hash y un ID
* curl http://localhost:3000/ID/HASH donde ID y HASH serán los valores que se desean verificar
7. Paso 7: imprimir la tabla S y eliminarla
* curl http://localhost:3000/p/t/s
8. Paso 8: imprimir la tabla A y eliminarla
* curl http://localhost:3000/p/t/a
