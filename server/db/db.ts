import { Client } from 'pg'
require('dotenv').load()

export const database = new Client({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: Number(process.env.PG_PORT),
    password: process.env.PG_PASSWORD,
})

export const connectToDatabase = async () => {
    await database.connect()
    await database.query(
        `CREATE TABLE IF NOT EXISTS public.collections
        (
            _id serial PRIMARY KEY,
            name character varying(150) COLLATE pg_catalog."default" NOT NULL,
            "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;

        ALTER TABLE public.collections
            OWNER to admin;
        `
    )
    await database.query(
        `CREATE TABLE IF NOT EXISTS public."collectedItems"
        (
            _id serial PRIMARY KEY,
            name character varying(150) COLLATE pg_catalog."default" NOT NULL,
            "collectionId" integer NOT NULL,
            "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "collectedItems_collectionId_fkey" FOREIGN KEY ("collectionId")
                REFERENCES public.collections (_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
        )
        WITH (
            OIDS = FALSE
        )
        TABLESPACE pg_default;

        ALTER TABLE public."collectedItems"
            OWNER to admin;
        `
    )
}
