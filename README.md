# queue-management

## Descripción

Este sistema utliza como base las tecnologías Nodejs, ExpressJs, Mongodb, Socket.io, TailwindCss

¿Para que sirve?
- Sirve como gestor de filas en atención al cliente.

¿Puedo utilizarlo en mi negocio?
- ¡Si claro!, es completamente Open source.

¿Como lo configuro?
- Se debe modificar el parametro 'DATABASE_URL' dentro de app.js, colocando el correspondiente a tu base de datos

¿Se pueden crear usuarios?
- tiene un apartado para la creacion de usuarios

¿Que tipo de APIs maneja este sistema?
- las urls de las apis se desplegarán en la consola al momento de iniciar el servidor

¿Que comando se usa para iniciarlizarlo?
- El comando a utilizar es 'npm un start'

Datos extras:
- Actualmente esta en un desarrollo temprano, ¡sos libre de aportar o de crear una rama con tus propias modificaciones!
- Utiliza 2 instancias de tailwind.css una local que compila solo lo necesario con el parametro 'npm run build:css', 
y otra por cdn para utilizar tailwind en su totalidad en el caos de requerirse en desarrollo (al momento de compilar puede eliminarlo)