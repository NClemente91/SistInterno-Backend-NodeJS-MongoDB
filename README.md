# Sistema Interno - Red de locales de venta de ropa

API Restful la cual implementa dos CRUDs. <br>
Proyecto realizado a modo educativo.<br>

## Instalación

1. Forkeá y cloná el repositorio
   ​
2. Parado en la raíz del proyecto corré el comando
   ​
   ```
   npm install
   ```
   ​
   para instalar todas las dependecias del proyecto
   ​
3. Para poder correr el servidor se deben completar ciertas variables de entorno, las cuales no se encuentran disponibles debido a que son datos sensibles. Modifica el archivo
   ​

   ```
   .env.example >>> .env
   ```

   ​
   se debe colocar una clave privada y el link de conexión a la base de datos MongoDB

4. Usá
   ​
   ```
   npm start
   ```
   ​
   para correr el proyecto, que estará disponible en http://localhost:3000

## Se utilizó 📋

-Express

-MongoDB

-Mongoose

-Morgan

-Dotenv

-Joi

-Bcryptjs

-Cors

-Jsonwebtoken
