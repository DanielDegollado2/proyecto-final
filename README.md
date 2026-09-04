# TaskFlow API, Gestor de Proyectos y Tareas

Este proyecto final consiste en el desarrollo de un Frontend que consuma la API: https://d3ujwk09smrk9z.cloudfront.net que proporciona diferentes endpoints relacionados con la gestión de proyectos y sus respectivas tareas.
Este proyecto facilita la creación de proyectos y tareas, visualización de los proyectos existentes y las tareas que forman parte de ellos, asi como la edición y eliminación de estos.

## Tecnologías utilizadas
 - React + Typescript 
 - Material UI (MUI)
 - Vite
 - Axios
 - JWT
 - Github Actions y Pages
 - Librería extra: DayJs para manejar fechas y horas en Javascript

## Estructura general del proyecto

```
proyecto-final/
├── .github/
│   └── workflows/          # CI y deploy automático a GitHub Pages
├── public/                
├── src/
│   ├── assets/ 
│   ├── components/         # Cards, formularios y componentes de UI reutilizables
│   ├── config/             $ Configuración de la URL de la API
│   ├── context/            $ Contexto de Autenticación (login, logout, isAuthenticated)
│   ├── hooks/              # Lógica de estado y efectos (useTasks, useProjects, etc.)
│   ├── pages/              # Vistas asociadas a cada ruta (Login, Dashboard, Tasks, ProjectTasks, etc.)
│   ├── services/           # Llamadas a la API (axios, endpoints)
│   ├── types.ts            # Definir los tipos de datos que manejara la aplicación (Project, Task, etc.)
│   ├── ProtectedRoute.tsx  # Protejer las rutas de los usuarios no autenticados
│   ├── App.tsx             # Configuración de ThemeProvider, rutas y layout
│   └── main.tsx            # Punto de entrada de la aplicación
```
## Login y Autenticación con JWT
Se hace una llamada al endpoint `/auth/login` de la API mediante Axios, en el cuerpo de la llamada se incluyen un usuario y contraseña validos. La API regresa un token, el cual se guarda en `localStorage`. Cada vez que se haga una llamada a la API, Axios la intercepta y le agrega el token guardado mediante un `header HTTP (Authorization: Bearer TOKEN)`. La API se encarga de validar el token y verificar que el usuario tenga autorización de llamar al endpoint solicitado.

### Rutas protegidas
El Frontend solo permite acceso a ciertas rutas si el usuario esta autenticado, esto se logra mediante la implementación de `ProtectedRoute.tsx`. En este componente se utiliza el hook `useAuth()` para obtener el atributo `isAuthenticated` del contexto de autenticación, el cual es un booleano que retorna true o false dependiendo de si el usuario ya hizo un login exitoso. Si este atributo retorna true, se retorna la pagina a la que el usuario quiere acceder; si retorna false entonces se redirige al usuario a la pagina de Login. Para proteger las rutas, estas tienen que estar envueltas en un `Route` con el elemento `ProtectedRoute` asignado.

## Consumo de la API y uso de Axios
El consumo de la API se hace mediante la librería `Axios`. Se definió el servicio `httpClient`, donde se encuentra la creación de una instancia de Axios, la lógica para interceptar llamadas a la API y agregarles el token en el header y lógica para manejar mensajes de errore.

### Servicios creados
Cada servicio encapsula la lógica de comunicación con un recurso específico de la API (proyectos, tareas, autenticación), separando las llamadas HTTP de los componentes de UI.

```
services/
├── authService.ts       # Métodos para llamar al endpoint /auth/login , guardar token, obtener token y borrar token
├── httpClient.ts        # Genera instancia de Axios, intercepta llamadas a la API para agregarles el token y maneja los mensajes de error
├── projectService.ts    # Métodos para obtener todos los proyectos, obtener un proyecto mediante su id, crear un proyecto, actualizar un proyecto mediante su id y borrar un proyecto mediante su id
├── taskService.ts       # Métodos para obtener todos las tareas, crear una tarea, actualizar una tarea con PUT y PATCH mediante su id, borrar una tarea mediante su id
```

## Formularios, validaciones y manejo de estado
El usuario puede crear proyectos y tareas mediante formularios, cada uno de ellos tiene sus propias validaciones para asegurar que antes de enviar datos a la API, estos estén en el formato y estado requeridos. La librería Material UI proporciona componentes que vienen incluidos con soporte a validaciones, por ejemplo que un elemento como el nombre de un proyecto sea `required`. Mientras las validaciones no se cumplan, el formulario no le permitira al usuario enviar esa información.

Para facilitar el trabajar con formularios se crearon dos hooks: `useTaskForm` y `useProjectForm`, con el objetivo de separar esta lógica de los componentes de UI. Cada hook guarda el estado de todos los atributos de cada tipo (Project y Task), asi como el metodo para cambiar ese estado; también se creo un metodo handle que se encarga de llamar al metodo create correspondiente, enviando los atributos para crear un proyecto/tarea. Los hooks retornan los atributos, el metodo para modificar su estado para que puedan usarse en los componentes y un metodo que se encarga de llamar `createProject/createTask`.

## Uso de hooks
Se crearon diferentes hooks que ayudan a separar la lógica de los componentes:

```
hooks/
├── useAuth.ts              # Regresa el contexto de autenticación
├── useProject.ts           # Obtiene un proyecto por ID, expone el estado de la llamada (loading, error) y un callback para refrescar los datos
├── useProjectActions.ts    # Maneja la edición y eliminación de un proyecto: estado del formulario (nombre, descripción), validación, y llamadas a updateProject/deleteProject
├── useProjectForm.ts       # Maneja el estado del formulario (nombre, descripción) y llamada a createProject
├── useProjects.ts          # Obtiene todos los proyectos, expone el estado de la llamada (loading, error) y un callback para refrescar los datos
├── useProjectTasks.ts      # Obtiene todos las tareas asignadas a un proyecto con una id especifica, expone el estado de la llamada (loading, error) y un callback para refrescar los datos
├── useTaskActions.ts       # Maneja la edición y eliminación de una tarea: estado del formulario (titulo, descripción, estado, prioridad, assigneeId, fecha de vencimiento), validación, y llamadas a updateTask/patchTask/deleteTask
├── useProjectForm.ts       # Maneja el estado del formulario (titulo, descripción, estado, prioridad, assigneeId, fecha de vencimiento) y llamada a createTask
├── useTasks.ts             # Obtiene todas las tareas, expone el estado de la llamada (loading, error) y un callback para refrescar los datos
```

## Uso de Context
Se implementó `AuthContext` para manejar la autenticación de forma global en la aplicación. Internamente, expone métodos que llaman a `login`, `saveToken` y `clearToken` del servicio `authService`.

El provider entrega:
- `isAuthenticated`: booleano que indica si el usuario está autenticado
- `login`:  método para iniciar sesión
- `logout`: método para cerrar sesión

También se implementó `ThemeContext` para manejar el estilo global de la UI.

## CI/CD y Deploy
El proyecto usa GitHub Actions para automatizar la compilación y el despliegue a GitHub Pages cada vez que se actualiza la rama `main`.
Se definió un workflow mediante un archivo YAML donde se especifican todos los pasos a seguir para realizar la compilación y despliegue.

## Aplicación en funcionamiento
Liga: https://danieldegollado2.github.io/proyecto-final/login 
