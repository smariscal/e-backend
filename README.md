# e-backend
backend of e-commerce 

# Como utilizar
El proyecto contiene un .env el cual funciona para parametrizar el proyecto, ademas se podra establecer la base de datos con la cual podra trabajar los productos y el carrito. Las opciones validas son:
-mongoDB
-firebase
-file
-memory

dentro de la carpeta config se encuentran la conexion con firebase.

Nota: se subieron estos archivos solo para que se puedan probar, deberian estar en el .gitignore

# Rutas utilizadas productos
GET api/products/
recupera todos los productos

POST api/products/
graba nuevo producto

GET api/products/<id>
recupera producto <id>

PUT api/products/<id>
actualiza producto <id>

DELETE api/products/<id>
elimina producto <id>

# Rutas utilizadas carrito
POST api/cart
crea un nuevo carrito

GET api/cart/<id>/productos
recupera los productos del carrito <id>

POST api/cart/<id>/productos
agrega producto al carrito <id>

DELETE api/cart/<id>
elimina el carrito <id>

DELETE api/cart/<id>/productos/<idprod>
elimina el producto <idprod> del carrito <id>