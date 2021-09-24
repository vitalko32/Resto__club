--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: default; Type: SCHEMA; Schema: -; Owner: vio
--

CREATE SCHEMA "default";


ALTER SCHEMA "default" OWNER TO vio;

--
-- Name: vne_transactions_type_enum; Type: TYPE; Schema: default; Owner: vio
--

CREATE TYPE "default".vne_transactions_type_enum AS ENUM (
    'auto',
    'employee',
    'admin'
);


ALTER TYPE "default".vne_transactions_type_enum OWNER TO vio;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: vne_admingroups; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_admingroups (
    id integer NOT NULL,
    name character varying,
    title character varying,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_admingroups OWNER TO vio;

--
-- Name: vne_admingroups_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_admingroups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_admingroups_id_seq OWNER TO vio;

--
-- Name: vne_admingroups_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_admingroups_id_seq OWNED BY "default".vne_admingroups.id;


--
-- Name: vne_admins; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_admins (
    id integer NOT NULL,
    admingroup_id integer,
    name character varying,
    email character varying NOT NULL,
    password character varying,
    img character varying,
    active boolean DEFAULT true NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_admins OWNER TO vio;

--
-- Name: vne_admins_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_admins_id_seq OWNER TO vio;

--
-- Name: vne_admins_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_admins_id_seq OWNED BY "default".vne_admins.id;


--
-- Name: vne_cats; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_cats (
    id integer NOT NULL,
    restaurant_id integer,
    icon_id integer,
    name character varying,
    pos integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE "default".vne_cats OWNER TO vio;

--
-- Name: vne_cats_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_cats_id_seq OWNER TO vio;

--
-- Name: vne_cats_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_cats_id_seq OWNED BY "default".vne_cats.id;


--
-- Name: vne_currencies; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_currencies (
    id integer NOT NULL,
    name character varying,
    symbol character varying,
    pos integer DEFAULT 0 NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_currencies OWNER TO vio;

--
-- Name: vne_currencies_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_currencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_currencies_id_seq OWNER TO vio;

--
-- Name: vne_currencies_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_currencies_id_seq OWNED BY "default".vne_currencies.id;


--
-- Name: vne_employee_status_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_employee_status_translations (
    id integer NOT NULL,
    employee_status_id integer,
    lang_id integer,
    name character varying
);


ALTER TABLE "default".vne_employee_status_translations OWNER TO vio;

--
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_employee_status_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_employee_status_translations_id_seq OWNER TO vio;

--
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_employee_status_translations_id_seq OWNED BY "default".vne_employee_status_translations.id;


--
-- Name: vne_employee_statuses; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_employee_statuses (
    id integer NOT NULL,
    color character varying DEFAULT '#000000'::character varying NOT NULL,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_employee_statuses OWNER TO vio;

--
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_employee_statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_employee_statuses_id_seq OWNER TO vio;

--
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_employee_statuses_id_seq OWNED BY "default".vne_employee_statuses.id;


--
-- Name: vne_employees; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_employees (
    id integer NOT NULL,
    restaurant_id integer,
    employee_status_id integer,
    email character varying NOT NULL,
    password character varying,
    name character varying,
    phone character varying,
    is_admin boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_employees OWNER TO vio;

--
-- Name: vne_employees_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_employees_id_seq OWNER TO vio;

--
-- Name: vne_employees_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_employees_id_seq OWNED BY "default".vne_employees.id;


--
-- Name: vne_halls; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_halls (
    id integer NOT NULL,
    restaurant_id integer,
    name character varying,
    nx integer DEFAULT 5 NOT NULL,
    ny integer DEFAULT 5 NOT NULL,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_halls OWNER TO vio;

--
-- Name: vne_halls_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_halls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_halls_id_seq OWNER TO vio;

--
-- Name: vne_halls_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_halls_id_seq OWNED BY "default".vne_halls.id;


--
-- Name: vne_icon_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_icon_translations (
    id integer NOT NULL,
    icon_id integer,
    lang_id integer,
    name character varying
);


ALTER TABLE "default".vne_icon_translations OWNER TO vio;

--
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_icon_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_icon_translations_id_seq OWNER TO vio;

--
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_icon_translations_id_seq OWNED BY "default".vne_icon_translations.id;


--
-- Name: vne_icons; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_icons (
    id integer NOT NULL,
    img character varying,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_icons OWNER TO vio;

--
-- Name: vne_icons_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_icons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_icons_id_seq OWNER TO vio;

--
-- Name: vne_icons_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_icons_id_seq OWNED BY "default".vne_icons.id;


--
-- Name: vne_ingredients; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_ingredients (
    id integer NOT NULL,
    product_id integer,
    name character varying,
    pos integer DEFAULT 0 NOT NULL,
    excludable boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_ingredients OWNER TO vio;

--
-- Name: vne_ingredients_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_ingredients_id_seq OWNER TO vio;

--
-- Name: vne_ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_ingredients_id_seq OWNED BY "default".vne_ingredients.id;


--
-- Name: vne_langs; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_langs (
    id integer NOT NULL,
    slug character varying,
    title character varying,
    shorttitle character varying,
    img character varying,
    pos integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    slugable boolean DEFAULT false NOT NULL,
    dir character varying DEFAULT 'ltr'::character varying NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_langs OWNER TO vio;

--
-- Name: vne_langs_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_langs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_langs_id_seq OWNER TO vio;

--
-- Name: vne_langs_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_langs_id_seq OWNED BY "default".vne_langs.id;


--
-- Name: vne_mailtemplate_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_mailtemplate_translations (
    id integer NOT NULL,
    mailtemplate_id integer,
    lang_id integer,
    subject character varying,
    content text
);


ALTER TABLE "default".vne_mailtemplate_translations OWNER TO vio;

--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_mailtemplate_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_mailtemplate_translations_id_seq OWNER TO vio;

--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_mailtemplate_translations_id_seq OWNED BY "default".vne_mailtemplate_translations.id;


--
-- Name: vne_mailtemplates; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_mailtemplates (
    id integer NOT NULL,
    name character varying,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_mailtemplates OWNER TO vio;

--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_mailtemplates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_mailtemplates_id_seq OWNER TO vio;

--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_mailtemplates_id_seq OWNED BY "default".vne_mailtemplates.id;


--
-- Name: vne_product_images; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_product_images (
    id integer NOT NULL,
    product_id integer,
    img character varying,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_product_images OWNER TO vio;

--
-- Name: vne_product_images_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_product_images_id_seq OWNER TO vio;

--
-- Name: vne_product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_product_images_id_seq OWNED BY "default".vne_product_images.id;


--
-- Name: vne_products; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_products (
    id integer NOT NULL,
    cat_id integer,
    name character varying,
    weight integer DEFAULT 0 NOT NULL,
    cal integer DEFAULT 0 NOT NULL,
    "time" character varying,
    about text,
    pos integer DEFAULT 0 NOT NULL,
    active boolean DEFAULT true NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    code character varying,
    recommended boolean DEFAULT false NOT NULL,
    price double precision DEFAULT '0'::double precision NOT NULL,
    restaurant_id integer
);


ALTER TABLE "default".vne_products OWNER TO vio;

--
-- Name: vne_products_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_products_id_seq OWNER TO vio;

--
-- Name: vne_products_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_products_id_seq OWNED BY "default".vne_products.id;


--
-- Name: vne_restaurants; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_restaurants (
    id integer NOT NULL,
    currency_id integer,
    name character varying,
    domain character varying,
    ownername character varying,
    phone character varying,
    address character varying,
    inn character varying,
    ogrn character varying,
    comment text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    lang_id integer,
    money double precision DEFAULT '0'::double precision NOT NULL
);


ALTER TABLE "default".vne_restaurants OWNER TO vio;

--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_restaurants_id_seq OWNER TO vio;

--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_restaurants_id_seq OWNED BY "default".vne_restaurants.id;


--
-- Name: vne_settings; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_settings (
    id integer NOT NULL,
    p character varying,
    v character varying,
    c character varying,
    pos integer DEFAULT 0 NOT NULL,
    in_app boolean DEFAULT false NOT NULL,
    defended boolean DEFAULT false NOT NULL
);


ALTER TABLE "default".vne_settings OWNER TO vio;

--
-- Name: vne_settings_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_settings_id_seq OWNER TO vio;

--
-- Name: vne_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_settings_id_seq OWNED BY "default".vne_settings.id;


--
-- Name: vne_tables; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_tables (
    id integer NOT NULL,
    hall_id integer,
    no integer DEFAULT 0 NOT NULL,
    seats integer DEFAULT 0 NOT NULL,
    x integer DEFAULT 0 NOT NULL,
    y integer DEFAULT 0 NOT NULL,
    code character varying
);


ALTER TABLE "default".vne_tables OWNER TO vio;

--
-- Name: vne_tables_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_tables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_tables_id_seq OWNER TO vio;

--
-- Name: vne_tables_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_tables_id_seq OWNED BY "default".vne_tables.id;


--
-- Name: vne_transactions; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_transactions (
    id integer NOT NULL,
    restaurant_id integer,
    amount integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    type "default".vne_transactions_type_enum DEFAULT 'auto'::"default".vne_transactions_type_enum NOT NULL
);


ALTER TABLE "default".vne_transactions OWNER TO vio;

--
-- Name: vne_transactions_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_transactions_id_seq OWNER TO vio;

--
-- Name: vne_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_transactions_id_seq OWNED BY "default".vne_transactions.id;


--
-- Name: vne_word_translations; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_word_translations (
    id integer NOT NULL,
    word_id integer,
    lang_id integer,
    text text
);


ALTER TABLE "default".vne_word_translations OWNER TO vio;

--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_word_translations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_word_translations_id_seq OWNER TO vio;

--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_word_translations_id_seq OWNED BY "default".vne_word_translations.id;


--
-- Name: vne_wordbooks; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_wordbooks (
    id integer NOT NULL,
    name character varying,
    pos integer DEFAULT 0 NOT NULL
);


ALTER TABLE "default".vne_wordbooks OWNER TO vio;

--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_wordbooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_wordbooks_id_seq OWNER TO vio;

--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_wordbooks_id_seq OWNED BY "default".vne_wordbooks.id;


--
-- Name: vne_words; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_words (
    id integer NOT NULL,
    wordbook_id integer,
    pos integer DEFAULT 0 NOT NULL,
    mark character varying,
    note character varying
);


ALTER TABLE "default".vne_words OWNER TO vio;

--
-- Name: vne_words_id_seq; Type: SEQUENCE; Schema: default; Owner: vio
--

CREATE SEQUENCE "default".vne_words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "default".vne_words_id_seq OWNER TO vio;

--
-- Name: vne_words_id_seq; Type: SEQUENCE OWNED BY; Schema: default; Owner: vio
--

ALTER SEQUENCE "default".vne_words_id_seq OWNED BY "default".vne_words.id;


--
-- Name: vne_admingroups id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admingroups ALTER COLUMN id SET DEFAULT nextval('"default".vne_admingroups_id_seq'::regclass);


--
-- Name: vne_admins id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins ALTER COLUMN id SET DEFAULT nextval('"default".vne_admins_id_seq'::regclass);


--
-- Name: vne_cats id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats ALTER COLUMN id SET DEFAULT nextval('"default".vne_cats_id_seq'::regclass);


--
-- Name: vne_currencies id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_currencies ALTER COLUMN id SET DEFAULT nextval('"default".vne_currencies_id_seq'::regclass);


--
-- Name: vne_employee_status_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_employee_status_translations_id_seq'::regclass);


--
-- Name: vne_employee_statuses id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_statuses ALTER COLUMN id SET DEFAULT nextval('"default".vne_employee_statuses_id_seq'::regclass);


--
-- Name: vne_employees id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees ALTER COLUMN id SET DEFAULT nextval('"default".vne_employees_id_seq'::regclass);


--
-- Name: vne_halls id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_halls ALTER COLUMN id SET DEFAULT nextval('"default".vne_halls_id_seq'::regclass);


--
-- Name: vne_icon_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_icon_translations_id_seq'::regclass);


--
-- Name: vne_icons id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icons ALTER COLUMN id SET DEFAULT nextval('"default".vne_icons_id_seq'::regclass);


--
-- Name: vne_ingredients id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_ingredients ALTER COLUMN id SET DEFAULT nextval('"default".vne_ingredients_id_seq'::regclass);


--
-- Name: vne_langs id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_langs ALTER COLUMN id SET DEFAULT nextval('"default".vne_langs_id_seq'::regclass);


--
-- Name: vne_mailtemplate_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_mailtemplate_translations_id_seq'::regclass);


--
-- Name: vne_mailtemplates id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates ALTER COLUMN id SET DEFAULT nextval('"default".vne_mailtemplates_id_seq'::regclass);


--
-- Name: vne_product_images id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_product_images ALTER COLUMN id SET DEFAULT nextval('"default".vne_product_images_id_seq'::regclass);


--
-- Name: vne_products id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products ALTER COLUMN id SET DEFAULT nextval('"default".vne_products_id_seq'::regclass);


--
-- Name: vne_restaurants id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants ALTER COLUMN id SET DEFAULT nextval('"default".vne_restaurants_id_seq'::regclass);


--
-- Name: vne_settings id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_settings ALTER COLUMN id SET DEFAULT nextval('"default".vne_settings_id_seq'::regclass);


--
-- Name: vne_tables id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables ALTER COLUMN id SET DEFAULT nextval('"default".vne_tables_id_seq'::regclass);


--
-- Name: vne_transactions id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_transactions ALTER COLUMN id SET DEFAULT nextval('"default".vne_transactions_id_seq'::regclass);


--
-- Name: vne_word_translations id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations ALTER COLUMN id SET DEFAULT nextval('"default".vne_word_translations_id_seq'::regclass);


--
-- Name: vne_wordbooks id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_wordbooks ALTER COLUMN id SET DEFAULT nextval('"default".vne_wordbooks_id_seq'::regclass);


--
-- Name: vne_words id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_words ALTER COLUMN id SET DEFAULT nextval('"default".vne_words_id_seq'::regclass);


--
-- Data for Name: vne_admingroups; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_admingroups (id, name, title, defended) FROM stdin;
1	owners	Owners	t
\.


--
-- Data for Name: vne_admins; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_admins (id, admingroup_id, name, email, password, img, active, defended) FROM stdin;
1	1	Alex	7573497@gmail.com	$2b$10$BBFjulN8d2kWvPC6lbaOduhDRd0l59lOHEF6fKTd3yrSm6SW0q9t.	2021-8/1629929025223_150.jpg	t	t
6	1	Иван Петров	viovalya@gmail.com	$2b$10$d/AHzrLN7/2iu9DjVOuIEuo4.AIg3mMNU0TWGkdNZZ5kSjn5oe7SW	2021-9/1632435404692_150.jpg	t	f
\.


--
-- Data for Name: vne_cats; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_cats (id, restaurant_id, icon_id, name, pos, active) FROM stdin;
12	21	5	Сыры	6	t
4	21	14	Фрукты	7	t
7	21	11	Мороженое	8	t
2	21	4	Хлеб	9	t
1	21	9	Гамбургеры	1	t
6	9	2	Тестовая	1	t
8	21	13	Пицца	2	t
9	21	8	Рыбные блюда	3	t
3	21	6	Среднеазиатская кухня	4	t
10	21	12	Острые блюда	5	t
\.


--
-- Data for Name: vne_currencies; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_currencies (id, name, symbol, pos, defended) FROM stdin;
1	RUR	₽	1	t
3	USD	$	3	f
2	EUR	€	2	f
4	SHF	₣	4	f
\.


--
-- Data for Name: vne_employee_status_translations; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_employee_status_translations (id, employee_status_id, lang_id, name) FROM stdin;
1	1	1	выходной
2	1	2	day off
5	2	2	working
6	3	1	обед
7	3	2	dinner
4	2	1	работа
\.


--
-- Data for Name: vne_employee_statuses; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_employee_statuses (id, color, pos) FROM stdin;
3	#f88413	3
2	#24b83f	1
1	#ff0000	2
\.


--
-- Data for Name: vne_employees; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_employees (id, restaurant_id, employee_status_id, email, password, name, phone, is_admin, created_at, defended) FROM stdin;
6	18	\N	7573498@gmail.com	123	\N	\N	t	2021-08-27 22:30:50.941314	t
7	19	\N	7573499@gmail.com	123	\N	\N	t	2021-08-28 00:39:48.284041	t
1	1	\N	7573497222@gmail.com		Кошкин Алексей	+38 066 4020000	t	2021-08-26 21:31:03.512723	t
3	\N	1	viovalya@gmail.com	$2b$10$Kif/QFeeEAC4K00XRKmfueMbCo.OvqG0gu28VR6KqYtwsA5bxfOKi	Лисичкин Виктор	+38123444444443	f	2021-08-26 22:03:00.332342	f
2	10	1	admin@vio.net.ua		Мышкин Иван	+38 095 2010000	t	2021-08-26 21:32:06.303446	f
28	45	\N	75734974444@gmail.com	$2b$10$o2Y63TUS9aBVLLpNAkS9IOMVb2TvEKCjUtg3tADQTnsJI/zrTqBJe	\N	\N	t	2021-09-02 21:07:52.119825	t
29	9	\N	7573497777@gmail.com	$2b$10$lrWJKgjzIhv6qDzSD6AcZOjh2KO9k5x3K5tVjQJ3q58ZgF/uSQKj6	Петров Андрей	+380664000050	t	2021-09-03 01:41:45.691878	f
31	46	\N	7573497rr@gmail.com	$2b$10$4KyYx5FqOrFutyLB7Ls2oe82rMzNIGvQ/24YWJ1QivWSTFs4gSEpm	\N	\N	t	2021-09-07 01:16:30.429325	t
32	15	\N	7573497999@gmail.com	$2b$10$IjNiwNYzTFdFc.r.fMYWo.sa5Mbm9ebMnABxBYaYfXDKdeJJnL9om	Пушкин А.	+380664028899	t	2021-09-07 02:03:30.360362	f
36	21	1	bednenko@gmail.com	$2b$10$YxvpyUA1UJXhZnBUrsbXCOzUtFRbhx7ibOGkTHBeeECV0ZiLqDpPi	Бедненко Федор Иванович	\N	f	2021-09-08 17:44:35.220428	f
30	43	\N	7573497111@gmail.com	$2b$10$ZugM9ReCVctvQ9CdfPF7wucHDF8Tu7cTJyC9zXfbCgkZEMn12xgsm	Безымянный Андрей	+380664000000	f	2021-09-04 12:48:30.239362	f
27	\N	\N	75734975555@gmail.com	$2b$10$RXTYMD2BBvxYo/J2o2VXCuPSe2OY6cOTCSGx5i8Dl2/VzTlXLMfwu	Чепига Алексей	+380660000000	f	2021-09-02 12:59:04.543675	f
10	22	\N	757349788@gmail.com	123	Петров Алексей	\N	t	2021-08-28 11:27:23.119406	t
24	38	\N	viovalya3@gmail.com	$2b$10$55Yr5WOoTrh2TD3DnyXEh.thX6oFeE459/qpt1hxOI93hWHW6lY8u	Иванов Алексей	+380664021350	t	2021-08-30 12:54:22.738402	t
9	21	2	7573497@gmail.com	$2b$10$5joksSpTiM4UGl8WTxVDQeOfDCPpPcyCSUZxRfBY8NOfZxS83bbVm	Булкин Олег	\N	t	2021-08-28 11:12:59.882811	t
\.


--
-- Data for Name: vne_halls; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_halls (id, restaurant_id, name, nx, ny, pos) FROM stdin;
3	9	Зал 1	5	5	1
4	21	Зеленый	5	5	3
5	21	Желтый	4	6	4
2	21	Синий	4	4	2
1	21	Красный	10	3	1
\.


--
-- Data for Name: vne_icon_translations; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_icon_translations (id, icon_id, lang_id, name) FROM stdin;
4	2	1	Курица
5	2	2	Chicken
6	3	1	Бекон
7	3	2	Bacon
8	4	1	Хлеб
9	4	2	Bread
10	5	1	Сыр
11	5	2	Cheese
12	6	1	Печенье
13	6	2	Cookie
14	7	1	Яйцо
15	7	2	Egg
16	8	1	Рыба
17	8	2	Fish
18	9	1	Гамбургер
19	9	2	Hamburger
20	10	1	Хотдог
21	10	2	Hotdog
22	11	1	Мороженое
23	11	2	Ice cream
24	12	1	Перец
25	12	2	Pepper
26	13	1	Пицца
27	13	2	Pizza
28	14	1	Лимон
29	14	2	Lemon
\.


--
-- Data for Name: vne_icons; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_icons (id, img, pos) FROM stdin;
2	2021-9/1632167887039.svg	1
3	2021-9/1632167965070.svg	2
4	2021-9/1632168036661.svg	3
5	2021-9/1632168063129.svg	4
6	2021-9/1632168098919.svg	5
7	2021-9/1632168122445.svg	6
8	2021-9/1632168156771.svg	7
9	2021-9/1632168188447.svg	8
10	2021-9/1632168226617.svg	9
11	2021-9/1632168252118.svg	10
12	2021-9/1632168279908.svg	11
13	2021-9/1632168338978.svg	12
14	2021-9/1632168372867.svg	13
\.


--
-- Data for Name: vne_ingredients; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_ingredients (id, product_id, name, pos, excludable) FROM stdin;
3	1	Помидор	3	t
4	1	Лист салата	4	t
8	3	Зелень	4	t
9	4	Апельсины	1	t
10	4	Грейпфруты	2	t
1	1	Хлеб	1	f
2	1	Мясо	2	f
5	3	Хлеб	1	f
6	3	Мясо	2	f
7	3	Сыр	3	f
\.


--
-- Data for Name: vne_langs; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_langs (id, slug, title, shorttitle, img, pos, active, slugable, dir, defended) FROM stdin;
1	ru	Русский	Рус	\N	1	t	f	ltr	t
2	en	English	Eng	\N	2	t	f	ltr	f
\.


--
-- Data for Name: vne_mailtemplate_translations; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_mailtemplate_translations (id, mailtemplate_id, lang_id, subject, content) FROM stdin;
4	2	2	Your Restclick account	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Your account has been created in the Restclick system.</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;"><b>Access data:</b></div>\n                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 20px;">\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Name</td><td width="10">&nbsp;</td><td>{{name}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Domain</td><td width="10">&nbsp;</td><td><a href="https://{{domain}}.restclick.vio.net.ua">https://{{domain}}.restclick.vio.net.ua</a></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Contact&nbsp;person</td><td width="10">&nbsp;</td><td>{{ownername}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Phone</td><td width="10">&nbsp;</td><td>{{phone}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Address</td><td width="10">&nbsp;</td><td>{{address}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ITN/TIN</td><td width="10">&nbsp;</td><td>{{inn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">PSRN</td><td width="10">&nbsp;</td><td>{{ogrn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Currency</td><td width="10">&nbsp;</td><td>{{currency}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Language</td><td width="10">&nbsp;</td><td>{{language}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Administrator&nbsp;e-mail</td><td width="10">&nbsp;</td><td>{{email}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Administrator&nbsp;password</td><td width="10">&nbsp;</td><td>{{password}}</td></tr>\n                                <tr><td height="10"></td></tr>                                \n                            </table>\n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>\n
3	2	1	Аккаунт в системе Restclick	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Создан аккаунт в системе Restclick.</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;"><b>Данные для доступа:</b></div>\n                            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 14px; line-height: 20px;">\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Название</td><td width="10">&nbsp;</td><td>{{name}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Домен</td><td width="10">&nbsp;</td><td><a href="https://{{domain}}.restclick.vio.net.ua">https://{{domain}}.restclick.vio.net.ua</a></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ФИО</td><td width="10">&nbsp;</td><td>{{ownername}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Телефон</td><td width="10">&nbsp;</td><td>{{phone}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Адрес</td><td width="10">&nbsp;</td><td>{{address}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ИНН</td><td width="10">&nbsp;</td><td>{{inn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">ОГРН</td><td width="10">&nbsp;</td><td>{{ogrn}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Валюта</td><td width="10">&nbsp;</td><td>{{currency}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Язык</td><td width="10">&nbsp;</td><td>{{language}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">E-mail&nbsp;администратора</td><td width="10">&nbsp;</td><td>{{email}}</td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td colspan="3" height="1" bgcolor="#f0f0f0"></td></tr>\n                                <tr><td height="10"></td></tr>\n                                <tr><td width="115" style="color: #666666;">Пароль&nbsp;администратора</td><td width="10">&nbsp;</td><td>{{password}}</td></tr>\n                                <tr><td height="10"></td></tr>                             \n                            </table>\n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>\n\n\n
9	5	1	Заканчиваются средства в системе Restclick	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Внимание!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Средства на счету ресторана "{{name}}" в системе Restclick позволяют оплатить {{days}} дн. пользования.</div>\n                                <div>Для дальнейшего пользования не забудьте пополнить счет!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>\n
13	7	1	Рестораны, у которых заканчиваются средства через {{days}} дн. ({{part}}/{{parts}})	<html>\n    <body>\n        <table>\n            <tr>\n                <td><strong>Название</strong></td><td><strong>E-mail администратора</strong></td><td><strong>Телефон</strong></td>\n            </tr>\n            {{foreach restaurants r}}\n            <tr><td>{{r.name}}</td><td>{{r.email}}</td><td>{{r.phone}}</td></tr>\n            {{endforeach}}\n        </table>\n    </body>\n</html>\n
14	7	2	\N	
12	6	2	Out of funds in the Restclick system	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Attention!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Funds on the "{{name}}" restaurant account in the Restclick system have been exhausted.</div>\n                                <div>For further use, do not forget to recharge your account!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>
10	5	2	The funds in the Restclick system are running out	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Attention!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Funds on the "{{name}}" restaurant account in Restclick system allow you to pay {{days}} days of use.</div>\n                                <div>For further use, do not forget to recharge your account!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>
11	6	1	Закончились средства в системе Restclick	<html>\n    <head>\n        <style>\n            @media (min-width:0) {.email-wrap {background-color: none; padding: 15px 0;}} \n            @media (min-width:960px) {.email-wrap {background-color: #E8EFF4; padding: 40px 15px;}} \n            @media (min-width:0) {.email-blk {padding: 0; background-color: inherit;}} \n            @media (min-width:960px) {.email-blk {padding: 30px 60px; background-color: #ffffff;}}\n        </style>\n    </head>\n    <body>\n        <div style="font-family: Verdana, Geneva, Tahoma, sans-serif; color:#000000;" class="email-wrap">\n            <div style="max-width:560px; margin:0 auto;">\n                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px;">\n                    <tr><td align="center" height="72" valign="top"><img src="https://static.restclick.vio.net.ua/images/email/logo.png" width="40" height="40"></td></tr>\n                    <tr>\n                        <td class="email-blk">\n                            <div style="font-size: 16px; line-height: 26px; margin-bottom: 15px;"><b>Внимание!</b></div>                            \n                            <div style="margin-bottom: 10px; font-size: 14px;">\n                                <div>Средства на счету ресторана "{{name}}" в системе Restclick исчерпаны.</div>\n                                <div>Для дальнейшего пользования не забудьте пополнить счет!</div>\n                            </div>                            \n                        </td>\n                    </tr>                                                                                    \n                </table>\n            </div>\n        </div>\n    </body>\n</html>
\.


--
-- Data for Name: vne_mailtemplates; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_mailtemplates (id, name, defended) FROM stdin;
2	[employee]restaurant-created	f
5	[employee]restaurant-low-money	f
6	[employee]restaurant-no-money	f
7	[admin]restaurants-low-no-money	f
\.


--
-- Data for Name: vne_product_images; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_product_images (id, product_id, img, pos) FROM stdin;
1	1	2021-9/1632350544594_500.jpg	0
2	1	2021-9/1632350619186_500.jpg	1
3	1	2021-9/1632350590230_500.jpg	2
5	3	2021-9/1632351029146_500.jpg	0
6	3	2021-9/1632351034607_500.jpg	1
7	3	2021-9/1632351041578_500.jpg	2
8	4	2021-9/1632351091004_500.jpg	0
9	4	2021-9/1632351105494_500.jpg	1
352	85	2021-9/1632499571768_500.jpg	0
353	85	2021-9/1632499577953_500.jpg	2
354	85	2021-9/1632499583250_500.jpg	3
355	85	2021-9/1632499590140_500.jpg	4
150	85	2021-9/1632350544594_500.jpg	5
151	85	2021-9/1632350619186_500.jpg	7
152	86	2021-9/1632350544594_500.jpg	0
153	86	2021-9/1632350619186_500.jpg	0
154	87	2021-9/1632350544594_500.jpg	0
155	87	2021-9/1632350619186_500.jpg	0
156	88	2021-9/1632350544594_500.jpg	0
157	88	2021-9/1632350619186_500.jpg	0
158	89	2021-9/1632350544594_500.jpg	0
159	89	2021-9/1632350619186_500.jpg	0
160	90	2021-9/1632350544594_500.jpg	0
161	90	2021-9/1632350619186_500.jpg	0
162	91	2021-9/1632350544594_500.jpg	0
163	91	2021-9/1632350619186_500.jpg	0
164	92	2021-9/1632350544594_500.jpg	0
165	92	2021-9/1632350619186_500.jpg	0
166	93	2021-9/1632350544594_500.jpg	0
167	93	2021-9/1632350619186_500.jpg	0
170	95	2021-9/1632350544594_500.jpg	0
171	95	2021-9/1632350619186_500.jpg	0
172	96	2021-9/1632350544594_500.jpg	0
173	96	2021-9/1632350619186_500.jpg	0
174	97	2021-9/1632350544594_500.jpg	0
175	97	2021-9/1632350619186_500.jpg	0
176	98	2021-9/1632350544594_500.jpg	0
177	98	2021-9/1632350619186_500.jpg	0
178	99	2021-9/1632350544594_500.jpg	0
179	99	2021-9/1632350619186_500.jpg	0
180	100	2021-9/1632350544594_500.jpg	0
181	100	2021-9/1632350619186_500.jpg	0
182	101	2021-9/1632350544594_500.jpg	0
183	101	2021-9/1632350619186_500.jpg	0
184	102	2021-9/1632350544594_500.jpg	0
185	102	2021-9/1632350619186_500.jpg	0
186	103	2021-9/1632350544594_500.jpg	0
187	103	2021-9/1632350619186_500.jpg	0
188	104	2021-9/1632350544594_500.jpg	0
189	104	2021-9/1632350619186_500.jpg	0
190	105	2021-9/1632350544594_500.jpg	0
191	105	2021-9/1632350619186_500.jpg	0
192	106	2021-9/1632350544594_500.jpg	0
193	106	2021-9/1632350619186_500.jpg	0
194	107	2021-9/1632350544594_500.jpg	0
195	107	2021-9/1632350619186_500.jpg	0
196	108	2021-9/1632350544594_500.jpg	0
197	108	2021-9/1632350619186_500.jpg	0
198	109	2021-9/1632350544594_500.jpg	0
199	109	2021-9/1632350619186_500.jpg	0
200	110	2021-9/1632350544594_500.jpg	0
201	110	2021-9/1632350619186_500.jpg	0
202	111	2021-9/1632350544594_500.jpg	0
203	111	2021-9/1632350619186_500.jpg	0
204	112	2021-9/1632350544594_500.jpg	0
205	112	2021-9/1632350619186_500.jpg	0
206	113	2021-9/1632350544594_500.jpg	0
207	113	2021-9/1632350619186_500.jpg	0
208	114	2021-9/1632350544594_500.jpg	0
209	114	2021-9/1632350619186_500.jpg	0
210	115	2021-9/1632350544594_500.jpg	0
211	115	2021-9/1632350619186_500.jpg	0
212	116	2021-9/1632350544594_500.jpg	0
213	116	2021-9/1632350619186_500.jpg	0
214	117	2021-9/1632350544594_500.jpg	0
215	117	2021-9/1632350619186_500.jpg	0
216	118	2021-9/1632350544594_500.jpg	0
217	118	2021-9/1632350619186_500.jpg	0
218	119	2021-9/1632350544594_500.jpg	0
219	119	2021-9/1632350619186_500.jpg	0
220	120	2021-9/1632350544594_500.jpg	0
221	120	2021-9/1632350619186_500.jpg	0
222	121	2021-9/1632350544594_500.jpg	0
223	121	2021-9/1632350619186_500.jpg	0
224	122	2021-9/1632350544594_500.jpg	0
225	122	2021-9/1632350619186_500.jpg	0
226	123	2021-9/1632350544594_500.jpg	0
227	123	2021-9/1632350619186_500.jpg	0
228	124	2021-9/1632350544594_500.jpg	0
229	124	2021-9/1632350619186_500.jpg	0
230	125	2021-9/1632350544594_500.jpg	0
231	125	2021-9/1632350619186_500.jpg	0
232	126	2021-9/1632350544594_500.jpg	0
233	126	2021-9/1632350619186_500.jpg	0
234	127	2021-9/1632350544594_500.jpg	0
235	127	2021-9/1632350619186_500.jpg	0
236	128	2021-9/1632350544594_500.jpg	0
237	128	2021-9/1632350619186_500.jpg	0
238	129	2021-9/1632350544594_500.jpg	0
239	129	2021-9/1632350619186_500.jpg	0
240	130	2021-9/1632350544594_500.jpg	0
241	130	2021-9/1632350619186_500.jpg	0
242	131	2021-9/1632350544594_500.jpg	0
243	131	2021-9/1632350619186_500.jpg	0
244	132	2021-9/1632350544594_500.jpg	0
245	132	2021-9/1632350619186_500.jpg	0
246	133	2021-9/1632350544594_500.jpg	0
247	133	2021-9/1632350619186_500.jpg	0
248	134	2021-9/1632350544594_500.jpg	0
249	134	2021-9/1632350619186_500.jpg	0
250	135	2021-9/1632350544594_500.jpg	0
251	135	2021-9/1632350619186_500.jpg	0
252	136	2021-9/1632350544594_500.jpg	0
253	136	2021-9/1632350619186_500.jpg	0
254	137	2021-9/1632350544594_500.jpg	0
255	137	2021-9/1632350619186_500.jpg	0
256	138	2021-9/1632350544594_500.jpg	0
257	138	2021-9/1632350619186_500.jpg	0
258	139	2021-9/1632350544594_500.jpg	0
259	139	2021-9/1632350619186_500.jpg	0
260	140	2021-9/1632350544594_500.jpg	0
261	140	2021-9/1632350619186_500.jpg	0
262	141	2021-9/1632350544594_500.jpg	0
263	141	2021-9/1632350619186_500.jpg	0
264	142	2021-9/1632350544594_500.jpg	0
265	142	2021-9/1632350619186_500.jpg	0
266	143	2021-9/1632350544594_500.jpg	0
267	143	2021-9/1632350619186_500.jpg	0
268	144	2021-9/1632350544594_500.jpg	0
269	144	2021-9/1632350619186_500.jpg	0
270	145	2021-9/1632350544594_500.jpg	0
271	145	2021-9/1632350619186_500.jpg	0
272	146	2021-9/1632350544594_500.jpg	0
273	146	2021-9/1632350619186_500.jpg	0
274	147	2021-9/1632350544594_500.jpg	0
275	147	2021-9/1632350619186_500.jpg	0
276	148	2021-9/1632350544594_500.jpg	0
277	148	2021-9/1632350619186_500.jpg	0
278	149	2021-9/1632350544594_500.jpg	0
279	149	2021-9/1632350619186_500.jpg	0
280	150	2021-9/1632350544594_500.jpg	0
281	150	2021-9/1632350619186_500.jpg	0
282	151	2021-9/1632350544594_500.jpg	0
283	151	2021-9/1632350619186_500.jpg	0
284	152	2021-9/1632350544594_500.jpg	0
285	152	2021-9/1632350619186_500.jpg	0
286	153	2021-9/1632350544594_500.jpg	0
287	153	2021-9/1632350619186_500.jpg	0
288	154	2021-9/1632350544594_500.jpg	0
289	154	2021-9/1632350619186_500.jpg	0
290	155	2021-9/1632350544594_500.jpg	0
291	155	2021-9/1632350619186_500.jpg	0
292	156	2021-9/1632350544594_500.jpg	0
293	156	2021-9/1632350619186_500.jpg	0
294	157	2021-9/1632350544594_500.jpg	0
295	157	2021-9/1632350619186_500.jpg	0
296	158	2021-9/1632350544594_500.jpg	0
297	158	2021-9/1632350619186_500.jpg	0
298	159	2021-9/1632350544594_500.jpg	0
299	159	2021-9/1632350619186_500.jpg	0
300	160	2021-9/1632350544594_500.jpg	0
301	160	2021-9/1632350619186_500.jpg	0
302	161	2021-9/1632350544594_500.jpg	0
303	161	2021-9/1632350619186_500.jpg	0
304	162	2021-9/1632350544594_500.jpg	0
305	162	2021-9/1632350619186_500.jpg	0
306	163	2021-9/1632350544594_500.jpg	0
307	163	2021-9/1632350619186_500.jpg	0
308	164	2021-9/1632350544594_500.jpg	0
309	164	2021-9/1632350619186_500.jpg	0
310	165	2021-9/1632350544594_500.jpg	0
311	165	2021-9/1632350619186_500.jpg	0
312	166	2021-9/1632350544594_500.jpg	0
313	166	2021-9/1632350619186_500.jpg	0
314	167	2021-9/1632350544594_500.jpg	0
315	167	2021-9/1632350619186_500.jpg	0
316	168	2021-9/1632350544594_500.jpg	0
317	168	2021-9/1632350619186_500.jpg	0
318	169	2021-9/1632350544594_500.jpg	0
319	169	2021-9/1632350619186_500.jpg	0
320	170	2021-9/1632350544594_500.jpg	0
321	170	2021-9/1632350619186_500.jpg	0
322	171	2021-9/1632350544594_500.jpg	0
323	171	2021-9/1632350619186_500.jpg	0
324	172	2021-9/1632350544594_500.jpg	0
325	172	2021-9/1632350619186_500.jpg	0
326	173	2021-9/1632350544594_500.jpg	0
327	173	2021-9/1632350619186_500.jpg	0
328	174	2021-9/1632350544594_500.jpg	0
329	174	2021-9/1632350619186_500.jpg	0
330	175	2021-9/1632350544594_500.jpg	0
331	175	2021-9/1632350619186_500.jpg	0
332	176	2021-9/1632350544594_500.jpg	0
333	176	2021-9/1632350619186_500.jpg	0
334	177	2021-9/1632350544594_500.jpg	0
335	177	2021-9/1632350619186_500.jpg	0
336	178	2021-9/1632350544594_500.jpg	0
337	178	2021-9/1632350619186_500.jpg	0
338	179	2021-9/1632350544594_500.jpg	0
339	179	2021-9/1632350619186_500.jpg	0
340	180	2021-9/1632350544594_500.jpg	0
341	180	2021-9/1632350619186_500.jpg	0
342	181	2021-9/1632350544594_500.jpg	0
343	181	2021-9/1632350619186_500.jpg	0
344	182	2021-9/1632350544594_500.jpg	0
345	182	2021-9/1632350619186_500.jpg	0
346	183	2021-9/1632350544594_500.jpg	0
347	183	2021-9/1632350619186_500.jpg	0
348	184	2021-9/1632350544594_500.jpg	0
349	184	2021-9/1632350619186_500.jpg	0
\.


--
-- Data for Name: vne_products; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_products (id, cat_id, name, weight, cal, "time", about, pos, active, likes, code, recommended, price, restaurant_id) FROM stdin;
85	1	Гамбургер "Бостон"	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	2	t	0	hf0001	f	1000	21
1	1	Гамбургер с телятиной	300	500	10 мин	Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. Большой вкусный гамбургер с телятиной и овощами. 	0	t	0	h0001	f	100	21
2	6	Тестовое блюдо	0	0			1	t	0		f	0	9
97	1	Какое-то блюдо 13	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	14	t	0	hf00013	f	1000	21
4	4	Цитрусовая нарезка	250	100	5 мин.	Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. Большая тарелка апельсинов и грейпфрутов. 	1	t	1	f0001	f	200	21
87	1	Какое-то блюдо 3	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	4	t	0	hf0003	f	1000	21
3	1	Королевский чизбургер	410	755	10-12 мин	Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. Большой сытный бутерброд с сыром и зеленью. 	1	t	5	h0002	t	305	21
98	1	Какое-то блюдо 14	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	15	t	0	hf00014	f	1000	21
99	1	Какое-то блюдо 15	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	16	t	0	hf00015	f	1000	21
100	1	Какое-то блюдо 16	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	17	t	0	hf00016	f	1000	21
101	1	Какое-то блюдо 17	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	18	t	0	hf00017	f	1000	21
102	1	Какое-то блюдо 18	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	19	t	0	hf00018	f	1000	21
103	1	Какое-то блюдо 19	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	20	t	0	hf00019	f	1000	21
104	1	Какое-то блюдо 20	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	21	t	0	hf00020	f	1000	21
105	1	Какое-то блюдо 21	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	22	t	0	hf00021	f	1000	21
106	1	Какое-то блюдо 22	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	23	t	0	hf00022	f	1000	21
107	1	Какое-то блюдо 23	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	24	t	0	hf00023	f	1000	21
108	1	Какое-то блюдо 24	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	25	t	0	hf00024	f	1000	21
109	1	Какое-то блюдо 25	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	26	t	0	hf00025	f	1000	21
110	1	Какое-то блюдо 26	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	27	t	0	hf00026	f	1000	21
111	1	Какое-то блюдо 27	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	28	t	0	hf00027	f	1000	21
112	1	Какое-то блюдо 28	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	29	t	0	hf00028	f	1000	21
113	1	Какое-то блюдо 29	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	30	t	0	hf00029	f	1000	21
114	1	Какое-то блюдо 30	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	31	t	0	hf00030	f	1000	21
115	1	Какое-то блюдо 31	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	32	t	0	hf00031	f	1000	21
116	1	Какое-то блюдо 32	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	33	t	0	hf00032	f	1000	21
117	1	Какое-то блюдо 33	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	34	t	0	hf00033	f	1000	21
118	1	Какое-то блюдо 34	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	35	t	0	hf00034	f	1000	21
119	1	Какое-то блюдо 35	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	36	t	0	hf00035	f	1000	21
120	1	Какое-то блюдо 36	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	37	t	0	hf00036	f	1000	21
121	1	Какое-то блюдо 37	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	38	t	0	hf00037	f	1000	21
122	1	Какое-то блюдо 38	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	39	t	0	hf00038	f	1000	21
123	1	Какое-то блюдо 39	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	40	t	0	hf00039	f	1000	21
124	1	Какое-то блюдо 40	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	41	t	0	hf00040	f	1000	21
125	1	Какое-то блюдо 41	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	42	t	0	hf00041	f	1000	21
126	1	Какое-то блюдо 42	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	43	t	0	hf00042	f	1000	21
127	1	Какое-то блюдо 43	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	44	t	0	hf00043	f	1000	21
88	1	Какое-то блюдо 4	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	5	t	0	hf0004	f	1000	21
89	1	Какое-то блюдо 5	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	6	t	0	hf0005	f	1000	21
90	1	Какое-то блюдо 6	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	7	t	0	hf0006	f	1000	21
91	1	Какое-то блюдо 7	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	8	t	0	hf0007	f	1000	21
92	1	Какое-то блюдо 8	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	9	t	0	hf0008	f	1000	21
93	1	Какое-то блюдо 9	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	10	t	0	hf0009	f	1000	21
94	1	Какое-то блюдо 10	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	11	t	0	hf00010	f	1000	21
96	1	Какое-то блюдо 12	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	13	t	0	hf00012	f	1000	21
86	1	Какое-то блюдо 2	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	3	t	0	hf0002	f	1000	21
95	1	Какое-то блюдо 11	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	12	t	0	hf00011	f	1000	21
128	1	Какое-то блюдо 44	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	45	t	0	hf00044	f	1000	21
129	1	Какое-то блюдо 45	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	46	t	0	hf00045	f	1000	21
130	1	Какое-то блюдо 46	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	47	t	0	hf00046	f	1000	21
131	1	Какое-то блюдо 47	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	48	t	0	hf00047	f	1000	21
132	1	Какое-то блюдо 48	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	49	t	0	hf00048	f	1000	21
133	1	Какое-то блюдо 49	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	50	t	0	hf00049	f	1000	21
134	1	Какое-то блюдо 50	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	51	t	0	hf00050	f	1000	21
135	1	Какое-то блюдо 51	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	52	t	0	hf00051	f	1000	21
136	1	Какое-то блюдо 52	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	53	t	0	hf00052	f	1000	21
137	1	Какое-то блюдо 53	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	54	t	0	hf00053	f	1000	21
138	1	Какое-то блюдо 54	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	55	t	0	hf00054	f	1000	21
139	1	Какое-то блюдо 55	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	56	t	0	hf00055	f	1000	21
140	1	Какое-то блюдо 56	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	57	t	0	hf00056	f	1000	21
141	1	Какое-то блюдо 57	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	58	t	0	hf00057	f	1000	21
142	1	Какое-то блюдо 58	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	59	t	0	hf00058	f	1000	21
143	1	Какое-то блюдо 59	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	60	t	0	hf00059	f	1000	21
144	1	Какое-то блюдо 60	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	61	t	0	hf00060	f	1000	21
145	1	Какое-то блюдо 61	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	62	t	0	hf00061	f	1000	21
146	1	Какое-то блюдо 62	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	63	t	0	hf00062	f	1000	21
147	1	Какое-то блюдо 63	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	64	t	0	hf00063	f	1000	21
148	1	Какое-то блюдо 64	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	65	t	0	hf00064	f	1000	21
149	1	Какое-то блюдо 65	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	66	t	0	hf00065	f	1000	21
150	1	Какое-то блюдо 66	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	67	t	0	hf00066	f	1000	21
151	1	Какое-то блюдо 67	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	68	t	0	hf00067	f	1000	21
152	1	Какое-то блюдо 68	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	69	t	0	hf00068	f	1000	21
153	1	Какое-то блюдо 69	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	70	t	0	hf00069	f	1000	21
154	1	Какое-то блюдо 70	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	71	t	0	hf00070	f	1000	21
155	1	Какое-то блюдо 71	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	72	t	0	hf00071	f	1000	21
156	1	Какое-то блюдо 72	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	73	t	0	hf00072	f	1000	21
157	1	Какое-то блюдо 73	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	74	t	0	hf00073	f	1000	21
158	1	Какое-то блюдо 74	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	75	t	0	hf00074	f	1000	21
159	1	Какое-то блюдо 75	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	76	t	0	hf00075	f	1000	21
160	1	Какое-то блюдо 76	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	77	t	0	hf00076	f	1000	21
161	1	Какое-то блюдо 77	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	78	t	0	hf00077	f	1000	21
162	1	Какое-то блюдо 78	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	79	t	0	hf00078	f	1000	21
163	1	Какое-то блюдо 79	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	80	t	0	hf00079	f	1000	21
164	1	Какое-то блюдо 80	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	81	t	0	hf00080	f	1000	21
165	1	Какое-то блюдо 81	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	82	t	0	hf00081	f	1000	21
166	1	Какое-то блюдо 82	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	83	t	0	hf00082	f	1000	21
167	1	Какое-то блюдо 83	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	84	t	0	hf00083	f	1000	21
168	1	Какое-то блюдо 84	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	85	t	0	hf00084	f	1000	21
169	1	Какое-то блюдо 85	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	86	t	0	hf00085	f	1000	21
170	1	Какое-то блюдо 86	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	87	t	0	hf00086	f	1000	21
171	1	Какое-то блюдо 87	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	88	t	0	hf00087	f	1000	21
172	1	Какое-то блюдо 88	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	89	t	0	hf00088	f	1000	21
173	1	Какое-то блюдо 89	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	90	t	0	hf00089	f	1000	21
174	1	Какое-то блюдо 90	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	91	t	0	hf00090	f	1000	21
175	1	Какое-то блюдо 91	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	92	t	0	hf00091	f	1000	21
176	1	Какое-то блюдо 92	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	93	t	0	hf00092	f	1000	21
177	1	Какое-то блюдо 93	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	94	t	0	hf00093	f	1000	21
178	1	Какое-то блюдо 94	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	95	t	0	hf00094	f	1000	21
179	1	Какое-то блюдо 95	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	96	t	0	hf00095	f	1000	21
180	1	Какое-то блюдо 96	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	97	t	0	hf00096	f	1000	21
181	1	Какое-то блюдо 97	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	98	t	0	hf00097	f	1000	21
184	1	Какое-то блюдо 100	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	101	t	0	hf000100	f	1000	21
182	1	Какое-то блюдо 98	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	99	t	0	hf00098	f	1000	21
183	1	Какое-то блюдо 99	500	600	15 мин	Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда Краткое описание какого-то блюда	100	t	0	hf00099	f	1000	21
\.


--
-- Data for Name: vne_restaurants; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_restaurants (id, currency_id, name, domain, ownername, phone, address, inn, ogrn, comment, created_at, lang_id, money) FROM stdin;
2	2	Рога и копыта	roga	Андрей Рыбкин	+38 067 0000000	Москва, ул. Собачкина, 2	111222	333555	еще один тестовый ресторан	2021-08-26 20:52:31.021727	1	0
6	1	Привет из 90-х	test4	\N	\N	\N	\N	\N	\N	2021-08-27 00:24:57.598572	1	0
4	1	Шашлычная №1	test2	\N	\N	\N	\N	\N	\N	2021-08-27 00:24:10.543446	1	0
3	1	Одарка	test1	\N	\N	\N	\N	\N	\N	2021-08-27 00:23:50.454941	1	0
7	1	National	test5	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:04.843937	1	0
18	1	Пирожковая	pirog	\N	+380664021350	Танкопия, 13/99	\N	\N	\N	2021-08-27 22:30:50.941314	1	-10
19	1	Рыбный день	test222	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2021-08-28 00:39:48.284041	1	-10
1	1	Плакучая ива	iva	Иван Петров	+38 066 4020000	Харьков, ул. Кошкина, 1	123456	654987	тестовый ресторан	2021-08-26 20:52:31.021727	1	-10
10	1	Сто пудов	test8	Алексей Сидоров	+380664021350	Танкопия, 1	\N	\N	\N	2021-08-27 00:25:50.223075	1	-10
45	1	Кошки-мышки	http://ukr.net	Максим Савенков	+380667889999	Танкопия, 13/9	999666333	555444	\N	2021-09-02 21:07:52.119825	1	-10
5	1	У Ашота	test3	Алексей Козлов	+380664021350	Танкопия, 1	\N	\N	\N	2021-08-27 00:24:34.213564	2	0
9	1	McDonalds	test7	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:34.269246	1	-10
13	2	Ромашка	test11	Свинкин Олег Иванович	+3806778945612	ул. Ленина, 2	999666333	888999999	тестовый камент	2021-08-27 00:26:35.018103	2	0
46	1	RRR		Овечкин Игорь Иванович	+380664021350	Танкопия, 103	999666333	555444	\N	2021-09-07 01:16:30.429325	1	-10
15	1	Длинное название ресторана	test12	\N	\N	\N	\N	\N	\N	2021-08-27 01:55:15.844543	1	-10
43	1	Надежда	nadezhda.ru	Овечкин Игорь Иванович	+38066666666	Танкопия, 5	123654	654987	\N	2021-09-02 12:36:33.846619	1	-10
22	1	Курский	kursk	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2021-08-28 11:27:23.119406	1	-10
38	1	Владимирский	http://vlad.net	Овечкин Игорь Иванович	+380664021350	Танкопия, 13/9	999666333	11222333	тест	2021-08-30 12:54:22.738402	1	-10
21	1	Пушкинский	https://push.ru	Курочкин Иван Кузьмич	+38 097 456789987	Москва	456	654	\N	2021-08-28 11:12:59.882811	1	9960
12	1	Вкусно-быстро	tets10.ry	Птичкин Федор Моисеевич	+38 095 12345687	Харьков, ул. Маршала Жукова, 5	666555444	11222333	\N	2021-08-27 00:26:24.033626	1	0
8	1	Слепая свинья	test6	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:12.606101	1	0
\.


--
-- Data for Name: vne_settings; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_settings (id, p, v, c, pos, in_app, defended) FROM stdin;
5	smtp-host	smtp.gmail.com	\N	100	f	f
6	smtp-port	587	\N	101	f	f
7	smtp-login	viodev.robot@gmail.com	\N	102	f	f
8	smtp-pw	6vl1TfeXq	\N	103	f	f
9	price	10	цена человеко-дня	4	t	f
10	pay-time	1:00	время снятия денег со счетов	5	t	f
12	restorator-msg		сообщение для рестораторов	6	t	f
2	google-clientid	63103186909-5ut3m449vpr9uqp0v7jv02phea85mub0.apps.googleusercontent.com	Google Oauth API client ID	200	t	f
13	customer-app-url	https://customer.restclick.vio.net.ua	URL приложения посетителей	3	t	f
4	owner-app-url	https://owner.restclick.vio.net.ua	URL админки владельца	1	t	f
11	restorator-app-url	https://restorator.restclick.vio.net.ua	URL админки рестораторов	2	t	f
\.


--
-- Data for Name: vne_tables; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_tables (id, hall_id, no, seats, x, y, code) FROM stdin;
46	1	6	12	5	1	5qskgfyuhg
42	1	2	3	1	1	295rfgqpzd
44	1	4	6	3	1	p7s5o02uhk
51	3	1	1	1	1	vvgshsy57v
26	2	1	3	0	0	sdfjh98fdnh4
27	2	2	3	1	2	ao48dfb
28	2	3	4	2	1	de84nbhdfj
3	4	1	4	0	1	anfiw74hbds
25	4	2	4	1	0	losd84dj
30	5	1	4	2	0	sdlkfjh8fnh
29	5	2	6	0	0	sdlkfjh8fnh2
33	1	1	1	0	0	z2nb4kfbva
43	1	3	4	2	2	crjg85mjns
45	1	5	8	4	0	ztk4xx23iu
\.


--
-- Data for Name: vne_transactions; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_transactions (id, restaurant_id, amount, created_at, type) FROM stdin;
1	1	111	2021-09-02 13:03:47.052906	auto
3	2	88	2021-09-02 13:04:23.827832	auto
4	18	333	2021-09-02 15:44:46.945943	auto
5	15	94	2021-09-02 15:45:26.75125	auto
6	19	1000	2021-09-02 16:10:59.442815	admin
7	12	9476	2021-09-02 16:11:06.945146	admin
9	45	5	2021-09-02 21:09:19.325418	admin
10	1	111	2021-09-02 21:50:21.612191	admin
12	1	654	2021-09-02 21:50:31.732758	admin
2	1	-555	2021-09-01 13:04:10.573991	auto
13	1	65498	2021-09-01 21:50:39.086692	admin
11	1	222	2021-09-03 21:50:26.375833	admin
14	38	111	2021-09-02 23:56:56.688894	admin
15	43	945	2021-09-02 23:58:40.44392	admin
16	8	20	2021-09-03 01:42:34.353377	admin
17	19	-10	2021-09-04 13:04:00.022706	auto
18	43	-20	2021-09-04 13:04:00.033026	auto
19	18	-10	2021-09-04 13:04:00.037046	auto
20	21	-10	2021-09-04 13:04:00.041014	auto
21	1	-10	2021-09-04 13:04:00.044523	auto
22	15	0	2021-09-04 13:04:00.047105	auto
24	12	0	2021-09-04 13:04:00.051933	auto
25	15	0	2021-09-04 13:05:00.015339	auto
26	19	-10	2021-09-04 13:05:00.021543	auto
27	43	-20	2021-09-04 13:05:00.026542	auto
28	18	-10	2021-09-04 13:05:00.030034	auto
29	21	-10	2021-09-04 13:05:00.034265	auto
30	1	-10	2021-09-04 13:05:00.037458	auto
32	12	0	2021-09-04 13:05:00.042122	auto
33	21	-10	2021-09-04 13:06:00.01753	auto
34	1	-10	2021-09-04 13:06:00.02342	auto
35	15	0	2021-09-04 13:06:00.02588	auto
36	19	-10	2021-09-04 13:06:00.029048	auto
37	43	-20	2021-09-04 13:06:00.032726	auto
39	18	-10	2021-09-04 13:06:00.037953	auto
40	12	0	2021-09-04 13:06:00.039699	auto
42	2	0	2021-09-04 13:26:00.01843	auto
43	21	-10	2021-09-04 13:26:00.029709	auto
44	1	-10	2021-09-04 13:26:00.034822	auto
45	19	-10	2021-09-04 13:26:00.039625	auto
46	6	0	2021-09-04 13:26:00.041881	auto
47	43	-20	2021-09-04 13:26:00.045869	auto
48	4	0	2021-09-04 13:26:00.047967	auto
49	3	0	2021-09-04 13:26:00.051024	auto
50	18	-10	2021-09-04 13:26:00.054318	auto
51	7	0	2021-09-04 13:26:00.056832	auto
52	13	0	2021-09-04 13:26:00.058699	auto
53	15	0	2021-09-04 13:26:00.060929	auto
54	5	0	2021-09-04 13:26:00.062832	auto
56	12	0	2021-09-04 13:26:00.067299	auto
57	2	0	2021-09-06 22:00:00.019514	auto
58	6	0	2021-09-06 22:00:00.027212	auto
59	4	0	2021-09-06 22:00:00.029621	auto
60	3	0	2021-09-06 22:00:00.032211	auto
61	7	0	2021-09-06 22:00:00.034425	auto
62	21	-10	2021-09-06 22:00:00.040711	auto
63	1	-10	2021-09-06 22:00:00.044047	auto
64	19	-10	2021-09-06 22:00:00.047616	auto
65	43	-20	2021-09-06 22:00:00.053069	auto
66	18	-10	2021-09-06 22:00:00.060408	auto
67	13	0	2021-09-06 22:00:00.06434	auto
68	15	0	2021-09-06 22:00:00.066668	auto
69	5	0	2021-09-06 22:00:00.068827	auto
71	12	0	2021-09-06 22:00:00.072766	auto
72	1	10	2021-09-06 22:38:10.37606	admin
73	13	10	2021-09-06 22:38:20.373376	admin
74	2	0	2021-09-06 23:00:00.014002	auto
75	6	0	2021-09-06 23:00:00.017811	auto
76	4	0	2021-09-06 23:00:00.021111	auto
77	3	0	2021-09-06 23:00:00.023257	auto
78	7	0	2021-09-06 23:00:00.025197	auto
79	21	-10	2021-09-06 23:00:00.028396	auto
80	19	-10	2021-09-06 23:00:00.031333	auto
81	43	-20	2021-09-06 23:00:00.033955	auto
82	15	0	2021-09-06 23:00:00.035544	auto
83	18	-10	2021-09-06 23:00:00.038747	auto
84	5	0	2021-09-06 23:00:00.040347	auto
85	1	-10	2021-09-06 23:00:00.043222	auto
86	13	0	2021-09-06 23:00:00.045562	auto
88	12	0	2021-09-06 23:00:00.049146	auto
89	2	0	2021-09-07 00:00:00.028703	auto
90	6	0	2021-09-07 00:00:00.035382	auto
91	4	0	2021-09-07 00:00:00.038967	auto
92	3	0	2021-09-07 00:00:00.041646	auto
93	7	0	2021-09-07 00:00:00.044087	auto
94	15	0	2021-09-07 00:00:00.046873	auto
95	5	0	2021-09-07 00:00:00.049036	auto
96	13	0	2021-09-07 00:00:00.051138	auto
98	21	-10	2021-09-07 00:00:00.059995	auto
99	19	-10	2021-09-07 00:00:00.063678	auto
100	43	-20	2021-09-07 00:00:00.067297	auto
101	18	-10	2021-09-07 00:00:00.070364	auto
102	1	-10	2021-09-07 00:00:00.073924	auto
103	12	0	2021-09-07 00:00:00.075807	auto
104	21	-10	2021-09-07 01:00:00.026775	auto
105	19	-10	2021-09-07 01:00:00.034456	auto
106	2	0	2021-09-07 01:00:00.03753	auto
107	43	-20	2021-09-07 01:00:00.041674	auto
108	18	-10	2021-09-07 01:00:00.04486	auto
109	1	-10	2021-09-07 01:00:00.048041	auto
110	6	0	2021-09-07 01:00:00.050004	auto
111	4	0	2021-09-07 01:00:00.051833	auto
112	3	0	2021-09-07 01:00:00.054704	auto
113	7	0	2021-09-07 01:00:00.056673	auto
114	15	0	2021-09-07 01:00:00.061801	auto
115	5	0	2021-09-07 01:00:00.064183	auto
116	13	0	2021-09-07 01:00:00.066073	auto
118	12	0	2021-09-07 01:00:00.069909	auto
119	46	10	2021-09-07 01:20:47.019533	admin
120	2	0	2021-09-07 02:00:00.017818	auto
121	6	0	2021-09-07 02:00:00.025269	auto
122	21	-10	2021-09-07 02:00:00.032632	auto
123	4	0	2021-09-07 02:00:00.036056	auto
124	3	0	2021-09-07 02:00:00.038632	auto
125	19	-10	2021-09-07 02:00:00.043307	auto
126	7	0	2021-09-07 02:00:00.045533	auto
127	43	-20	2021-09-07 02:00:00.050413	auto
128	18	-10	2021-09-07 02:00:00.054104	auto
129	1	-10	2021-09-07 02:00:00.058118	auto
130	46	-10	2021-09-07 02:00:00.061641	auto
131	15	0	2021-09-07 02:00:00.063554	auto
132	5	0	2021-09-07 02:00:00.06549	auto
133	13	0	2021-09-07 02:00:00.06789	auto
135	12	0	2021-09-07 02:00:00.071931	auto
136	46	10	2021-09-07 02:02:38.330188	admin
137	2	0	2021-09-07 13:00:00.02493	auto
138	6	0	2021-09-07 13:00:00.035272	auto
139	4	0	2021-09-07 13:00:00.038529	auto
140	3	0	2021-09-07 13:00:00.041856	auto
141	7	0	2021-09-07 13:00:00.045124	auto
142	21	-10	2021-09-07 13:00:00.052592	auto
143	19	-10	2021-09-07 13:00:00.056713	auto
144	43	-20	2021-09-07 13:00:00.061163	auto
145	15	-10	2021-09-07 13:00:00.065458	auto
146	18	-10	2021-09-07 13:00:00.068697	auto
147	5	0	2021-09-07 13:00:00.071067	auto
148	1	-10	2021-09-07 13:00:00.07406	auto
149	13	0	2021-09-07 13:00:00.076143	auto
150	46	-10	2021-09-07 13:00:00.079058	auto
152	12	0	2021-09-07 13:00:00.082937	auto
153	1	-10	2021-09-07 14:00:00.015885	auto
154	46	-10	2021-09-07 14:00:00.021411	auto
155	2	0	2021-09-07 14:00:00.025419	auto
156	6	0	2021-09-07 14:00:00.028364	auto
157	4	0	2021-09-07 14:00:00.032344	auto
158	3	0	2021-09-07 14:00:00.035692	auto
159	7	0	2021-09-07 14:00:00.04082	auto
160	5	0	2021-09-07 14:00:00.043286	auto
161	13	0	2021-09-07 14:00:00.045464	auto
162	21	-10	2021-09-07 14:00:00.050352	auto
163	19	-10	2021-09-07 14:00:00.059344	auto
165	43	-20	2021-09-07 14:00:00.066222	auto
166	15	-10	2021-09-07 14:00:00.070157	auto
167	18	-10	2021-09-07 14:00:00.073206	auto
168	12	0	2021-09-07 14:00:00.075463	auto
169	2	0	2021-09-07 15:00:00.012396	auto
170	1	-10	2021-09-07 15:00:00.018052	auto
171	21	-10	2021-09-07 15:00:00.021026	auto
172	6	0	2021-09-07 15:00:00.022897	auto
173	19	-10	2021-09-07 15:00:00.025953	auto
174	4	0	2021-09-07 15:00:00.027444	auto
175	3	0	2021-09-07 15:00:00.029089	auto
176	43	-20	2021-09-07 15:00:00.031935	auto
177	7	0	2021-09-07 15:00:00.033407	auto
178	15	-10	2021-09-07 15:00:00.035977	auto
179	18	-10	2021-09-07 15:00:00.038866	auto
180	5	0	2021-09-07 15:00:00.040363	auto
181	13	0	2021-09-07 15:00:00.041791	auto
183	12	0	2021-09-07 15:00:00.04501	auto
184	2	0	2021-09-07 16:00:00.020562	auto
185	6	0	2021-09-07 16:00:00.023366	auto
186	4	0	2021-09-07 16:00:00.02522	auto
187	3	0	2021-09-07 16:00:00.026919	auto
188	7	0	2021-09-07 16:00:00.028692	auto
189	1	-10	2021-09-07 16:00:00.031519	auto
190	21	-10	2021-09-07 16:00:00.034233	auto
191	19	-10	2021-09-07 16:00:00.036646	auto
192	43	-20	2021-09-07 16:00:00.039559	auto
193	15	-10	2021-09-07 16:00:00.042769	auto
194	18	-10	2021-09-07 16:00:00.045362	auto
195	5	0	2021-09-07 16:00:00.04691	auto
196	13	0	2021-09-07 16:00:00.048326	auto
198	12	0	2021-09-07 16:00:00.052135	auto
199	2	0	2021-09-07 18:00:00.011046	auto
200	6	0	2021-09-07 18:00:00.015074	auto
201	4	0	2021-09-07 18:00:00.017793	auto
202	3	0	2021-09-07 18:00:00.020677	auto
203	7	0	2021-09-07 18:00:00.023242	auto
204	1	-10	2021-09-07 18:00:00.028543	auto
205	5	0	2021-09-07 18:00:00.03048	auto
206	13	0	2021-09-07 18:00:00.032393	auto
207	21	-10	2021-09-07 18:00:00.035865	auto
209	19	-10	2021-09-07 18:00:00.041672	auto
210	43	-20	2021-09-07 18:00:00.044771	auto
211	15	-10	2021-09-07 18:00:00.048166	auto
212	18	-10	2021-09-07 18:00:00.051412	auto
213	12	0	2021-09-07 18:00:00.053204	auto
214	43	-20	2021-09-07 19:00:00.027418	auto
215	15	-10	2021-09-07 19:00:00.035713	auto
216	2	0	2021-09-07 19:00:00.039155	auto
217	18	-10	2021-09-07 19:00:00.043573	auto
218	6	0	2021-09-07 19:00:00.04613	auto
219	4	0	2021-09-07 19:00:00.048144	auto
220	3	0	2021-09-07 19:00:00.050042	auto
221	7	0	2021-09-07 19:00:00.052382	auto
222	5	0	2021-09-07 19:00:00.054246	auto
223	13	0	2021-09-07 19:00:00.057068	auto
225	1	-10	2021-09-07 19:00:00.062727	auto
226	21	-10	2021-09-07 19:00:00.065734	auto
227	19	-10	2021-09-07 19:00:00.069091	auto
228	12	0	2021-09-07 19:00:00.07084	auto
229	2	0	2021-09-07 20:00:00.014496	auto
230	43	-20	2021-09-07 20:00:00.028598	auto
231	6	0	2021-09-07 20:00:00.031775	auto
232	15	-10	2021-09-07 20:00:00.036556	auto
233	4	0	2021-09-07 20:00:00.038942	auto
234	3	0	2021-09-07 20:00:00.040878	auto
235	18	-10	2021-09-07 20:00:00.044115	auto
236	7	0	2021-09-07 20:00:00.045768	auto
237	1	-10	2021-09-07 20:00:00.049506	auto
238	21	-10	2021-09-07 20:00:00.052367	auto
239	19	-10	2021-09-07 20:00:00.055717	auto
240	5	0	2021-09-07 20:00:00.057343	auto
241	13	0	2021-09-07 20:00:00.059163	auto
243	12	0	2021-09-07 20:00:00.062481	auto
244	2	0	2021-09-07 21:00:00.013625	auto
245	6	0	2021-09-07 21:00:00.021713	auto
246	4	0	2021-09-07 21:00:00.02492	auto
247	3	0	2021-09-07 21:00:00.028167	auto
248	7	0	2021-09-07 21:00:00.031499	auto
249	43	-20	2021-09-07 21:00:00.038657	auto
250	15	-10	2021-09-07 21:00:00.042465	auto
251	18	-10	2021-09-07 21:00:00.047105	auto
252	1	-10	2021-09-07 21:00:00.050623	auto
253	21	-10	2021-09-07 21:00:00.054141	auto
254	19	-10	2021-09-07 21:00:00.057596	auto
255	5	0	2021-09-07 21:00:00.059461	auto
256	13	0	2021-09-07 21:00:00.061386	auto
258	12	0	2021-09-07 21:00:00.065456	auto
259	2	0	2021-09-07 22:00:00.008074	auto
260	6	0	2021-09-07 22:00:00.011443	auto
261	4	0	2021-09-07 22:00:00.01323	auto
262	3	0	2021-09-07 22:00:00.014871	auto
263	7	0	2021-09-07 22:00:00.016862	auto
264	5	0	2021-09-07 22:00:00.018721	auto
265	43	-10	2021-09-07 22:00:00.021995	auto
266	13	0	2021-09-07 22:00:00.02368	auto
267	15	-10	2021-09-07 22:00:00.026435	auto
268	18	-10	2021-09-07 22:00:00.029172	auto
269	1	-10	2021-09-07 22:00:00.031613	auto
271	19	-10	2021-09-07 22:00:00.036644	auto
272	21	-20	2021-09-07 22:00:00.039698	auto
273	12	0	2021-09-07 22:00:00.041332	auto
274	15	-10	2021-09-07 23:00:00.017032	auto
275	18	-10	2021-09-07 23:00:00.024546	auto
276	2	0	2021-09-07 23:00:00.027379	auto
277	1	-10	2021-09-07 23:00:00.030976	auto
278	19	-10	2021-09-07 23:00:00.035254	auto
279	6	0	2021-09-07 23:00:00.037486	auto
280	21	-20	2021-09-07 23:00:00.041448	auto
281	4	0	2021-09-07 23:00:00.04335	auto
282	3	0	2021-09-07 23:00:00.047869	auto
283	7	0	2021-09-07 23:00:00.050257	auto
284	5	0	2021-09-07 23:00:00.052521	auto
285	13	0	2021-09-07 23:00:00.055052	auto
287	43	-10	2021-09-07 23:00:00.060395	auto
288	12	0	2021-09-07 23:00:00.062209	auto
289	2	0	2021-09-08 00:00:00.016514	auto
290	6	0	2021-09-08 00:00:00.023391	auto
291	4	0	2021-09-08 00:00:00.025981	auto
292	3	0	2021-09-08 00:00:00.028899	auto
293	7	0	2021-09-08 00:00:00.031269	auto
294	18	-10	2021-09-08 00:00:00.037718	auto
295	1	-10	2021-09-08 00:00:00.041265	auto
296	19	-10	2021-09-08 00:00:00.045053	auto
297	21	-20	2021-09-08 00:00:00.049191	auto
298	43	-10	2021-09-08 00:00:00.052978	auto
299	5	0	2021-09-08 00:00:00.055276	auto
300	13	0	2021-09-08 00:00:00.057794	auto
302	12	0	2021-09-08 00:00:00.062022	auto
303	2	0	2021-09-08 01:00:00.008978	auto
304	6	0	2021-09-08 01:00:00.011343	auto
305	4	0	2021-09-08 01:00:00.012799	auto
306	3	0	2021-09-08 01:00:00.014837	auto
307	7	0	2021-09-08 01:00:00.016297	auto
308	1	-10	2021-09-08 01:00:00.019426	auto
309	19	-10	2021-09-08 01:00:00.021686	auto
310	21	-20	2021-09-08 01:00:00.024026	auto
311	5	0	2021-09-08 01:00:00.025669	auto
312	43	-10	2021-09-08 01:00:00.027828	auto
313	13	0	2021-09-08 01:00:00.0294	auto
315	12	0	2021-09-08 01:00:00.032206	auto
316	2	0	2021-09-08 01:01:00.007422	auto
317	6	0	2021-09-08 01:01:00.010715	auto
318	4	0	2021-09-08 01:01:00.012554	auto
319	3	0	2021-09-08 01:01:00.014102	auto
320	7	0	2021-09-08 01:01:00.015821	auto
321	5	0	2021-09-08 01:01:00.017348	auto
322	13	0	2021-09-08 01:01:00.018743	auto
323	1	-10	2021-09-08 01:01:00.021236	auto
325	19	-10	2021-09-08 01:01:00.025035	auto
326	21	-20	2021-09-08 01:01:00.027905	auto
327	43	-10	2021-09-08 01:01:00.030923	auto
328	12	0	2021-09-08 01:01:00.032434	auto
329	2	0	2021-09-08 01:02:00.006936	auto
330	6	0	2021-09-08 01:02:00.010784	auto
331	4	0	2021-09-08 01:02:00.012988	auto
332	3	0	2021-09-08 01:02:00.01497	auto
333	7	0	2021-09-08 01:02:00.017369	auto
334	5	0	2021-09-08 01:02:00.020311	auto
335	13	0	2021-09-08 01:02:00.02188	auto
337	1	-10	2021-09-08 01:02:00.0264	auto
338	19	-10	2021-09-08 01:02:00.02888	auto
339	21	-20	2021-09-08 01:02:00.031417	auto
340	43	-10	2021-09-08 01:02:00.033638	auto
341	12	0	2021-09-08 01:02:00.035256	auto
342	1	-10	2021-09-08 01:03:00.009127	auto
343	19	-10	2021-09-08 01:03:00.013572	auto
344	2	0	2021-09-08 01:03:00.015272	auto
345	21	-20	2021-09-08 01:03:00.017834	auto
346	43	-10	2021-09-08 01:03:00.020047	auto
347	6	0	2021-09-08 01:03:00.021451	auto
348	4	0	2021-09-08 01:03:00.023005	auto
349	3	0	2021-09-08 01:03:00.024398	auto
350	7	0	2021-09-08 01:03:00.025735	auto
351	5	0	2021-09-08 01:03:00.027092	auto
352	13	0	2021-09-08 01:03:00.028611	auto
354	12	0	2021-09-08 01:03:00.031232	auto
355	2	0	2021-09-08 01:04:00.005769	auto
356	6	0	2021-09-08 01:04:00.008709	auto
357	1	-10	2021-09-08 01:04:00.011728	auto
358	4	0	2021-09-08 01:04:00.01553	auto
359	3	0	2021-09-08 01:04:00.017118	auto
360	7	0	2021-09-08 01:04:00.018726	auto
361	19	-10	2021-09-08 01:04:00.021198	auto
362	21	-20	2021-09-08 01:04:00.023805	auto
363	43	-10	2021-09-08 01:04:00.0262	auto
364	5	0	2021-09-08 01:04:00.02806	auto
365	13	0	2021-09-08 01:04:00.029412	auto
367	12	0	2021-09-08 01:04:00.033481	auto
368	2	0	2021-09-08 01:05:00.011411	auto
369	6	0	2021-09-08 01:05:00.01339	auto
370	4	0	2021-09-08 01:05:00.014806	auto
371	3	0	2021-09-08 01:05:00.01644	auto
372	7	0	2021-09-08 01:05:00.017804	auto
373	1	-10	2021-09-08 01:05:00.020165	auto
374	19	-10	2021-09-08 01:05:00.022157	auto
375	43	-10	2021-09-08 01:05:00.025031	auto
376	5	0	2021-09-08 01:05:00.026433	auto
377	13	0	2021-09-08 01:05:00.027848	auto
379	12	0	2021-09-08 01:05:00.030733	auto
380	2	0	2021-09-08 01:06:00.005648	auto
381	6	0	2021-09-08 01:06:00.007905	auto
382	4	0	2021-09-08 01:06:00.009281	auto
383	3	0	2021-09-08 01:06:00.010774	auto
384	7	0	2021-09-08 01:06:00.012416	auto
385	1	-10	2021-09-08 01:06:00.015909	auto
386	5	0	2021-09-08 01:06:00.017405	auto
387	19	-10	2021-09-08 01:06:00.019746	auto
388	13	0	2021-09-08 01:06:00.021066	auto
389	43	-10	2021-09-08 01:06:00.024204	auto
391	12	0	2021-09-08 01:06:00.02686	auto
392	2	0	2021-09-08 01:07:00.012851	auto
393	6	0	2021-09-08 01:07:00.015439	auto
394	4	0	2021-09-08 01:07:00.017104	auto
395	3	0	2021-09-08 01:07:00.019376	auto
396	7	0	2021-09-08 01:07:00.02123	auto
397	5	0	2021-09-08 01:07:00.023094	auto
398	13	0	2021-09-08 01:07:00.024505	auto
399	1	-10	2021-09-08 01:07:00.02689	auto
400	19	-10	2021-09-08 01:07:00.028907	auto
401	43	-10	2021-09-08 01:07:00.031316	auto
403	12	0	2021-09-08 01:07:00.034349	auto
404	2	0	2021-09-08 01:08:00.143162	auto
405	6	0	2021-09-08 01:08:00.146335	auto
406	4	0	2021-09-08 01:08:00.148189	auto
407	3	0	2021-09-08 01:08:00.150211	auto
408	7	0	2021-09-08 01:08:00.151521	auto
409	5	0	2021-09-08 01:08:00.152996	auto
410	13	0	2021-09-08 01:08:00.154786	auto
412	1	-10	2021-09-08 01:08:00.159145	auto
413	19	-10	2021-09-08 01:08:00.161711	auto
414	43	-10	2021-09-08 01:08:00.163752	auto
415	12	0	2021-09-08 01:08:00.165156	auto
416	19	-10	2021-09-08 01:09:00.015105	auto
417	43	-10	2021-09-08 01:09:00.018371	auto
418	2	0	2021-09-08 01:09:00.020081	auto
419	6	0	2021-09-08 01:09:00.021348	auto
420	4	0	2021-09-08 01:09:00.022635	auto
421	3	0	2021-09-08 01:09:00.023976	auto
422	7	0	2021-09-08 01:09:00.025283	auto
423	5	0	2021-09-08 01:09:00.026517	auto
424	13	0	2021-09-08 01:09:00.027928	auto
426	1	-10	2021-09-08 01:09:00.031278	auto
427	12	0	2021-09-08 01:09:00.032809	auto
428	2	0	2021-09-08 01:10:00.012203	auto
429	19	-10	2021-09-08 01:10:00.015799	auto
430	43	-10	2021-09-08 01:10:00.018263	auto
431	6	0	2021-09-08 01:10:00.019559	auto
432	1	-10	2021-09-08 01:10:00.022014	auto
433	4	0	2021-09-08 01:10:00.02343	auto
434	3	0	2021-09-08 01:10:00.024708	auto
435	7	0	2021-09-08 01:10:00.02614	auto
436	5	0	2021-09-08 01:10:00.027383	auto
437	13	0	2021-09-08 01:10:00.028873	auto
439	12	0	2021-09-08 01:10:00.031647	auto
440	2	0	2021-09-08 01:11:00.011619	auto
441	6	0	2021-09-08 01:11:00.015606	auto
442	4	0	2021-09-08 01:11:00.017537	auto
443	3	0	2021-09-08 01:11:00.019259	auto
444	7	0	2021-09-08 01:11:00.021123	auto
445	19	-10	2021-09-08 01:11:00.023437	auto
446	43	-10	2021-09-08 01:11:00.026819	auto
447	1	-10	2021-09-08 01:11:00.029691	auto
448	5	0	2021-09-08 01:11:00.031552	auto
449	13	0	2021-09-08 01:11:00.033085	auto
451	12	0	2021-09-08 01:11:00.035654	auto
452	2	0	2021-09-08 01:12:00.006712	auto
453	6	0	2021-09-08 01:12:00.009439	auto
454	4	0	2021-09-08 01:12:00.011135	auto
455	3	0	2021-09-08 01:12:00.012534	auto
456	7	0	2021-09-08 01:12:00.014078	auto
457	19	-10	2021-09-08 01:12:00.01637	auto
458	43	-10	2021-09-08 01:12:00.019081	auto
459	1	-10	2021-09-08 01:12:00.021508	auto
460	5	0	2021-09-08 01:12:00.02305	auto
461	13	0	2021-09-08 01:12:00.024389	auto
463	12	0	2021-09-08 01:12:00.026944	auto
464	21	1000	2021-09-08 01:12:23.93482	admin
465	2	0	2021-09-08 01:13:00.00909	auto
466	6	0	2021-09-08 01:13:00.011915	auto
467	4	0	2021-09-08 01:13:00.013711	auto
468	3	0	2021-09-08 01:13:00.015103	auto
469	7	0	2021-09-08 01:13:00.016599	auto
470	19	-10	2021-09-08 01:13:00.019429	auto
471	5	0	2021-09-08 01:13:00.020675	auto
472	43	-10	2021-09-08 01:13:00.023351	auto
473	13	0	2021-09-08 01:13:00.024873	auto
474	1	-10	2021-09-08 01:13:00.028051	auto
475	21	-20	2021-09-08 01:13:00.030672	auto
477	12	0	2021-09-08 01:13:00.03347	auto
478	2	0	2021-09-08 01:14:00.004717	auto
479	6	0	2021-09-08 01:14:00.007285	auto
480	4	0	2021-09-08 01:14:00.00869	auto
481	3	0	2021-09-08 01:14:00.010137	auto
482	7	0	2021-09-08 01:14:00.011625	auto
483	5	0	2021-09-08 01:14:00.012822	auto
484	13	0	2021-09-08 01:14:00.014084	auto
485	19	-10	2021-09-08 01:14:00.016768	auto
486	43	-10	2021-09-08 01:14:00.018825	auto
488	1	-10	2021-09-08 01:14:00.022189	auto
489	21	-20	2021-09-08 01:14:00.024366	auto
490	12	0	2021-09-08 01:14:00.025835	auto
491	21	-20	2021-09-08 01:15:00.009608	auto
492	2	0	2021-09-08 01:15:00.01148	auto
493	6	0	2021-09-08 01:15:00.012901	auto
494	4	0	2021-09-08 01:15:00.014324	auto
495	3	0	2021-09-08 01:15:00.015566	auto
496	7	0	2021-09-08 01:15:00.016821	auto
497	5	0	2021-09-08 01:15:00.017989	auto
498	13	0	2021-09-08 01:15:00.019649	auto
500	19	-10	2021-09-08 01:15:00.023235	auto
501	43	-10	2021-09-08 01:15:00.025481	auto
502	1	-10	2021-09-08 01:15:00.027575	auto
503	12	0	2021-09-08 01:15:00.029026	auto
504	21	-20	2021-09-08 01:16:00.007248	auto
505	2	0	2021-09-08 01:16:00.009215	auto
506	19	-10	2021-09-08 01:16:00.011538	auto
507	43	-10	2021-09-08 01:16:00.01378	auto
508	6	0	2021-09-08 01:16:00.015141	auto
509	1	-10	2021-09-08 01:16:00.017465	auto
510	4	0	2021-09-08 01:16:00.018719	auto
511	3	0	2021-09-08 01:16:00.019928	auto
512	7	0	2021-09-08 01:16:00.021331	auto
513	5	0	2021-09-08 01:16:00.022536	auto
514	13	0	2021-09-08 01:16:00.02377	auto
516	12	0	2021-09-08 01:16:00.027503	auto
517	2	0	2021-09-08 01:17:00.006758	auto
518	6	0	2021-09-08 01:17:00.009908	auto
519	4	0	2021-09-08 01:17:00.011919	auto
520	3	0	2021-09-08 01:17:00.013969	auto
521	7	0	2021-09-08 01:17:00.015468	auto
522	21	-20	2021-09-08 01:17:00.017743	auto
523	19	-10	2021-09-08 01:17:00.019856	auto
524	43	-10	2021-09-08 01:17:00.021791	auto
525	1	-10	2021-09-08 01:17:00.023855	auto
526	5	0	2021-09-08 01:17:00.025131	auto
527	13	0	2021-09-08 01:17:00.026343	auto
529	12	0	2021-09-08 01:17:00.028938	auto
530	2	0	2021-09-08 01:18:00.007158	auto
531	6	0	2021-09-08 01:18:00.009855	auto
532	4	0	2021-09-08 01:18:00.011838	auto
533	3	0	2021-09-08 01:18:00.013341	auto
534	7	0	2021-09-08 01:18:00.014977	auto
535	21	-20	2021-09-08 01:18:00.017493	auto
536	19	-10	2021-09-08 01:18:00.019975	auto
537	43	-10	2021-09-08 01:18:00.022196	auto
538	1	-10	2021-09-08 01:18:00.024239	auto
539	5	0	2021-09-08 01:18:00.025553	auto
540	13	0	2021-09-08 01:18:00.026946	auto
542	12	0	2021-09-08 01:18:00.029825	auto
543	2	0	2021-09-08 01:19:00.005135	auto
544	6	0	2021-09-08 01:19:00.007233	auto
545	4	0	2021-09-08 01:19:00.008931	auto
546	3	0	2021-09-08 01:19:00.010437	auto
547	7	0	2021-09-08 01:19:00.011742	auto
548	5	0	2021-09-08 01:19:00.014219	auto
549	21	-20	2021-09-08 01:19:00.016859	auto
550	13	0	2021-09-08 01:19:00.018198	auto
551	19	-10	2021-09-08 01:19:00.02111	auto
552	43	-10	2021-09-08 01:19:00.023284	auto
553	1	-10	2021-09-08 01:19:00.025593	auto
555	12	0	2021-09-08 01:19:00.02839	auto
556	2	0	2021-09-08 01:20:00.015438	auto
557	6	0	2021-09-08 01:20:00.022728	auto
558	4	0	2021-09-08 01:20:00.02586	auto
559	3	0	2021-09-08 01:20:00.028612	auto
560	7	0	2021-09-08 01:20:00.031512	auto
561	5	0	2021-09-08 01:20:00.033972	auto
562	13	0	2021-09-08 01:20:00.036321	auto
563	21	-20	2021-09-08 01:20:00.04301	auto
565	19	-10	2021-09-08 01:20:00.049606	auto
566	43	-10	2021-09-08 01:20:00.053351	auto
567	1	-10	2021-09-08 01:20:00.056602	auto
568	12	0	2021-09-08 01:20:00.058809	auto
569	19	-10	2021-09-08 01:21:00.017087	auto
570	43	-10	2021-09-08 01:21:00.024051	auto
571	2	0	2021-09-08 01:21:00.026561	auto
572	1	-10	2021-09-08 01:21:00.03001	auto
573	6	0	2021-09-08 01:21:00.032215	auto
574	4	0	2021-09-08 01:21:00.037578	auto
575	3	0	2021-09-08 01:21:00.039505	auto
576	7	0	2021-09-08 01:21:00.041414	auto
577	5	0	2021-09-08 01:21:00.043275	auto
578	13	0	2021-09-08 01:21:00.045801	auto
580	21	-20	2021-09-08 01:21:00.051363	auto
581	12	0	2021-09-08 01:21:00.053356	auto
582	2	0	2021-09-08 01:22:00.009305	auto
583	19	-10	2021-09-08 01:22:00.015967	auto
584	6	0	2021-09-08 01:22:00.018306	auto
585	43	-10	2021-09-08 01:22:00.022156	auto
586	4	0	2021-09-08 01:22:00.024186	auto
587	3	0	2021-09-08 01:22:00.037436	auto
588	7	0	2021-09-08 01:22:00.042316	auto
589	1	-10	2021-09-08 01:22:00.047423	auto
590	21	-20	2021-09-08 01:22:00.051289	auto
591	5	0	2021-09-08 01:22:00.053974	auto
592	13	0	2021-09-08 01:22:00.056387	auto
594	12	0	2021-09-08 01:22:00.061359	auto
595	2	0	2021-09-08 01:23:00.00884	auto
596	6	0	2021-09-08 01:23:00.012162	auto
597	4	0	2021-09-08 01:23:00.014644	auto
598	3	0	2021-09-08 01:23:00.016972	auto
599	7	0	2021-09-08 01:23:00.018777	auto
600	19	-10	2021-09-08 01:23:00.022278	auto
601	43	-10	2021-09-08 01:23:00.02586	auto
602	1	-10	2021-09-08 01:23:00.030104	auto
603	21	-20	2021-09-08 01:23:00.033502	auto
604	5	0	2021-09-08 01:23:00.035262	auto
605	13	0	2021-09-08 01:23:00.03697	auto
607	12	0	2021-09-08 01:23:00.040957	auto
608	2	0	2021-09-08 01:24:00.011479	auto
609	6	0	2021-09-08 01:24:00.014443	auto
610	4	0	2021-09-08 01:24:00.016636	auto
611	3	0	2021-09-08 01:24:00.019077	auto
612	7	0	2021-09-08 01:24:00.021316	auto
613	19	-10	2021-09-08 01:24:00.024656	auto
614	43	-10	2021-09-08 01:24:00.027613	auto
615	5	0	2021-09-08 01:24:00.029733	auto
616	1	-10	2021-09-08 01:24:00.032775	auto
617	13	0	2021-09-08 01:24:00.034927	auto
618	21	-20	2021-09-08 01:24:00.03868	auto
620	12	0	2021-09-08 01:24:00.042741	auto
621	2	0	2021-09-08 01:25:00.007918	auto
622	6	0	2021-09-08 01:25:00.011759	auto
623	4	0	2021-09-08 01:25:00.013923	auto
624	3	0	2021-09-08 01:25:00.015915	auto
625	7	0	2021-09-08 01:25:00.018204	auto
626	5	0	2021-09-08 01:25:00.019951	auto
627	13	0	2021-09-08 01:25:00.02158	auto
628	19	-10	2021-09-08 01:25:00.024551	auto
629	43	-10	2021-09-08 01:25:00.027507	auto
630	1	-10	2021-09-08 01:25:00.030124	auto
632	21	-20	2021-09-08 01:25:00.03599	auto
633	12	0	2021-09-08 01:25:00.037786	auto
634	21	-20	2021-09-08 01:26:00.012588	auto
635	2	0	2021-09-08 01:26:00.01575	auto
636	6	0	2021-09-08 01:26:00.018669	auto
637	4	0	2021-09-08 01:26:00.020771	auto
638	3	0	2021-09-08 01:26:00.022495	auto
639	7	0	2021-09-08 01:26:00.024651	auto
640	5	0	2021-09-08 01:26:00.027176	auto
641	13	0	2021-09-08 01:26:00.02944	auto
643	19	-10	2021-09-08 01:26:00.03442	auto
644	43	-10	2021-09-08 01:26:00.037668	auto
645	1	-10	2021-09-08 01:26:00.04052	auto
646	12	0	2021-09-08 01:26:00.042187	auto
647	21	-20	2021-09-08 01:27:00.00965	auto
648	2	0	2021-09-08 01:27:00.012191	auto
649	19	-10	2021-09-08 01:27:00.015331	auto
650	43	-10	2021-09-08 01:27:00.017878	auto
651	6	0	2021-09-08 01:27:00.019812	auto
652	1	-10	2021-09-08 01:27:00.022396	auto
653	4	0	2021-09-08 01:27:00.024178	auto
654	3	0	2021-09-08 01:27:00.025901	auto
655	7	0	2021-09-08 01:27:00.027408	auto
656	5	0	2021-09-08 01:27:00.029071	auto
657	13	0	2021-09-08 01:27:00.030565	auto
659	12	0	2021-09-08 01:27:00.034599	auto
660	2	0	2021-09-08 01:28:00.00819	auto
661	6	0	2021-09-08 01:28:00.010995	auto
662	4	0	2021-09-08 01:28:00.012948	auto
663	3	0	2021-09-08 01:28:00.015243	auto
664	7	0	2021-09-08 01:28:00.016888	auto
665	21	-20	2021-09-08 01:28:00.020106	auto
666	19	-10	2021-09-08 01:28:00.022727	auto
667	43	-10	2021-09-08 01:28:00.025383	auto
668	1	-10	2021-09-08 01:28:00.027809	auto
669	5	0	2021-09-08 01:28:00.029459	auto
670	13	0	2021-09-08 01:28:00.030952	auto
672	12	0	2021-09-08 01:28:00.034508	auto
673	2	0	2021-09-08 01:29:00.006459	auto
674	6	0	2021-09-08 01:29:00.010033	auto
675	4	0	2021-09-08 01:29:00.012171	auto
676	3	0	2021-09-08 01:29:00.014426	auto
677	7	0	2021-09-08 01:29:00.015944	auto
678	21	-20	2021-09-08 01:29:00.019097	auto
679	19	-10	2021-09-08 01:29:00.022439	auto
680	43	-10	2021-09-08 01:29:00.02549	auto
681	1	-10	2021-09-08 01:29:00.027833	auto
682	5	0	2021-09-08 01:29:00.029433	auto
683	13	0	2021-09-08 01:29:00.030866	auto
685	12	0	2021-09-08 01:29:00.033955	auto
686	2	0	2021-09-08 01:30:00.009644	auto
687	6	0	2021-09-08 01:30:00.013376	auto
688	4	0	2021-09-08 01:30:00.016952	auto
689	3	0	2021-09-08 01:30:00.020015	auto
690	7	0	2021-09-08 01:30:00.02355	auto
691	5	0	2021-09-08 01:30:00.026658	auto
692	21	-20	2021-09-08 01:30:00.030715	auto
693	13	0	2021-09-08 01:30:00.032845	auto
694	19	-10	2021-09-08 01:30:00.035973	auto
695	43	-10	2021-09-08 01:30:00.038987	auto
696	1	-10	2021-09-08 01:30:00.041457	auto
698	12	0	2021-09-08 01:30:00.045691	auto
699	2	0	2021-09-08 01:31:00.007751	auto
700	6	0	2021-09-08 01:31:00.010306	auto
701	4	0	2021-09-08 01:31:00.012136	auto
702	3	0	2021-09-08 01:31:00.013815	auto
703	7	0	2021-09-08 01:31:00.015509	auto
704	5	0	2021-09-08 01:31:00.017054	auto
705	13	0	2021-09-08 01:31:00.018945	auto
706	21	-20	2021-09-08 01:31:00.021728	auto
708	19	-10	2021-09-08 01:31:00.027244	auto
709	43	-10	2021-09-08 01:31:00.030765	auto
710	1	-10	2021-09-08 01:31:00.034055	auto
711	12	0	2021-09-08 01:31:00.035627	auto
712	19	-10	2021-09-08 01:32:00.008813	auto
713	43	-10	2021-09-08 01:32:00.01351	auto
714	2	0	2021-09-08 01:32:00.015568	auto
715	1	-10	2021-09-08 01:32:00.018666	auto
716	6	0	2021-09-08 01:32:00.020355	auto
717	4	0	2021-09-08 01:32:00.022308	auto
718	3	0	2021-09-08 01:32:00.023863	auto
719	7	0	2021-09-08 01:32:00.025373	auto
720	5	0	2021-09-08 01:32:00.027891	auto
721	13	0	2021-09-08 01:32:00.029443	auto
723	21	-20	2021-09-08 01:32:00.0337	auto
724	12	0	2021-09-08 01:32:00.03516	auto
725	2	0	2021-09-08 01:33:00.006957	auto
726	19	-10	2021-09-08 01:33:00.011797	auto
727	6	0	2021-09-08 01:33:00.013757	auto
728	43	-10	2021-09-08 01:33:00.016719	auto
729	4	0	2021-09-08 01:33:00.01825	auto
730	3	0	2021-09-08 01:33:00.019891	auto
731	7	0	2021-09-08 01:33:00.021549	auto
732	1	-10	2021-09-08 01:33:00.02422	auto
733	21	-20	2021-09-08 01:33:00.027018	auto
734	5	0	2021-09-08 01:33:00.028757	auto
735	13	0	2021-09-08 01:33:00.030189	auto
737	12	0	2021-09-08 01:33:00.033434	auto
738	2	0	2021-09-08 01:34:00.009928	auto
739	6	0	2021-09-08 01:34:00.012773	auto
740	4	0	2021-09-08 01:34:00.014291	auto
741	3	0	2021-09-08 01:34:00.016003	auto
742	7	0	2021-09-08 01:34:00.017654	auto
743	19	-10	2021-09-08 01:34:00.020484	auto
744	43	-10	2021-09-08 01:34:00.02315	auto
745	1	-10	2021-09-08 01:34:00.02667	auto
746	21	-20	2021-09-08 01:34:00.030462	auto
747	5	0	2021-09-08 01:34:00.031939	auto
748	13	0	2021-09-08 01:34:00.033313	auto
750	12	0	2021-09-08 01:34:00.036444	auto
751	2	0	2021-09-08 01:35:00.008599	auto
752	6	0	2021-09-08 01:35:00.011727	auto
753	4	0	2021-09-08 01:35:00.013767	auto
754	3	0	2021-09-08 01:35:00.015956	auto
755	7	0	2021-09-08 01:35:00.018012	auto
756	19	-10	2021-09-08 01:35:00.020817	auto
757	43	-10	2021-09-08 01:35:00.02376	auto
758	5	0	2021-09-08 01:35:00.025399	auto
759	1	-10	2021-09-08 01:35:00.029796	auto
760	13	0	2021-09-08 01:35:00.031351	auto
761	21	-20	2021-09-08 01:35:00.033738	auto
763	12	0	2021-09-08 01:35:00.036725	auto
764	2	0	2021-09-08 01:36:00.007791	auto
765	6	0	2021-09-08 01:36:00.013474	auto
766	4	0	2021-09-08 01:36:00.015953	auto
767	3	0	2021-09-08 01:36:00.018286	auto
768	7	0	2021-09-08 01:36:00.02077	auto
769	5	0	2021-09-08 01:36:00.02227	auto
770	13	0	2021-09-08 01:36:00.023656	auto
771	19	-10	2021-09-08 01:36:00.026159	auto
772	43	-10	2021-09-08 01:36:00.028338	auto
773	1	-10	2021-09-08 01:36:00.030746	auto
775	21	-20	2021-09-08 01:36:00.034924	auto
776	12	0	2021-09-08 01:36:00.036359	auto
777	21	-20	2021-09-08 01:37:00.143264	auto
778	2	0	2021-09-08 01:37:00.145562	auto
779	6	0	2021-09-08 01:37:00.147322	auto
780	4	0	2021-09-08 01:37:00.149348	auto
781	3	0	2021-09-08 01:37:00.150811	auto
782	7	0	2021-09-08 01:37:00.152338	auto
783	5	0	2021-09-08 01:37:00.153922	auto
784	13	0	2021-09-08 01:37:00.155966	auto
786	19	-10	2021-09-08 01:37:00.160658	auto
787	43	-10	2021-09-08 01:37:00.162972	auto
788	1	-10	2021-09-08 01:37:00.165462	auto
789	12	0	2021-09-08 01:37:00.166806	auto
790	21	-20	2021-09-08 01:38:00.009081	auto
791	2	0	2021-09-08 01:38:00.011688	auto
792	19	-10	2021-09-08 01:38:00.014165	auto
793	43	-10	2021-09-08 01:38:00.018148	auto
794	6	0	2021-09-08 01:38:00.019924	auto
795	1	-10	2021-09-08 01:38:00.022356	auto
796	4	0	2021-09-08 01:38:00.024038	auto
797	3	0	2021-09-08 01:38:00.025445	auto
798	7	0	2021-09-08 01:38:00.026875	auto
799	5	0	2021-09-08 01:38:00.028259	auto
800	13	0	2021-09-08 01:38:00.030014	auto
802	12	0	2021-09-08 01:38:00.032866	auto
803	2	0	2021-09-08 01:39:00.004858	auto
804	6	0	2021-09-08 01:39:00.007261	auto
805	4	0	2021-09-08 01:39:00.009227	auto
806	3	0	2021-09-08 01:39:00.011765	auto
807	7	0	2021-09-08 01:39:00.013883	auto
808	21	-20	2021-09-08 01:39:00.017529	auto
809	19	-10	2021-09-08 01:39:00.032896	auto
810	43	-10	2021-09-08 01:39:00.03727	auto
811	1	-10	2021-09-08 01:39:00.040948	auto
812	5	0	2021-09-08 01:39:00.045241	auto
813	13	0	2021-09-08 01:39:00.047902	auto
815	12	0	2021-09-08 01:39:00.051441	auto
816	2	0	2021-09-08 01:40:00.007397	auto
817	6	0	2021-09-08 01:40:00.010195	auto
818	4	0	2021-09-08 01:40:00.013062	auto
819	3	0	2021-09-08 01:40:00.014699	auto
820	7	0	2021-09-08 01:40:00.016218	auto
821	21	-20	2021-09-08 01:40:00.019363	auto
822	19	-10	2021-09-08 01:40:00.021567	auto
823	43	-10	2021-09-08 01:40:00.023896	auto
824	1	-10	2021-09-08 01:40:00.026067	auto
825	5	0	2021-09-08 01:40:00.027618	auto
826	13	0	2021-09-08 01:40:00.028919	auto
828	12	0	2021-09-08 01:40:00.032781	auto
829	2	0	2021-09-08 01:41:00.006139	auto
830	6	0	2021-09-08 01:41:00.009098	auto
831	4	0	2021-09-08 01:41:00.010932	auto
832	3	0	2021-09-08 01:41:00.012445	auto
833	7	0	2021-09-08 01:41:00.014326	auto
834	5	0	2021-09-08 01:41:00.015806	auto
835	21	-20	2021-09-08 01:41:00.019442	auto
836	13	0	2021-09-08 01:41:00.020777	auto
837	19	-10	2021-09-08 01:41:00.02289	auto
838	43	-10	2021-09-08 01:41:00.025251	auto
839	1	-10	2021-09-08 01:41:00.027375	auto
841	12	0	2021-09-08 01:41:00.030776	auto
842	2	0	2021-09-08 01:42:00.006819	auto
843	6	0	2021-09-08 01:42:00.010232	auto
844	4	0	2021-09-08 01:42:00.012962	auto
845	3	0	2021-09-08 01:42:00.014984	auto
846	7	0	2021-09-08 01:42:00.016471	auto
847	5	0	2021-09-08 01:42:00.01786	auto
848	13	0	2021-09-08 01:42:00.019528	auto
849	21	-20	2021-09-08 01:42:00.021733	auto
851	19	-10	2021-09-08 01:42:00.025522	auto
852	43	-10	2021-09-08 01:42:00.027612	auto
853	1	-10	2021-09-08 01:42:00.030153	auto
854	12	0	2021-09-08 01:42:00.031695	auto
855	19	-10	2021-09-08 01:43:00.009383	auto
856	43	-10	2021-09-08 01:43:00.012727	auto
857	2	0	2021-09-08 01:43:00.014377	auto
858	1	-10	2021-09-08 01:43:00.01678	auto
859	6	0	2021-09-08 01:43:00.018072	auto
860	4	0	2021-09-08 01:43:00.019605	auto
861	3	0	2021-09-08 01:43:00.020998	auto
862	7	0	2021-09-08 01:43:00.022434	auto
863	5	0	2021-09-08 01:43:00.023898	auto
864	13	0	2021-09-08 01:43:00.02549	auto
866	21	-20	2021-09-08 01:43:00.02999	auto
867	12	0	2021-09-08 01:43:00.031327	auto
868	2	0	2021-09-08 01:44:00.006727	auto
869	19	-10	2021-09-08 01:44:00.01098	auto
870	6	0	2021-09-08 01:44:00.012786	auto
871	43	-10	2021-09-08 01:44:00.015287	auto
872	4	0	2021-09-08 01:44:00.016673	auto
873	3	0	2021-09-08 01:44:00.017976	auto
874	7	0	2021-09-08 01:44:00.019522	auto
875	1	-10	2021-09-08 01:44:00.022031	auto
876	21	-20	2021-09-08 01:44:00.024472	auto
877	5	0	2021-09-08 01:44:00.025757	auto
878	13	0	2021-09-08 01:44:00.02739	auto
880	12	0	2021-09-08 01:44:00.030296	auto
881	2	0	2021-09-08 01:45:00.007661	auto
882	6	0	2021-09-08 01:45:00.010656	auto
883	4	0	2021-09-08 01:45:00.012379	auto
884	3	0	2021-09-08 01:45:00.013779	auto
885	7	0	2021-09-08 01:45:00.015418	auto
886	19	-10	2021-09-08 01:45:00.018042	auto
887	43	-10	2021-09-08 01:45:00.021039	auto
888	1	-10	2021-09-08 01:45:00.023283	auto
889	21	-20	2021-09-08 01:45:00.025467	auto
890	5	0	2021-09-08 01:45:00.027261	auto
891	13	0	2021-09-08 01:45:00.028842	auto
893	12	0	2021-09-08 01:45:00.031414	auto
894	2	0	2021-09-08 01:46:00.00597	auto
895	6	0	2021-09-08 01:46:00.009549	auto
896	4	0	2021-09-08 01:46:00.012105	auto
897	3	0	2021-09-08 01:46:00.014433	auto
898	7	0	2021-09-08 01:46:00.017496	auto
899	19	-10	2021-09-08 01:46:00.019641	auto
900	43	-10	2021-09-08 01:46:00.021935	auto
901	5	0	2021-09-08 01:46:00.023234	auto
902	1	-10	2021-09-08 01:46:00.0255	auto
903	13	0	2021-09-08 01:46:00.026779	auto
904	21	-20	2021-09-08 01:46:00.029164	auto
906	12	0	2021-09-08 01:46:00.031936	auto
907	2	0	2021-09-08 01:47:00.005387	auto
908	6	0	2021-09-08 01:47:00.00758	auto
909	4	0	2021-09-08 01:47:00.00914	auto
910	3	0	2021-09-08 01:47:00.010892	auto
911	7	0	2021-09-08 01:47:00.012425	auto
912	5	0	2021-09-08 01:47:00.014144	auto
913	13	0	2021-09-08 01:47:00.015691	auto
914	19	-10	2021-09-08 01:47:00.018574	auto
915	43	-10	2021-09-08 01:47:00.021322	auto
916	1	-10	2021-09-08 01:47:00.023595	auto
918	21	-20	2021-09-08 01:47:00.027382	auto
919	12	0	2021-09-08 01:47:00.028638	auto
920	21	-20	2021-09-08 01:48:00.009672	auto
921	2	0	2021-09-08 01:48:00.011823	auto
922	6	0	2021-09-08 01:48:00.013466	auto
923	4	0	2021-09-08 01:48:00.014998	auto
924	3	0	2021-09-08 01:48:00.016565	auto
925	7	0	2021-09-08 01:48:00.017891	auto
926	5	0	2021-09-08 01:48:00.0191	auto
927	13	0	2021-09-08 01:48:00.020683	auto
929	19	-10	2021-09-08 01:48:00.024474	auto
930	43	-10	2021-09-08 01:48:00.02678	auto
931	1	-10	2021-09-08 01:48:00.028863	auto
932	12	0	2021-09-08 01:48:00.03035	auto
933	21	-20	2021-09-08 01:49:00.009441	auto
934	2	0	2021-09-08 01:49:00.011558	auto
935	19	-10	2021-09-08 01:49:00.015839	auto
936	43	-10	2021-09-08 01:49:00.018155	auto
937	6	0	2021-09-08 01:49:00.019737	auto
938	1	-10	2021-09-08 01:49:00.021922	auto
939	4	0	2021-09-08 01:49:00.023203	auto
940	3	0	2021-09-08 01:49:00.024804	auto
941	7	0	2021-09-08 01:49:00.026059	auto
942	5	0	2021-09-08 01:49:00.027357	auto
943	13	0	2021-09-08 01:49:00.029197	auto
945	12	0	2021-09-08 01:49:00.032162	auto
946	2	0	2021-09-08 01:50:00.008359	auto
947	6	0	2021-09-08 01:50:00.011331	auto
948	4	0	2021-09-08 01:50:00.012964	auto
949	3	0	2021-09-08 01:50:00.015191	auto
950	7	0	2021-09-08 01:50:00.01681	auto
951	21	-20	2021-09-08 01:50:00.020116	auto
952	19	-10	2021-09-08 01:50:00.025342	auto
953	43	-10	2021-09-08 01:50:00.029105	auto
954	1	-10	2021-09-08 01:50:00.032144	auto
955	5	0	2021-09-08 01:50:00.033831	auto
956	13	0	2021-09-08 01:50:00.035672	auto
958	12	0	2021-09-08 01:50:00.040955	auto
959	2	0	2021-09-08 01:51:00.006427	auto
960	6	0	2021-09-08 01:51:00.009375	auto
961	4	0	2021-09-08 01:51:00.011075	auto
962	3	0	2021-09-08 01:51:00.012578	auto
963	7	0	2021-09-08 01:51:00.01414	auto
964	21	-20	2021-09-08 01:51:00.016283	auto
965	19	-10	2021-09-08 01:51:00.018501	auto
966	43	-10	2021-09-08 01:51:00.020482	auto
967	1	-10	2021-09-08 01:51:00.022786	auto
968	5	0	2021-09-08 01:51:00.024081	auto
969	13	0	2021-09-08 01:51:00.025415	auto
971	12	0	2021-09-08 01:51:00.029671	auto
972	2	0	2021-09-08 01:52:00.007987	auto
973	6	0	2021-09-08 01:52:00.011746	auto
974	4	0	2021-09-08 01:52:00.014105	auto
975	3	0	2021-09-08 01:52:00.018766	auto
976	7	0	2021-09-08 01:52:00.02279	auto
977	5	0	2021-09-08 01:52:00.026746	auto
978	21	-20	2021-09-08 01:52:00.031907	auto
979	13	0	2021-09-08 01:52:00.034509	auto
980	19	-10	2021-09-08 01:52:00.04017	auto
981	43	-10	2021-09-08 01:52:00.044248	auto
982	1	-10	2021-09-08 01:52:00.047512	auto
984	12	0	2021-09-08 01:52:00.051972	auto
985	2	0	2021-09-08 01:53:00.00771	auto
986	6	0	2021-09-08 01:53:00.010855	auto
987	4	0	2021-09-08 01:53:00.012772	auto
988	3	0	2021-09-08 01:53:00.014282	auto
989	7	0	2021-09-08 01:53:00.015844	auto
990	5	0	2021-09-08 01:53:00.017327	auto
991	13	0	2021-09-08 01:53:00.018697	auto
992	21	-20	2021-09-08 01:53:00.020882	auto
994	19	-10	2021-09-08 01:53:00.024724	auto
995	43	-10	2021-09-08 01:53:00.026855	auto
996	1	-10	2021-09-08 01:53:00.03022	auto
997	12	0	2021-09-08 01:53:00.031524	auto
998	19	-10	2021-09-08 01:54:00.008865	auto
999	43	-10	2021-09-08 01:54:00.012552	auto
1000	2	0	2021-09-08 01:54:00.014617	auto
1001	1	-10	2021-09-08 01:54:00.017134	auto
1002	6	0	2021-09-08 01:54:00.018445	auto
1003	4	0	2021-09-08 01:54:00.019703	auto
1004	3	0	2021-09-08 01:54:00.022275	auto
1005	7	0	2021-09-08 01:54:00.023555	auto
1006	5	0	2021-09-08 01:54:00.024959	auto
1007	13	0	2021-09-08 01:54:00.027228	auto
1009	21	-20	2021-09-08 01:54:00.031069	auto
1010	12	0	2021-09-08 01:54:00.032624	auto
1011	2	0	2021-09-08 01:55:00.006173	auto
1012	19	-10	2021-09-08 01:55:00.010347	auto
1013	6	0	2021-09-08 01:55:00.012228	auto
1014	43	-10	2021-09-08 01:55:00.015278	auto
1015	4	0	2021-09-08 01:55:00.016656	auto
1016	3	0	2021-09-08 01:55:00.018294	auto
1017	7	0	2021-09-08 01:55:00.019655	auto
1018	1	-10	2021-09-08 01:55:00.021779	auto
1019	21	-20	2021-09-08 01:55:00.024666	auto
1020	5	0	2021-09-08 01:55:00.026002	auto
1021	13	0	2021-09-08 01:55:00.02739	auto
1023	12	0	2021-09-08 01:55:00.03042	auto
1024	2	0	2021-09-08 01:56:00.007803	auto
1025	6	0	2021-09-08 01:56:00.010889	auto
1026	4	0	2021-09-08 01:56:00.014415	auto
1027	3	0	2021-09-08 01:56:00.015852	auto
1028	7	0	2021-09-08 01:56:00.017111	auto
1029	19	-10	2021-09-08 01:56:00.019485	auto
1030	43	-10	2021-09-08 01:56:00.021481	auto
1031	1	-10	2021-09-08 01:56:00.023648	auto
1032	21	-20	2021-09-08 01:56:00.02575	auto
1033	5	0	2021-09-08 01:56:00.027117	auto
1034	13	0	2021-09-08 01:56:00.028552	auto
1036	12	0	2021-09-08 01:56:00.031018	auto
1037	2	0	2021-09-08 01:57:00.006681	auto
1038	6	0	2021-09-08 01:57:00.009603	auto
1039	4	0	2021-09-08 01:57:00.01201	auto
1040	3	0	2021-09-08 01:57:00.013944	auto
1041	7	0	2021-09-08 01:57:00.015357	auto
1042	19	-10	2021-09-08 01:57:00.018029	auto
1043	43	-10	2021-09-08 01:57:00.020732	auto
1044	5	0	2021-09-08 01:57:00.021982	auto
1045	1	-10	2021-09-08 01:57:00.024409	auto
1046	13	0	2021-09-08 01:57:00.025908	auto
1047	21	-20	2021-09-08 01:57:00.028193	auto
1049	12	0	2021-09-08 01:57:00.031089	auto
1050	2	0	2021-09-08 01:58:00.006883	auto
1051	6	0	2021-09-08 01:58:00.009749	auto
1052	4	0	2021-09-08 01:58:00.011574	auto
1053	3	0	2021-09-08 01:58:00.012873	auto
1054	7	0	2021-09-08 01:58:00.014481	auto
1055	5	0	2021-09-08 01:58:00.015742	auto
1056	13	0	2021-09-08 01:58:00.017061	auto
1057	19	-10	2021-09-08 01:58:00.019309	auto
1058	43	-10	2021-09-08 01:58:00.02165	auto
1059	1	-10	2021-09-08 01:58:00.024014	auto
1061	21	-20	2021-09-08 01:58:00.027594	auto
1062	12	0	2021-09-08 01:58:00.029059	auto
1063	21	-20	2021-09-08 01:59:00.013112	auto
1064	2	0	2021-09-08 01:59:00.015859	auto
1065	6	0	2021-09-08 01:59:00.017814	auto
1066	4	0	2021-09-08 01:59:00.019492	auto
1067	3	0	2021-09-08 01:59:00.021203	auto
1068	7	0	2021-09-08 01:59:00.022665	auto
1069	5	0	2021-09-08 01:59:00.024104	auto
1070	13	0	2021-09-08 01:59:00.025625	auto
1072	19	-10	2021-09-08 01:59:00.029323	auto
1073	43	-10	2021-09-08 01:59:00.031789	auto
1074	1	-10	2021-09-08 01:59:00.034281	auto
1075	12	0	2021-09-08 01:59:00.035715	auto
1076	21	-20	2021-09-08 02:00:00.007757	auto
1077	2	0	2021-09-08 02:00:00.00955	auto
1078	19	-10	2021-09-08 02:00:00.012116	auto
1079	43	-10	2021-09-08 02:00:00.014189	auto
1080	6	0	2021-09-08 02:00:00.0157	auto
1081	1	-10	2021-09-08 02:00:00.017814	auto
1082	4	0	2021-09-08 02:00:00.019074	auto
1083	3	0	2021-09-08 02:00:00.020564	auto
1084	7	0	2021-09-08 02:00:00.024325	auto
1085	5	0	2021-09-08 02:00:00.025625	auto
1086	13	0	2021-09-08 02:00:00.027307	auto
1088	12	0	2021-09-08 02:00:00.030117	auto
1089	21	100	2021-09-08 02:03:33.928538	admin
1090	2	0	2021-09-08 02:09:00.015213	auto
1091	6	0	2021-09-08 02:09:00.022707	auto
1092	4	0	2021-09-08 02:09:00.02639	auto
1093	3	0	2021-09-08 02:09:00.02955	auto
1094	7	0	2021-09-08 02:09:00.032808	auto
1095	19	-10	2021-09-08 02:09:00.039146	auto
1096	43	-10	2021-09-08 02:09:00.043539	auto
1097	1	-10	2021-09-08 02:09:00.046967	auto
1098	21	-20	2021-09-08 02:09:00.051898	auto
1099	5	0	2021-09-08 02:09:00.053877	auto
1100	13	0	2021-09-08 02:09:00.056548	auto
1102	12	0	2021-09-08 02:09:00.060527	auto
1103	2	0	2021-09-08 02:10:00.017853	auto
1104	6	0	2021-09-08 02:10:00.025535	auto
1105	4	0	2021-09-08 02:10:00.029386	auto
1106	3	0	2021-09-08 02:10:00.032296	auto
1107	7	0	2021-09-08 02:10:00.035599	auto
1108	19	-10	2021-09-08 02:10:00.042281	auto
1109	43	-10	2021-09-08 02:10:00.047111	auto
1110	1	-10	2021-09-08 02:10:00.050775	auto
1111	5	0	2021-09-08 02:10:00.053951	auto
1112	21	-20	2021-09-08 02:10:00.057478	auto
1113	13	0	2021-09-08 02:10:00.060354	auto
1115	12	0	2021-09-08 02:10:00.064125	auto
1118	19	-10	2021-09-14 01:00:00.022898	auto
1119	1	-10	2021-09-14 01:00:00.032463	auto
1120	21	-30	2021-09-14 01:00:00.037544	auto
1121	43	-10	2021-09-14 01:00:00.041848	auto
1122	19	1000	2021-09-14 13:58:04.619364	admin
1123	19	-10	2021-09-15 01:00:00.145898	auto
1124	1	-10	2021-09-15 01:00:00.151486	auto
1125	21	-30	2021-09-15 01:00:00.154263	auto
1126	43	-10	2021-09-15 01:00:00.156584	auto
1127	19	-10	2021-09-21 01:00:00.008723	auto
1128	1	-10	2021-09-21 01:00:00.014011	auto
1129	21	-30	2021-09-21 01:00:00.017932	auto
1130	43	-10	2021-09-21 01:00:00.020359	auto
1132	19	-10	2021-09-22 01:00:00.014211	auto
1133	1	-10	2021-09-22 01:00:00.020768	auto
1134	21	-20	2021-09-22 01:00:00.024501	auto
1135	43	-10	2021-09-22 01:00:00.027332	auto
1136	21	10000	2021-09-22 21:31:00.496154	admin
1137	18	-10	2021-09-23 01:00:00.018965	auto
1138	19	-10	2021-09-23 01:00:00.025527	auto
1139	1	-10	2021-09-23 01:00:00.029523	auto
1140	10	-10	2021-09-23 01:00:00.032891	auto
1141	45	-10	2021-09-23 01:00:00.036353	auto
1142	9	-10	2021-09-23 01:00:00.039413	auto
1143	46	-10	2021-09-23 01:00:00.043371	auto
1144	15	-10	2021-09-23 01:00:00.046771	auto
1145	21	-20	2021-09-23 01:00:00.049953	auto
1146	43	-10	2021-09-23 01:00:00.055712	auto
1147	22	-10	2021-09-23 01:00:00.060855	auto
1148	38	-10	2021-09-23 01:00:00.066082	auto
1149	21	-20	2021-09-24 01:00:00.026534	auto
\.


--
-- Data for Name: vne_word_translations; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_word_translations (id, word_id, lang_id, text) FROM stdin;
5	2	1	Активные
6	2	2	Active
7	3	1	Неактивные
8	3	2	Inactive
9	4	1	Сменить пароль
10	4	2	Change password
555	186	1	Залы и столы
556	186	2	Halls and tables
557	187	1	Кухня
558	187	2	Kitchen
17	8	1	Активные рестораны
18	8	2	Active restaurants
21	10	1	Неактивные рестораны
22	10	2	Inactive restaurants
559	188	1	Категории
560	188	2	Categories
25	12	1	История заказов
26	12	2	Orders history
567	192	1	Иконка
568	192	2	Icon
569	193	1	Название
570	193	2	Name
571	194	1	Позиция в списке
572	194	2	Position
35	17	1	Название
36	17	2	Name
573	195	1	Активность
574	195	2	Active
33	16	1	Дата создания
34	16	2	Created at
45	22	1	E-mail
46	22	2	E-mail
47	23	1	Пароль
48	23	2	Password
49	24	1	Войти
50	24	2	Sign in
59	29	1	Смена пароля
60	29	2	Change password
577	197	1	показать список
578	197	2	show list
579	198	1	скрыть список
580	198	2	hide list
65	32	1	Войти через Google
66	32	2	Sign in with Google
67	33	1	Войти через Apple
68	33	2	Sign in with Apple
41	20	1	Авторизация
42	20	2	Authorization
583	200	1	Блюда
584	200	2	Dishes
71	35	1	Новый пароль
72	35	2	New password
73	36	1	Новый пароль еще раз
74	36	2	Repeat new password
75	37	1	Ваш логин
76	37	2	Your login
77	38	1	Пароли не совпадают
78	38	2	Passwords don't match
585	201	1	Блюда - Добавление
168	67	1	Не задано
169	67	2	Not set
586	201	2	Dishes - Add
587	202	1	Блюда - Редактирование
132	49	1	Пн
133	49	2	Mo
134	50	1	Вт
135	50	2	Tu
136	51	1	Ср
137	51	2	We
138	52	1	Чт
139	52	2	Th
140	53	1	Пт
141	53	2	Fr
142	54	1	Сб
143	54	2	Sa
144	55	1	Вс
145	55	2	Su
146	56	1	Применить
147	56	2	Apply
148	57	1	дата не задана
149	57	2	date is not set
150	58	1	Произошла ошибка. Попробуйте позднее.
151	58	2	An error has occurred. Please try again later.
152	59	1	Доступ запрещен
153	59	2	Access denied
154	60	1	Страница
155	60	2	Page
156	61	1	Выход
157	61	2	Sign out
158	62	1	Сохранить
159	62	2	Save
160	63	1	загрузка...
161	63	2	loading...
162	64	1	Главная
163	64	2	Home
588	202	2	Dishes - Edit
591	204	1	Код
592	204	2	SKU
593	205	1	Название
594	205	2	Name
170	68	1	Регистрация ресторана
171	68	2	Restaurant registration
174	70	1	ФИО
175	70	2	Contact person name
176	71	1	Телефон
177	71	2	Phone
178	72	1	Адрес
179	72	2	Address
180	73	1	ИНН
181	73	2	ITN/TIN
182	74	1	ОГРН
183	74	2	PSRN
184	75	1	Валюта
185	75	2	Currency
186	76	1	Комментарий
187	76	2	Comment
188	77	1	E-mail администратора
189	77	2	Administrator e-mail
190	78	1	Пароль администратора
191	78	2	Administrator password
192	79	1	Домен занят
193	79	2	Domain is already in use
194	80	1	E-mail занят
195	80	2	E-mail is already in use
196	81	1	Язык
197	81	2	Language
198	82	1	Параметры ресторана
199	82	2	Restaurant data
200	83	1	Назад
201	83	2	Back
202	84	1	Добавить
203	84	2	Add
204	85	1	Закрыть
205	85	2	Close
173	69	2	Website
172	69	1	Сайт
206	86	1	Пароль сохранен
207	86	2	Password saved
208	87	1	Да
209	87	2	Yes
210	88	1	Нет
211	88	2	No
212	89	1	Удалить
213	89	2	Delete
214	90	1	Отмена
215	90	2	Cancel
216	91	1	День
217	91	2	Day
218	92	1	Месяц
219	92	2	Month
220	93	1	Год
221	93	2	Year
561	189	1	Категории
226	96	1	Авторизация
227	96	2	Authorization
228	97	1	E-mail
229	97	2	E-mail
230	98	1	Пароль
231	98	2	Password
232	99	1	Войти
233	99	2	Sign in
234	100	1	Войти через Google
235	100	2	Sign in with Google
236	101	1	Войти через Apple
237	101	2	Sign in with Apple
238	102	1	период
239	102	2	period
240	103	1	Деньги на счету
241	103	2	Money in the account
244	105	1	Транзакции
245	105	2	Transactions
246	106	1	Пополнить счет
247	106	2	Recharge the account
248	107	1	Ресторан
249	107	2	Restaurant
250	108	1	Сумма
251	108	2	Amount
254	110	1	Ресторан
255	110	2	Restaurant
256	111	1	Дата создания
257	111	2	Created at
258	112	1	Тип
259	112	2	Type
260	113	1	Сумма
261	113	2	Amount
263	114	2	none
262	114	1	нет данных
264	115	1	автоматическая
265	115	2	auto
266	116	1	сотрудник ресторана
267	116	2	restaurant employee
268	117	1	администратор системы
269	117	2	system administrator
270	118	1	Итоговая сумма
271	118	2	Total
272	119	1	Фильтр
273	119	2	Filter
274	120	1	Сортировка
275	120	2	Sorting
276	121	1	Транзакции
277	121	2	Transactions
278	122	1	Сводка
279	122	2	Summary
280	123	1	все
281	123	2	any
284	125	1	Осталось дней
285	125	2	Days left
282	124	1	Сотрудники
283	124	2	Employees
286	126	1	Главная
287	126	2	Home
290	128	1	Мои столы
292	129	1	Заказы
294	130	1	Карта столов
296	131	1	Блюда
298	132	1	Статистика
288	127	1	Персонал
289	127	2	Personnel
291	128	2	My tables
293	129	2	Orders
295	130	2	Table map
297	131	2	Dishes
299	132	2	Statistics
300	133	1	Главная
301	133	2	Home
302	134	1	Пополнить
303	134	2	Recharge
306	136	1	Вы работаете как
307	136	2	You are signed in as
308	137	1	Ресторан
309	137	2	Restaurant
310	138	1	Состояние счета
311	138	2	Account state
314	140	1	RUR
315	140	2	RUR
318	142	1	Ваш статус
319	142	2	Status
320	143	1	не установлен
321	143	2	none
312	139	1	Осталось дней
313	139	2	Days left
316	141	1	Следующее списание
317	141	2	Next charge
322	144	1	Кол-во сотрудников
323	144	2	Employees qty
325	145	2	Personnel
326	146	1	Язык
327	146	2	Language
328	147	1	Действия
329	147	2	Actions
330	148	1	Просмотр и редактирование
331	148	2	View and edit
332	149	1	Дата создания
333	149	2	Created at
334	150	1	ФИО
335	150	2	Full name
336	151	1	Администратор
337	151	2	Administrator
338	152	1	Статус
339	152	2	Status
340	153	1	Пароль
324	145	1	Персонал
341	153	2	Password
342	154	1	Ваш пароль
343	154	2	Your password
345	155	2	Personnel - Add
346	156	1	E-mail
347	156	2	E-mail
348	157	1	Пароль
349	157	2	Password
350	158	1	E-mail занят
351	158	2	E-mail is already in use
352	159	1	Телефон
353	159	2	Phone
354	160	1	При добавлении сотрудника с вашего счета будет списано
355	160	2	When you add an employee, your account will be charged by
356	161	1	Персонал - Редактирование
357	161	2	Personnel - Edit
344	155	1	Персонал - Добавление
358	162	1	введите, если хотите изменить
359	162	2	enter to update
360	163	1	Сменить пароль
361	163	2	Change password
362	164	1	Смена пароля
363	164	2	Change password
364	165	1	Новый пароль
365	165	2	New password
366	166	1	Новый пароль еще раз
367	166	2	Repeat new password
368	167	1	Ваш логин
369	167	2	Your login
370	168	1	Пароли не совпадают
371	168	2	Passwords don't match
372	169	1	Пароль сохранен
373	169	2	Password saved
374	170	1	Карта столов
375	170	2	Table map
376	171	1	Залы
377	171	2	Halls
378	172	1	Залы
379	172	2	Halls
380	173	1	Название
381	173	2	Name
382	174	1	Места по горизонтали
383	174	2	Places horizontally
384	175	1	Места по вертикали
385	175	2	Places vertically
386	176	1	Позиция в списке
387	176	2	Position
388	177	1	Залы - Добавление
389	177	2	Halls - Add
390	178	1	Залы - Редактирование
391	178	2	Halls - Edit
392	179	1	Места
393	179	2	Places
394	180	1	Залы
395	180	2	Halls
396	181	1	чел.
397	181	2	pers.
398	182	1	Номер
399	182	2	No.
400	183	1	Кол-во мест
401	183	2	Seats qty
402	184	1	стол
403	184	2	table
404	185	1	Версия для печати
405	185	2	Print version
562	189	2	Categories
563	190	1	Категории - Добавление
564	190	2	Categories - Add
565	191	1	Категории - Редактирование
566	191	2	Categories - Edit
575	196	1	не задано
576	196	2	none
581	199	1	поиск по названию
582	199	2	search by name
589	203	1	Категории
590	203	2	Categories
595	206	1	Цена
596	206	2	Price
597	207	1	Вес, г
598	207	2	Weight, g
599	208	1	Калорийность, ккал
600	208	2	Calorific capacity, kcal
601	209	1	Время приготовления
602	209	2	Cooking time
603	210	1	Детали
604	210	2	Details
605	211	1	Позиция в списке
606	211	2	Position
607	212	1	Активность
608	212	2	Active
609	213	1	Рекомендуемое
610	213	2	Recommended
611	214	1	г
612	214	2	g
613	215	1	ккал
614	215	2	kcal
617	217	1	название или код
618	217	2	name or SKU
615	216	1	Фильтр
616	216	2	Filter
619	218	1	Изображения
620	218	2	Images
621	219	1	Ингредиенты
622	219	2	Ingredients
\.


--
-- Data for Name: vne_wordbooks; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_wordbooks (id, name, pos) FROM stdin;
5	common	1
2	owner-common	2
3	owner-login	3
1	owner-restaurants	4
4	owner-password	6
7	restorator-common	7
6	restorator-login	8
8	owner-transactions	5
9	restorator-home	10
10	restorator-employees	11
11	restorator-password	9
12	restorator-tables	13
13	restorator-halls	12
14	restorator-cats	14
15	restorator-products	15
\.


--
-- Data for Name: vne_words; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_words (id, wordbook_id, pos, mark, note) FROM stdin;
2	2	1	menu-active	\N
3	2	2	menu-inactive	\N
4	2	3	menu-pw	\N
12	1	102	history	\N
20	3	1	title	\N
8	1	1	title-active	\N
10	1	2	title-inactive	\N
22	3	2	email	\N
23	3	3	password	\N
24	3	4	login	\N
32	3	5	with-google	\N
33	3	6	with-apple	\N
29	4	1	title	\N
35	4	2	password1	\N
36	4	3	password2	\N
37	4	4	login	\N
38	4	5	error-mismatch	\N
49	5	1	mo	\N
50	5	2	tu	\N
51	5	3	we	\N
52	5	4	th	\N
53	5	5	fr	\N
54	5	6	sa	\N
55	5	7	su	\N
56	5	100	apply	\N
58	5	200	error	\N
59	5	201	error-401	\N
60	5	102	page	\N
61	5	103	logout	\N
62	5	104	save	\N
63	5	105	loading	\N
64	5	106	home	\N
57	5	101	no-date	\N
67	5	107	not-set	\N
68	1	3	title-create	\N
82	1	4	title-edit	\N
83	5	108	back	\N
84	5	109	create	\N
85	5	110	close	
86	4	6	saved	\N
87	5	111	yes	\N
88	5	112	no	\N
89	5	113	delete	\N
90	5	114	cancel	\N
91	5	115	day	\N
92	5	116	month	\N
93	5	117	year	\N
113	8	4	amount	\N
115	8	5	type-auto	\N
116	8	6	type-employee	\N
117	8	7	type-admin	\N
118	8	8	sum	
96	6	1	title	\N
97	6	2	email	\N
98	6	3	password	\N
99	6	4	login	\N
100	6	5	with-google	\N
101	6	6	with-apple	\N
102	5	118	period	\N
122	8	9	summary	\N
123	5	122	any	\N
124	1	129	employees-q	\N
79	1	107	error-domain-duplication	\N
80	1	108	error-email-duplication	\N
16	1	109	created-at	\N
17	1	110	name	\N
69	1	111	domain	\N
70	1	112	ownername	\N
71	1	113	phone	\N
72	1	114	address	\N
73	1	115	inn	\N
74	1	116	ogrn	\N
75	1	117	currency	\N
76	1	118	comment	\N
77	1	119	admin-email	\N
78	1	120	admin-password	\N
81	1	121	lang	\N
125	1	130	daysleft	\N
103	1	124	money	\N
105	1	125	transactions	\N
106	1	101	recharge	\N
107	1	126	restaurant	\N
108	1	127	amount	\N
114	5	119	none	\N
119	5	120	filter	\N
120	5	121	sorting	\N
133	9	0	title	\N
121	8	0	title	\N
110	8	1	restaurant	\N
111	8	2	created-at	\N
112	8	3	type	\N
126	7	1	menu-home	\N
128	7	2	menu-my-tables	\N
129	7	3	menu-orders	\N
130	7	4	menu-tables	\N
131	7	5	menu-products	\N
132	7	6	menu-stat	\N
127	7	7	menu-employees	\N
170	12	1	title	\N
136	9	0	signed-as	\N
137	9	0	restaurant	\N
138	9	0	acc-state	\N
140	5	123	rur	\N
141	9	0	acc-nextcharge	\N
134	7	100	recharge	\N
142	9	0	status	\N
143	9	0	status-none	\N
139	9	0	acc-daysleft	
144	9	0	employees-q	\N
145	10	1	title-index	\N
146	5	124	lang	\N
147	5	125	actions	\N
148	5	126	edit	\N
171	7	9	menu-halls	\N
172	13	1	title-index	\N
149	10	100	created-at	\N
150	10	101	name	\N
151	10	102	admin	\N
152	10	103	status	\N
153	5	127	password	\N
154	5	128	your-password	\N
173	13	100	name	\N
155	10	2	title-create	\N
156	10	104	email	\N
157	10	105	password	\N
158	10	106	error-email-duplication	\N
159	10	107	phone	\N
160	10	108	note	\N
161	10	3	title-edit	\N
162	5	129	password-change	\N
163	7	8	menu-pw	\N
164	11	0	title	\N
165	11	0	password1	\N
166	11	0	password2	\N
167	11	0	login	\N
168	11	0	error-mismatch	\N
169	11	0	saved	\N
174	13	101	nx	\N
175	13	102	ny	\N
176	13	103	pos	\N
177	13	2	title-create	\N
178	13	3	title-edit	\N
179	13	104	places	\N
180	12	2	halls	\N
181	5	130	pers	\N
182	12	3	no	\N
183	12	4	seats	\N
184	12	5	table	\N
185	12	6	print-version	\N
186	7	10	menu-halls-tables	\N
187	7	11	menu-kitchen	\N
188	7	12	menu-cats	\N
189	14	1	title-index	\N
190	14	2	title-create	\N
191	14	3	title-edit	\N
192	14	100	icon	\N
196	5	131	not-set	\N
197	5	132	show-list	\N
198	5	133	hide-list	\N
199	14	101	icon-filter	\N
193	14	102	name	\N
194	14	103	pos	\N
195	14	104	active	\N
200	15	1	title-index	\N
201	15	2	title-create	\N
202	15	3	title-edit	\N
203	15	100	cats	\N
204	15	101	code	\N
205	15	102	name	\N
206	15	103	price	\N
207	15	104	weight	\N
208	15	105	cal	\N
209	15	106	time	\N
210	15	107	about	\N
211	15	108	pos	\N
212	15	109	active	\N
213	15	110	recommended	\N
214	15	111	g	\N
215	15	112	kcal	\N
217	15	114	name-code	\N
216	15	113	filter	\N
218	15	115	images	\N
219	15	116	ingredients	\N
\.


--
-- Name: vne_admingroups_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_admingroups_id_seq', 1, true);


--
-- Name: vne_admins_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_admins_id_seq', 6, true);


--
-- Name: vne_cats_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_cats_id_seq', 12, true);


--
-- Name: vne_currencies_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_currencies_id_seq', 4, true);


--
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employee_status_translations_id_seq', 10, true);


--
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employee_statuses_id_seq', 3, true);


--
-- Name: vne_employees_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employees_id_seq', 46, true);


--
-- Name: vne_halls_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_halls_id_seq', 11, true);


--
-- Name: vne_icon_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_icon_translations_id_seq', 33, true);


--
-- Name: vne_icons_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_icons_id_seq', 16, true);


--
-- Name: vne_ingredients_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_ingredients_id_seq', 12, true);


--
-- Name: vne_langs_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_langs_id_seq', 6, true);


--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplate_translations_id_seq', 20, true);


--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplates_id_seq', 8, true);


--
-- Name: vne_product_images_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_product_images_id_seq', 358, true);


--
-- Name: vne_products_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_products_id_seq', 187, true);


--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_restaurants_id_seq', 48, true);


--
-- Name: vne_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_settings_id_seq', 13, true);


--
-- Name: vne_tables_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_tables_id_seq', 51, true);


--
-- Name: vne_transactions_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_transactions_id_seq', 1149, true);


--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_word_translations_id_seq', 622, true);


--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_wordbooks_id_seq', 15, true);


--
-- Name: vne_words_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_words_id_seq', 219, true);


--
-- Name: vne_settings PK_00e1517e9faaaba0f525bcb590e; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_settings
    ADD CONSTRAINT "PK_00e1517e9faaaba0f525bcb590e" PRIMARY KEY (id);


--
-- Name: vne_words PK_072d0974d51316d8537ba4708bb; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_words
    ADD CONSTRAINT "PK_072d0974d51316d8537ba4708bb" PRIMARY KEY (id);


--
-- Name: vne_restaurants PK_0875461f4afdd97af48b6444eff; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "PK_0875461f4afdd97af48b6444eff" PRIMARY KEY (id);


--
-- Name: vne_halls PK_0989b8637f146421fd51f440a9e; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_halls
    ADD CONSTRAINT "PK_0989b8637f146421fd51f440a9e" PRIMARY KEY (id);


--
-- Name: vne_mailtemplates PK_0ad69d17564005feccf82893808; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "PK_0ad69d17564005feccf82893808" PRIMARY KEY (id);


--
-- Name: vne_cats PK_0bdee08b5c108a0ac6a85774467; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "PK_0bdee08b5c108a0ac6a85774467" PRIMARY KEY (id);


--
-- Name: vne_admins PK_0e169cb063501c963352dfbaaac; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "PK_0e169cb063501c963352dfbaaac" PRIMARY KEY (id);


--
-- Name: vne_product_images PK_2cff70e96751e07d208cf318897; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_product_images
    ADD CONSTRAINT "PK_2cff70e96751e07d208cf318897" PRIMARY KEY (id);


--
-- Name: vne_products PK_350040868e6f6a4bbcb33727d49; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "PK_350040868e6f6a4bbcb33727d49" PRIMARY KEY (id);


--
-- Name: vne_employee_status_translations PK_3537ef87ea04c2bb295c1c0e948; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "PK_3537ef87ea04c2bb295c1c0e948" PRIMARY KEY (id);


--
-- Name: vne_employee_statuses PK_3b845110cc6cfb8b64b275a9f4f; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_statuses
    ADD CONSTRAINT "PK_3b845110cc6cfb8b64b275a9f4f" PRIMARY KEY (id);


--
-- Name: vne_word_translations PK_521f92df69a7ad9c67b18da8f68; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "PK_521f92df69a7ad9c67b18da8f68" PRIMARY KEY (id);


--
-- Name: vne_ingredients PK_70157e9e833b07dc104edf6fe5c; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "PK_70157e9e833b07dc104edf6fe5c" PRIMARY KEY (id);


--
-- Name: vne_currencies PK_84d6314cfa9aff009fbb4f55c22; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_currencies
    ADD CONSTRAINT "PK_84d6314cfa9aff009fbb4f55c22" PRIMARY KEY (id);


--
-- Name: vne_icons PK_87f5339d51f9d2577f7ef3b922d; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icons
    ADD CONSTRAINT "PK_87f5339d51f9d2577f7ef3b922d" PRIMARY KEY (id);


--
-- Name: vne_admingroups PK_885fdcbc51834c0641662d5d550; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admingroups
    ADD CONSTRAINT "PK_885fdcbc51834c0641662d5d550" PRIMARY KEY (id);


--
-- Name: vne_icon_translations PK_8b8160671a2807bd49fc66fcd27; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "PK_8b8160671a2807bd49fc66fcd27" PRIMARY KEY (id);


--
-- Name: vne_mailtemplate_translations PK_9c2864edd8cf9260136c23914bc; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "PK_9c2864edd8cf9260136c23914bc" PRIMARY KEY (id);


--
-- Name: vne_tables PK_bb89d6ca78aa6b3905e302fde95; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "PK_bb89d6ca78aa6b3905e302fde95" PRIMARY KEY (id);


--
-- Name: vne_employees PK_be6da89c037f846b6b791a35f8b; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "PK_be6da89c037f846b6b791a35f8b" PRIMARY KEY (id);


--
-- Name: vne_transactions PK_c4c1c2e63f854ccf92d4e7209d7; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_transactions
    ADD CONSTRAINT "PK_c4c1c2e63f854ccf92d4e7209d7" PRIMARY KEY (id);


--
-- Name: vne_langs PK_d5d1c1e82773cfdb6bc8785f60a; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_langs
    ADD CONSTRAINT "PK_d5d1c1e82773cfdb6bc8785f60a" PRIMARY KEY (id);


--
-- Name: vne_wordbooks PK_fe107eba055dfeb52d76f771029; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_wordbooks
    ADD CONSTRAINT "PK_fe107eba055dfeb52d76f771029" PRIMARY KEY (id);


--
-- Name: vne_admins UQ_0ebf4ce544e97dc18ccf67dadb4; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "UQ_0ebf4ce544e97dc18ccf67dadb4" UNIQUE (email);


--
-- Name: vne_employees UQ_752fad6244eb8729bba8e6558da; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "UQ_752fad6244eb8729bba8e6558da" UNIQUE (email);


--
-- Name: vne_mailtemplates UQ_8dcdd7fca3bc0ba922e66e6e632; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "UQ_8dcdd7fca3bc0ba922e66e6e632" UNIQUE (name);


--
-- Name: vne_tables UQ_af6e48dc3768cbad3f140aa3aca; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "UQ_af6e48dc3768cbad3f140aa3aca" UNIQUE (code);


--
-- Name: IDX_04ce0a0d84f168475f385b5843; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_04ce0a0d84f168475f385b5843" ON "default".vne_words USING btree (mark);


--
-- Name: IDX_0ebf4ce544e97dc18ccf67dadb; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_0ebf4ce544e97dc18ccf67dadb" ON "default".vne_admins USING btree (email);


--
-- Name: IDX_15bbea4f323c6b5d1b5d1bc630; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_15bbea4f323c6b5d1b5d1bc630" ON "default".vne_products USING btree (name);


--
-- Name: IDX_29851f01aa898c68aa2c4b7014; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_29851f01aa898c68aa2c4b7014" ON "default".vne_restaurants USING btree (name);


--
-- Name: IDX_2e1de563e14f7009d683b9bde4; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_2e1de563e14f7009d683b9bde4" ON "default".vne_langs USING btree (slug);


--
-- Name: IDX_752fad6244eb8729bba8e6558d; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_752fad6244eb8729bba8e6558d" ON "default".vne_employees USING btree (email);


--
-- Name: IDX_8dcdd7fca3bc0ba922e66e6e63; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_8dcdd7fca3bc0ba922e66e6e63" ON "default".vne_mailtemplates USING btree (name);


--
-- Name: IDX_961714c023daa0f447930913e0; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_961714c023daa0f447930913e0" ON "default".vne_settings USING btree (p);


--
-- Name: IDX_d30ea31a6d19f1e5e6ab6aea97; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_d30ea31a6d19f1e5e6ab6aea97" ON "default".vne_employees USING btree (name);


--
-- Name: IDX_e4310c89c01b1e43dfa6772e01; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_e4310c89c01b1e43dfa6772e01" ON "default".vne_products USING btree (code);


--
-- Name: vne_mailtemplate_translations FK_04dd42b567b276df508ea10d846; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_04dd42b567b276df508ea10d846" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_employee_status_translations FK_0fddd42f52eb8aa644afef6ce0c; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "FK_0fddd42f52eb8aa644afef6ce0c" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_transactions FK_176f7316fe69ff2ecff4dadc719; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_transactions
    ADD CONSTRAINT "FK_176f7316fe69ff2ecff4dadc719" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_words FK_1dadd9fef27716c045b163f7883; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_words
    ADD CONSTRAINT "FK_1dadd9fef27716c045b163f7883" FOREIGN KEY (wordbook_id) REFERENCES "default".vne_wordbooks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_word_translations FK_205f30e87780f40620664ec78eb; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "FK_205f30e87780f40620664ec78eb" FOREIGN KEY (word_id) REFERENCES "default".vne_words(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_product_images FK_4525d666b04e8390496065a6759; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_product_images
    ADD CONSTRAINT "FK_4525d666b04e8390496065a6759" FOREIGN KEY (product_id) REFERENCES "default".vne_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_admins FK_55d689227fb459994e546aa0293; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "FK_55d689227fb459994e546aa0293" FOREIGN KEY (admingroup_id) REFERENCES "default".vne_admingroups(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vne_employee_status_translations FK_568aa4b75543a6152b15e117352; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employee_status_translations
    ADD CONSTRAINT "FK_568aa4b75543a6152b15e117352" FOREIGN KEY (employee_status_id) REFERENCES "default".vne_employee_statuses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_employees FK_60383ed5415c03ba84e5670d21b; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "FK_60383ed5415c03ba84e5670d21b" FOREIGN KEY (employee_status_id) REFERENCES "default".vne_employee_statuses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_halls FK_76a8663a8771558c69ef1e51fef; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_halls
    ADD CONSTRAINT "FK_76a8663a8771558c69ef1e51fef" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_cats FK_783fb2e5fce129fa4260d764e10; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "FK_783fb2e5fce129fa4260d764e10" FOREIGN KEY (icon_id) REFERENCES "default".vne_icons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_icon_translations FK_80244055d0c2bf40fdf02dd143a; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "FK_80244055d0c2bf40fdf02dd143a" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_icon_translations FK_8acb739beb6940c0a16ae1da22a; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_icon_translations
    ADD CONSTRAINT "FK_8acb739beb6940c0a16ae1da22a" FOREIGN KEY (icon_id) REFERENCES "default".vne_icons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_mailtemplate_translations FK_967e7082c5cd07daaa63df4a36b; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_967e7082c5cd07daaa63df4a36b" FOREIGN KEY (mailtemplate_id) REFERENCES "default".vne_mailtemplates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_ingredients FK_a0bb80d16761c0e30d77ebec9e8; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_ingredients
    ADD CONSTRAINT "FK_a0bb80d16761c0e30d77ebec9e8" FOREIGN KEY (product_id) REFERENCES "default".vne_products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_products FK_a24a1d97f422df9a4ef6f858dac; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "FK_a24a1d97f422df9a4ef6f858dac" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_employees FK_ab4672296c3f1ab805e0937a481; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_employees
    ADD CONSTRAINT "FK_ab4672296c3f1ab805e0937a481" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_restaurants FK_b4f2c8b3192294163738f730610; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_b4f2c8b3192294163738f730610" FOREIGN KEY (currency_id) REFERENCES "default".vne_currencies(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vne_word_translations FK_c7d449bf6c30c1b0c83af297543; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "FK_c7d449bf6c30c1b0c83af297543" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_tables FK_d70db2be1204137303fa4cf72b4; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_tables
    ADD CONSTRAINT "FK_d70db2be1204137303fa4cf72b4" FOREIGN KEY (hall_id) REFERENCES "default".vne_halls(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_products FK_f080cc7f8507b209a6d54439a36; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_products
    ADD CONSTRAINT "FK_f080cc7f8507b209a6d54439a36" FOREIGN KEY (cat_id) REFERENCES "default".vne_cats(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_cats FK_f25d1c7e725d240109b931ef530; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_cats
    ADD CONSTRAINT "FK_f25d1c7e725d240109b931ef530" FOREIGN KEY (restaurant_id) REFERENCES "default".vne_restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_restaurants FK_f8d32ea80f03240f3f3328a7374; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_f8d32ea80f03240f3f3328a7374" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

