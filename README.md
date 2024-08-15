# ELSA SHELTER

## Funciones

1. Permite registrarse e ingresar usando email y contraseña para adoptantes y voluntarios (Superusers/admins desde la consola de django)
2. Permite ver las mascotas en adopción y mandar solicitudes de adopción
3. Permite ver las solicitudes. En caso sea admin o voluntario, puede aceptarlas o rechazarlas
4. Permite ver el listado de adoptantes (Si el usuario es voluntario o admin) y voluntarios existentes (Solo si es admin)
5. Permite ver el listado de todas las entidades (Solo si es admin)
6. Permite crear nuevas entidades, actualizarlas, y borrarlas (Solo si es admin)

## Instrucciones para levantar el proyecto localmente

### Backend

1. Dirigirse a la carpeta /backend
2. Correr comando `pip install -r requirements.txt`
3. Agregar un string random como variable de entorno para `DJANGO_SECRET`
4. Correr el comando  `python manage.py migrate` para iniciar la base de datos
5. Correr el comando  `python manage.py runserver` para iniciar el proyecto

### Frontend

1. Dirigirse a la carpeta /frontend
2. Correr comando `npm install`
3. Agregar la dirección del backend local a `/frontend/.env`. Tiene que ser en este formato `http://tudirección/api/`, y la agregas a la variable `REACT_APP_API_URL`.
4. Agregar una contraseña random a `REACT_APP_PASSWORD_FOR_ADMIN_CREATED_USER` para `/frontend/.env`. Esta contraseña se usa para los usuarios creados por un admin
5. Agregar la dirección del frontend local `REACT_FRONTEND_URL_LOCAL` en `/backend/.env`. Lo más probable es que sea `http://localhost:3000/api/`
6. Correr el comando  `npm run start` para iniciar el proyecto

## SonarCloud

[Reporte de SonarCloud](https://sonarcloud.io/project/overview?id=Arix69sex_fullstack-technical-test)