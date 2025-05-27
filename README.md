# Backend - API RESTful CRUD Productos y Usuarios

## Descripción
Este backend está desarrollado con **Node.js** y **Express**. Proporciona un API REST para manejar CRUD completos de productos y usuarios, persistiendo los datos en archivos JSON (`productos.json` y `usuarios.json`).

## Tecnologías
- Node.js
- Express
- fs (para manejar archivos JSON)
- CORS habilitado

## Estructura
- Rutas separadas para productos y usuarios (`routes/productos.js` y `routes/usuarios.js`).
- Controladores organizados para cada entidad.
- Persistencia en archivos JSON para mantener los datos entre ejecuciones.

## Endpoints principales
### Productos
- `GET /productos` - Listar todos los productos
- `POST /productos` - Crear un nuevo producto
- `PUT /productos/:id` - Actualizar producto por ID
- `DELETE /productos/:id` - Eliminar producto por ID

### Usuarios
- `GET /usuarios` - Listar todos los usuarios
- `POST /usuarios` - Crear un nuevo usuario
- `PUT /usuarios/:id` - Actualizar usuario por ID
- `DELETE /usuarios/:id` - Eliminar usuario por ID

## Instalación y ejecución
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd backend

2. Instalar dependencias:
    npm install

3. Ejecutar el servidor:
    npm run dev

### Notas Importantes

- Asegurarse que existan los archivos productos.json y usuarios.json en la carpeta raíz o donde se definió.

- El backend tiene habilitado CORS para permitir la conexión desde el frontend React.

### Testing Rapido

- Puedes probar la API con Postman o similar para verificar los endpoints.