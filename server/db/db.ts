import { Client } from 'pg'
require('dotenv').config()

export const database = new Client({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
    password: process.env.PG_PASSWORD,
})

export const connectToDatabase = async () => {
    await database.connect()
    await database.query(
        `CREATE TABLE IF NOT EXISTS collections
        (
            _id serial PRIMARY KEY,
            name character varying(150) COLLATE pg_catalog."default" NOT NULL,
            description character varying(300),
            "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        ALTER TABLE public.collections
            OWNER to admin;

        CREATE TABLE IF NOT EXISTS "collectedItems"
        (
            _id serial PRIMARY KEY,
            name character varying(150) COLLATE pg_catalog."default" NOT NULL,
            description character varying(300),
            "collectionId" integer NOT NULL,
            "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "collectedItems_collectionId_fkey" FOREIGN KEY ("collectionId")
                REFERENCES collections (_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        );

        ALTER TABLE public."collectedItems"
            OWNER to admin;
        `
    )
}
