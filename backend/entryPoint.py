import time
import pymysql
import os

host = os.getenv("DB_HOST", "localhost")
port = 3306
user = os.getenv("DB_USER", "root")
password = os.getenv("DB_PASSWORD", "")
database = os.getenv("DB_NAME", "")

print(f"Aguardando conexão com o MySQL em {host}:{port}...")

while True:
    try:
        conn = pymysql.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=port
        )
        conn.close()
        print("Conexão com MySQL estabelecida.")
        break
    except pymysql.err.OperationalError:
        print("MySQL não disponível ainda. Tentando novamente em 1s...")
        time.sleep(1)

os.system("flask run --host=0.0.0.0 --debug")
