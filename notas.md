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
        