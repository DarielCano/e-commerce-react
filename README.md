# PRESENTACION

FrontEnd Store es una e-commerce creada con React Js. Consume una API de Firestore a partir de una colección de productos guardadas en su Base de Datos.
Permite además autenticar a usuarios con su servicio de autenticación y navegar por los productos, es decir, ver su detalle, agregarlos al carrito, comprar, consultar compras y cancelar compras.

# INSTALACION

- Clonar repositorio de GitHub.
- Instalar las dependencias (npm install).
- Ejecutar la aplicación con npm run dev

# DEPENDENCIAS INSTALADAS

| Dependencia         | Versión           | Descripción                                                                         |
| :------------------ | :---------------- | :---------------------------------------------------------------------------------- |
| `firebase`          | `^9.20.0`         | Api de google usada para consumir backend                                           |
| :------------------ | :---------------- | :---------------------------------------------------------------------------------- |
| `react-icons`       | `^4.8.0"`         | Librería para añadir íconos al proyecto                                             |
| :------------------ | :---------------- | :---------------------------------------------------------------------------------- |
| `react-router-dom`  | `^6.10.0`         | Para definir las rutas de navegación dentro de nuestra aplicación                   |
| :------------------ | :---------------- | :---------------------------------------------------------------------------------- |
| `react-dom`         | `^18.2.0`         | Para renderizar los componentes de React para el navegador                          |
| :------------------ | :---------------- | :---------------------------------------------------------------------------------- |
| `react-toastify`    | `^9.1.2`          | Para agregar notificaciones a la aplicación como agregar y eliminar del carrito     |
| :------------------ | :---------------- | :---------------------------------------------------------------------------------- |
| `sweetalert2`       | `^11.7.3`         | Para agregar ventanas modales de confirmación y alerta                              |

# DESCRIPCION

- Página de autenticación(inicio de sesión o registro)
  Es la ventana inicial que aparece para autenticarse. Una vez registrado(en caso de ser la primera vez) se envia email para validar cuenta.

- Página Productos
  Muestra todos los productos disponibles extraidos de la base de datos de firebase. Cuenta con menú navegable según categoria elegida.

- Página de Detalle del producto
  Muestra detalles de cada producto seleccionado.

- Página de Carrito
  Muestra los productos agregados, con opcion de eliminar cada uno o todos, consultar alguna compra a traves de id de la compra y comprar

- Página de detalle de la compra
  Muestra la compra realizada y las que se consulten

- La barra de navegación cuenta con icono para cerrar la sesión del usuario activo

## AUTOR

- [@DarielCano](https://www.github.com/DarieCano)

## 🚀 SOBRE MI

[@cv](https://drive.google.com/file/d/1tTkd27bLXFh6M9vCI3uco_lMszwkZcl6/view?usp=share_link)

Soy un desarrollador FrontEnd Junior con experiencia en HTML, CSS y SASS, y REACT JS. Además, soy ingeniero en Telecomunicaciones y Electrónica y cuento con una Maestría en Electrónica en el Tecnológico de México en Celaya. Actualmente me desempeño como freelance en proyectos y estoy matriculado en cursos en Plataformas como CODERHOUSE. Soy un apasionado de la programación y me encanta estar en constante aprendizaje.
