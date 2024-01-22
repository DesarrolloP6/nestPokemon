# Clase 70
Creamos una pagina estatica y la mostramos
    -para ello instalamos el paquete @nestjs/serve-static
    -en el app.module agregamos la ruta donde se encuentra nuestra pagina (public/)
        -Para agregarlo se utiliza lo siguiente:
                                                ServeStaticModule.forRoot({
                                                    rootPath: join(__dirname,’..’,’public’),
                                                })
# Clase 71
En esta clase agregamos un prefix a la api en el main:
  //app.setGlobalPrefix('api/v2')
# Clase 72
Configuramos el docker desktop con mongoDB
Configuramos un archivo (docker-compose.yml) para poder crear la instancia de la base de datos de mongo
Para crear la instancia de mongo db se utiliza el comando => docker-compose up -d
# Clase 73
Editamos el archivo de Readme.md para mostrar todos los pasos que hay que hacer para levantar el proyecto
esto nos sirve ya sea para que un tercero pueda levantar el proyecto y para que si lo necesito hacer yo
dentro de un tiempo se me sea mas facil.
# Clase 74 - 75 
Configuracion de conexion con mongoDB
--DTO de pokemon
# Clase 76
Creación y validacion del post
  validacion con pipe y decoradores en el DTO
# Clase 77
Creacion de pokemon en base de datos 
# Clase 78
Validacion de errores en la creación de pokemons
# Clase 79
Buscar pokemon por idMongo, numero o por nombre
# Clase 80 - 81
Actualizar datos de pokemon y validacion de keys y problemas
# Clase 82
Eliminacion de pokemon 
# Clase 83
Creacion de pipe personalizado (Mongo ID)
# Clase 84
Diferentes formas de eliminar un registro en base de datos
# Clase 90
Preparar modulo de seed (Para poder tener datos iniciales)
# Clase 91-92
Obtener los datos de una api de terceros con axios
# Clase 93-94
Obtener listado de N pokemons, e insertarlos uno por uno 
# Clase 95
Crear insert into select en Mongo
# Clase 96
Custom Provider de peticiones HTTP
# Clase 97
Envio/recepcion de parametros
# Clase 98
Trasformamos los tipos de datos que recibimos de los parametros (Query parameters)  ("5" => 5, "True" => True) 
# Clase 104
Configuracion de load proyecto, variables de entorno y app.config
# Clase 105
Configuracion final para variables de entorno
# Clase 106
Configuracion validaciones con el paquete Joi
# Clase 107
Remodelacion del readme para mejorar el inico del proyecto
# Clase 108
Conexion a base de datos subida en RallWay, y configuracion en repositorio Git