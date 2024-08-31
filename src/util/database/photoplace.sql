CREATE SCHEMA IF NOT EXISTS "public";

CREATE  TABLE "public".users ( 
	uuid                 uuid DEFAULT gen_random_uuid() NOT NULL  ,
	name                 varchar(255)  NOT NULL  ,
	email                varchar(255)  NOT NULL  ,
	"password"           varchar(255)  NOT NULL  ,
	created_at           timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	CONSTRAINT pk_users PRIMARY KEY ( uuid )
 );

CREATE  TABLE "public".files ( 
	uuid                 uuid DEFAULT gen_random_uuid() NOT NULL  ,
	file_name            varchar(255)    ,
	hash                 varchar(255)  NOT NULL  ,
	file_type            varchar(50)    ,
	file_size            integer    ,
	file_path            varchar(255)    ,
	favorite             boolean DEFAULT false   ,
	created_at           timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	uploaded_at          timestamp DEFAULT CURRENT_TIMESTAMP   ,
	trashed_at           timestamp    ,
	user_id              uuid  NOT NULL  ,
	CONSTRAINT files_pkey PRIMARY KEY ( uuid )
 );

CREATE  TABLE "public".folders ( 
	uuid                 uuid DEFAULT gen_random_uuid() NOT NULL  ,
	name                 varchar(255)    ,
	description          text    ,
	favorite             boolean DEFAULT false   ,
	trash                boolean DEFAULT false   ,
	parent_folder_uuid   uuid    ,
	user_id              uuid    ,
	created_at           timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL  ,
	uploaded_at          timestamp DEFAULT CURRENT_TIMESTAMP   ,
	trashed_at           timestamp    ,
	CONSTRAINT folders_pkey PRIMARY KEY ( uuid )
 );

CREATE  TABLE "public".folder_files ( 
	file_id              uuid  NOT NULL  ,
	folder_id            uuid  NOT NULL  ,
	CONSTRAINT folder_files_pkey PRIMARY KEY ( file_id, folder_id )
 );

ALTER TABLE "public".files ADD CONSTRAINT fk_files_user_id FOREIGN KEY ( user_id ) REFERENCES "public".users( uuid );

ALTER TABLE "public".folder_files ADD CONSTRAINT folder_files_file_id_fkey_0 FOREIGN KEY ( file_id ) REFERENCES "public".files( uuid ) ON DELETE CASCADE;

ALTER TABLE "public".folder_files ADD CONSTRAINT folder_files_folder_id_fkey_0 FOREIGN KEY ( folder_id ) REFERENCES "public".folders( uuid ) ON DELETE CASCADE;

ALTER TABLE "public".folders ADD CONSTRAINT folders_parent_folder_uuid_fkey FOREIGN KEY ( parent_folder_uuid ) REFERENCES "public".folders( uuid );

ALTER TABLE "public".folders ADD CONSTRAINT folders_user_id_fkey FOREIGN KEY ( user_id ) REFERENCES "public".users( uuid );
