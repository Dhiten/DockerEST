# DockerEST  
Instrucciones para crear los contenedores y conectarlos:
1. Paso 1: Clonar el repositorio 
* git clone https://github.com/Dhiten/DockerEST.git
2. Paso 2: Crear la imagen dentro de docker
* cd DockerEST
* docker build -t estapp .
3. Paso 3: crear los contenedores con docker compose
* docker-compose up -d
