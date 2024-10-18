# Listar volumens
docekr volume ls

# Crear Volumen
docker volume create <Nombre del volumen>

# Create SQL Contaienr
docker run --name=MySQL2 -e MYSQL_ROOT_PASSWORD=12345 -v my_sql_db:var/lib/mysql -d -p 3310:3306 mysql