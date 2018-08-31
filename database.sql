CREATE DATABASE who_showed_up;

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
	name VARCHAR (80) NOT NULL,
    email VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE cohorts (
	id SERIAL PRIMARY KEY,
	cohort_name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	date timestamp NOT NULL,
	title VARCHAR(80) NOT NULL,
	instructor_id INT REFERENCES "person" NOT NULL,
	cohort_id INT REFERENCES "cohorts" NOT NULL,
	assignment TEXT NOT NULL,
	topic TEXT,
	completed BOOLEAN NOT NULL DEFAULT false,
	students TEXT,
	notes TEXT
);
