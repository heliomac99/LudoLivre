import time
import pymysql
import os
import debugpy
import sys
from flask.cli import main as flask_main

# Configurações do banco
host = os.getenv("DB_HOST", "localhost")
port = 3306
user = os.getenv("DB_USER", "root")
password = os.getenv("DB_PASSWORD", "")
database = os.getenv("DB_NAME", "")

# Aguarda conexão com o MySQL
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
        print("✅ Conexão com MySQL estabelecida.")
        break
    except pymysql.err.OperationalError:
        print("⏳ MySQL não disponível ainda. Tentando novamente em 1s... "+str(host)+":"+str(port))
        time.sleep(1)

# Inicia o debug remoto (se necessário)
debugpy.listen(("0.0.0.0", 5678))
if os.getenv("WAIT_FOR_DEBUGGER", "false").lower() == "true":
    print("🛑 Aguardando conexão do debugger...")
    debugpy.wait_for_client()
    debugpy.breakpoint()

# Executa o Flask
sys.argv += ["--app=main:create_app", "run", "--host=0.0.0.0"]
flask_main()
