CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

ALTER TABLE person
	ADD name VARCHAR (80) NOT NULL
;

CREATE TABLE cohorts (
	id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE assignments (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE topics (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE events (
	id SERIAL PRIMARY KEY,
	date timestamp NOT NULL,
	title VARCHAR(80) NOT NULL,
	instructor_id INT REFERENCES "person" NOT NULL,
	cohort_id INT REFERENCES "cohorts" NOT NULL,
	assignment_id INT REFERENCES "assignments" NOT NULL,
	topic_id INT REFERENCES "topics",
	student_id INT REFERENCES "students" NOT NULL,
	notes TEXT
);
