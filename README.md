# API Coordinadora

Este repositorio contiene una API para la gestión de servicios de coordinadora.

## Requisitos previos

Para ejecutar correctamente este proyecto necesitas tener instalado:

- **Node.js**: Versión recomendada 18.20.6 (verificado que funciona correctamente)
- **Git**: Para control de versiones
- **Docker**: (Opcional) Para entorno containerizado

## Instalación

### Clonación del repositorio

Selecciona una ubicación en tu sistema y ejecuta:

```bash
git clone https://github.com/jamasoftwaredeveloper/frontend_coordinadora.git
```

### Configuración inicial

1. Navega al directorio del proyecto:
   ```bash
   cd frontend_coordinadora
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`
   - Edita el archivo `.env` con los valores adecuados para tu entorno

   ```bash
   cp .env.example .env
   # Edita el archivo .env con tu editor preferido
   ```


## Ejecución del proyecto

Inicia el servidor con:

```bash
npm run start
```


## Abrir el navegador
Al ejecutar el comando anterior, visualizaras una url, la cual debes copiar y pegarla en una ventana del navegador.

## Cuentas de prueba

El sistema incluye los siguientes usuarios predefinidos:

### Administrador
- **Email**: admin@gmail.com
- **Contraseña**: 123456789

### Clientes
- **Email**: test@gmail.com
- **Contraseña**: 123456789

- **Email**: user3@gmail.com
- **Contraseña**: 123456789

## Pruebas  - No funcional
Me tira error respecto a uso de variable de entorno con vite
Para ejecutar las pruebas automatizadas:

```bash
npm run test
```

## Despliegue con Docker

Si prefieres utilizar Docker, sigue estos pasos:

> **Nota importante**: Asegúrate de tener Docker Desktop ejecutándose.

1. Construir las imágenes (sin usar caché para asegurar versiones actualizadas):
   ```bash
   docker-compose build --no-cache
   ```

2. Levantar los contenedores en modo detached:
   ```bash
   docker-compose up -d
   ```

# URL
Para ingresar
http://localhost:5173/auth/login 

## Estructura del proyecto

El frontend sigue principios de capas basicas para facilitar su mantenimiento y escalabilidad.

## Contribuciones

Si deseas contribuir al proyecto, por favor crea un fork y envía un Pull Request con tus mejoras.
