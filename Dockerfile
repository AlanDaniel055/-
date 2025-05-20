# Usar la imagen oficial de MySQL
FROM mysql:latest

# Establecer variables de entorno para la configuración inicial
ENV MYSQL_DATABASE=trello
ENV MYSQL_USER=bruno
ENV MYSQL_PASSWORD=secret
ENV MYSQL_ROOT_PASSWORD=rootpassword

# El puerto por defecto de MySQL es el 3306
EXPOSE 3306
