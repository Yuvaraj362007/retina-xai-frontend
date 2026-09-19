import os
import psycopg2


DATABASE_CONFIG = {
    "dbname": "retina_xai",
    "user": "yuvarajd",
    "host": "localhost",
    "port": 5432,
}


def get_connection():
    database_url = os.getenv("DATABASE_URL")

    if database_url:
        return psycopg2.connect(database_url)

    return psycopg2.connect(
        **DATABASE_CONFIG
    )
