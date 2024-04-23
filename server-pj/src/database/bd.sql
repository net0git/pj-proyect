-- Tabla de dependencias
CREATE TABLE t_dependencias (
    id_dependencia SERIAL PRIMARY KEY,
    nombre_dependencia VARCHAR
);

-- Tabla de magistrados
CREATE TABLE t_magistrados (
    id_magistrado SERIAL PRIMARY KEY,
    nombre_magistrado VARCHAR
);

-- Tabla de funciones
CREATE TABLE t_funciones (
    id_funcion SERIAL PRIMARY KEY,
    nombre_funcion VARCHAR
);

-- Tabla de registro de dependencias
CREATE TABLE t_dependencia_funciones (
    id_dependencia_funciones SERIAL PRIMARY KEY,
    id_dependencia INTEGER REFERENCES t_dependencias(id_dependencia),
    id_funcion INTEGER REFERENCES t_funciones(id_funcion)
);

-- Tabla principal
CREATE TABLE t_produccion (
    id_produccion SERIAL PRIMARY KEY,
    id_dependencia INTEGER REFERENCES t_dependencias(id_dependencia),
    id_magistrado INTEGER REFERENCES t_magistrados(id_magistrado),
    anio INTEGER,
    mes INTEGER,
    matriz VARCHAR,
    obs VARCHAR,
    created DATE
);