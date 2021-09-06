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
-- Name: vne_restaurants; Type: TABLE; Schema: default; Owner: vio
--

CREATE TABLE "default".vne_restaurants (
    id integer NOT NULL,
    currency_id integer,
    name character varying,
    domain character varying NOT NULL,
    ownername character varying,
    phone character varying,
    address character varying,
    inn character varying,
    ogrn character varying,
    comment text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    lang_id integer,
    money integer DEFAULT 0 NOT NULL
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
-- Name: vne_restaurants id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants ALTER COLUMN id SET DEFAULT nextval('"default".vne_restaurants_id_seq'::regclass);


--
-- Name: vne_settings id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_settings ALTER COLUMN id SET DEFAULT nextval('"default".vne_settings_id_seq'::regclass);


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
1	1	Alex	7573497@gmail.com	$2b$10$CwPx5O0WXZSvhDLH4abDDulVgye1JkYWmYt9y7XSgZ3sGOsriWYEy	2021-8/1629929025223_150.jpg	t	t
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
4	2	1	работает
6	3	1	обед
7	3	2	dinner
\.


--
-- Data for Name: vne_employee_statuses; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_employee_statuses (id, color, pos) FROM stdin;
1	#000000	1
2	#24b83f	2
3	#f88413	3
\.


--
-- Data for Name: vne_employees; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_employees (id, restaurant_id, employee_status_id, email, password, name, phone, is_admin, created_at, defended) FROM stdin;
6	18	\N	7573498@gmail.com	123	\N	\N	t	2021-08-27 22:30:50.941314	t
7	19	\N	7573499@gmail.com	123	\N	\N	t	2021-08-28 00:39:48.284041	t
10	22	\N	757349788@gmail.com	123	Алексей Петров	\N	t	2021-08-28 11:27:23.119406	t
24	38	\N	viovalya3@gmail.com	$2b$10$55Yr5WOoTrh2TD3DnyXEh.thX6oFeE459/qpt1hxOI93hWHW6lY8u	Алексей Иванов	+380664021350	t	2021-08-30 12:54:22.738402	t
1	1	\N	7573497222@gmail.com		Кошкин Алексей	+38 066 4020000	t	2021-08-26 21:31:03.512723	t
9	21	\N	7573497@gmail.com	123	Булкин Олег	\N	t	2021-08-28 11:12:59.882811	t
2	10	1	admin@vio.net.ua		Мышкин Иван	+38 095 2010000	t	2021-08-26 21:32:06.303446	f
27	\N	\N	75734975555@gmail.com	$2b$10$RXTYMD2BBvxYo/J2o2VXCuPSe2OY6cOTCSGx5i8Dl2/VzTlXLMfwu	Алексей Чепига	+380660000000	f	2021-09-02 12:59:04.543675	f
28	45	\N	75734974444@gmail.com	$2b$10$o2Y63TUS9aBVLLpNAkS9IOMVb2TvEKCjUtg3tADQTnsJI/zrTqBJe	\N	\N	t	2021-09-02 21:07:52.119825	t
29	9	\N	7573497777@gmail.com	$2b$10$lrWJKgjzIhv6qDzSD6AcZOjh2KO9k5x3K5tVjQJ3q58ZgF/uSQKj6	Петров Андрей	+380664000050	t	2021-09-03 01:41:45.691878	f
3	43	1	viovalya@gmail.com	$2b$10$uGttm7Z2Ovz1A95DkFmxZO2n9dObnnL08GPoI9oyvEUkIGpK5nwt6	Виктор Лисичкин	+38123444444444	t	2021-08-26 22:03:00.332342	f
30	43	\N	7573497111@gmail.com	$2b$10$ZugM9ReCVctvQ9CdfPF7wucHDF8Tu7cTJyC9zXfbCgkZEMn12xgsm	Андрей Безымянный	+380664000000	f	2021-09-04 12:48:30.239362	f
31	46	\N	7573497rr@gmail.com	$2b$10$4KyYx5FqOrFutyLB7Ls2oe82rMzNIGvQ/24YWJ1QivWSTFs4gSEpm	\N	\N	t	2021-09-07 01:16:30.429325	t
32	15	\N	7573497999@gmail.com	$2b$10$IjNiwNYzTFdFc.r.fMYWo.sa5Mbm9ebMnABxBYaYfXDKdeJJnL9om	Пушкин А.	+380664028899	t	2021-09-07 02:03:30.360362	f
\.


--
-- Data for Name: vne_langs; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_langs (id, slug, title, shorttitle, img, pos, active, slugable, dir, defended) FROM stdin;
2	en	English	Eng	\N	2	t	f	ltr	f
1	ru	Русский	Рус	\N	1	t	f	ltr	t
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
-- Data for Name: vne_restaurants; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_restaurants (id, currency_id, name, domain, ownername, phone, address, inn, ogrn, comment, created_at, lang_id, money) FROM stdin;
2	2	Рога и копыта	roga	Андрей Рыбкин	+38 067 0000000	Москва, ул. Собачкина, 2	111222	333555	еще один тестовый ресторан	2021-08-26 20:52:31.021727	1	0
6	1	Привет из 90-х	test4	\N	\N	\N	\N	\N	\N	2021-08-27 00:24:57.598572	1	0
4	1	Шашлычная №1	test2	\N	\N	\N	\N	\N	\N	2021-08-27 00:24:10.543446	1	0
3	1	Одарка	test1	\N	\N	\N	\N	\N	\N	2021-08-27 00:23:50.454941	1	0
7	1	National	test5	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:04.843937	1	0
21	1	Пушкинский	https://push.ru	Курочкин Иван Кузьмич	+38 097 456789987	Москва	456	654	\N	2021-08-28 11:12:59.882811	1	226
19	1	Рыбный день	test222	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2021-08-28 00:39:48.284041	1	770
43	1	Надежда	nadezhda.ru	Овечкин Игорь Иванович	+38066666666	Танкопия, 5	123654	654987	\N	2021-09-02 12:36:33.846619	1	1575
15	1	Длинное название ресторана	test12	\N	\N	\N	\N	\N	\N	2021-08-27 01:55:15.844543	1	94
10	1	Сто пудов	test8	Алексей Сидоров	+380664021350	Танкопия, 1	\N	\N	\N	2021-08-27 00:25:50.223075	1	-30
9	1	McDonalds	test7	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:34.269246	1	-20
18	1	Пирожковая	pirog	\N	+380664021350	Танкопия, 13/99	\N	\N	\N	2021-08-27 22:30:50.941314	1	103
5	1	У Ашота	test3	Алексей Козлов	+380664021350	Танкопия, 1	\N	\N	\N	2021-08-27 00:24:34.213564	2	0
1	1	Плакучая ива	iva	Иван Петров	+38 066 4020000	Харьков, ул. Кошкина, 1	123456	654987	тестовый ресторан	2021-08-26 20:52:31.021727	1	66265
13	2	Ромашка	test11	Свинкин Олег Иванович	+3806778945612	ул. Ленина, 2	999666333	888999999	тестовый камент	2021-08-27 00:26:35.018103	2	10
22	1	Курский	kursk	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2021-08-28 11:27:23.119406	1	-40
46	1	RRR!		Овечкин Игорь Иванович	+380664021350	Танкопия, 103	999666333	555444	\N	2021-09-07 01:16:30.429325	1	10
11	1	В гостях у сказки	test9	\N	\N	\N	\N	\N	\N	2021-08-27 00:26:05.774306	1	46588
38	1	Владимирский	http://vlad.net	Овечкин Игорь Иванович	+380664021350	Танкопия, 13/9	999666333	11222333	тест	2021-08-30 12:54:22.738402	1	-9
12	1	Вкусно-быстро	tets10.ry	Птичкин Федор Моисеевич	+38 095 12345687	Харьков, ул. Маршала Жукова, 5	666555444	11222333	\N	2021-08-27 00:26:24.033626	1	9476
45	1	Кошки-мышки	http://ukr.net	Максим Савенков	+380667889999	Танкопия, 13/9	999666333	555444	\N	2021-09-02 21:07:52.119825	1	-25
8	1	Слепая свинья	test6	\N	\N	\N	\N	\N	\N	2021-08-27 00:25:12.606101	1	-10
\.


--
-- Data for Name: vne_settings; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_settings (id, p, v, c, pos, in_app, defended) FROM stdin;
5	smtp-host	smtp.gmail.com	\N	100	f	f
6	smtp-port	587	\N	101	f	f
7	smtp-login	viodev.robot@gmail.com	\N	102	f	f
8	smtp-pw	6vl1TfeXq	\N	103	f	f
9	price	10	цена человеко-дня	2	t	f
2	google-clientid	63103186909-5ut3m449vpr9uqp0v7jv02phea85mub0.apps.googleusercontent.com	Google Oauth API client ID	200	t	f
4	owner-app-url	https://owner.restclick.vio.net.ua	URL админки владельца	1	t	f
10	pay-time	4:00	время снятия денег со счетов	3	t	f
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
8	11	46588	2021-09-02 16:11:40.90919	admin
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
23	11	0	2021-09-04 13:04:00.049502	auto
24	12	0	2021-09-04 13:04:00.051933	auto
25	15	0	2021-09-04 13:05:00.015339	auto
26	19	-10	2021-09-04 13:05:00.021543	auto
27	43	-20	2021-09-04 13:05:00.026542	auto
28	18	-10	2021-09-04 13:05:00.030034	auto
29	21	-10	2021-09-04 13:05:00.034265	auto
30	1	-10	2021-09-04 13:05:00.037458	auto
31	11	0	2021-09-04 13:05:00.040172	auto
32	12	0	2021-09-04 13:05:00.042122	auto
33	21	-10	2021-09-04 13:06:00.01753	auto
34	1	-10	2021-09-04 13:06:00.02342	auto
35	15	0	2021-09-04 13:06:00.02588	auto
36	19	-10	2021-09-04 13:06:00.029048	auto
37	43	-20	2021-09-04 13:06:00.032726	auto
38	11	0	2021-09-04 13:06:00.034584	auto
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
55	11	0	2021-09-04 13:26:00.064768	auto
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
70	11	0	2021-09-06 22:00:00.070944	auto
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
87	11	0	2021-09-06 23:00:00.047298	auto
88	12	0	2021-09-06 23:00:00.049146	auto
89	2	0	2021-09-07 00:00:00.028703	auto
90	6	0	2021-09-07 00:00:00.035382	auto
91	4	0	2021-09-07 00:00:00.038967	auto
92	3	0	2021-09-07 00:00:00.041646	auto
93	7	0	2021-09-07 00:00:00.044087	auto
94	15	0	2021-09-07 00:00:00.046873	auto
95	5	0	2021-09-07 00:00:00.049036	auto
96	13	0	2021-09-07 00:00:00.051138	auto
97	11	0	2021-09-07 00:00:00.054199	auto
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
117	11	0	2021-09-07 01:00:00.067784	auto
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
134	11	0	2021-09-07 02:00:00.069769	auto
135	12	0	2021-09-07 02:00:00.071931	auto
136	46	10	2021-09-07 02:02:38.330188	admin
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
17	8	1	Активные рестораны
18	8	2	Active restaurants
21	10	1	Неактивные рестораны
22	10	2	Inactive restaurants
25	12	1	История заказов
26	12	2	Orders history
27	13	1	Просмотр и редактирование
28	13	2	View and edit
29	14	1	Удалить
30	14	2	Delete
31	15	1	Действия
32	15	2	Actions
35	17	1	Название
36	17	2	Name
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
65	32	1	Войти через Google
66	32	2	Sign in with Google
67	33	1	Войти через Apple
68	33	2	Sign in with Apple
41	20	1	Авторизация
42	20	2	Authorization
71	35	1	Новый пароль
72	35	2	New password
73	36	1	Новый пароль еще раз
74	36	2	Repeat new password
75	37	1	Ваш логин
76	37	2	Your login
77	38	1	Пароли не совпадают
78	38	2	Passwords don't match
168	67	1	Не задано
169	67	2	Not set
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
252	109	1	Ваш пароль
253	109	2	Your password
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
\.


--
-- Data for Name: vne_words; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_words (id, wordbook_id, pos, mark, note) FROM stdin;
2	2	1	menu-active	\N
3	2	2	menu-inactive	\N
4	2	3	menu-pw	\N
12	1	102	history	\N
13	1	103	edit	\N
14	1	104	delete	\N
15	1	105	actions	\N
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
109	1	128	your-password	\N
114	5	119	none	\N
119	5	120	filter	\N
120	5	121	sorting	\N
121	8	0	title	\N
110	8	1	restaurant	\N
111	8	2	created-at	\N
112	8	3	type	\N
\.


--
-- Name: vne_admingroups_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_admingroups_id_seq', 1, true);


--
-- Name: vne_admins_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_admins_id_seq', 2, true);


--
-- Name: vne_currencies_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_currencies_id_seq', 4, true);


--
-- Name: vne_employee_status_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employee_status_translations_id_seq', 7, true);


--
-- Name: vne_employee_statuses_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employee_statuses_id_seq', 3, true);


--
-- Name: vne_employees_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_employees_id_seq', 32, true);


--
-- Name: vne_langs_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_langs_id_seq', 5, true);


--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplate_translations_id_seq', 16, true);


--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplates_id_seq', 8, true);


--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_restaurants_id_seq', 46, true);


--
-- Name: vne_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_settings_id_seq', 10, true);


--
-- Name: vne_transactions_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_transactions_id_seq', 136, true);


--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_word_translations_id_seq', 285, true);


--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_wordbooks_id_seq', 8, true);


--
-- Name: vne_words_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_words_id_seq', 125, true);


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
-- Name: vne_mailtemplates PK_0ad69d17564005feccf82893808; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "PK_0ad69d17564005feccf82893808" PRIMARY KEY (id);


--
-- Name: vne_admins PK_0e169cb063501c963352dfbaaac; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admins
    ADD CONSTRAINT "PK_0e169cb063501c963352dfbaaac" PRIMARY KEY (id);


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
-- Name: vne_currencies PK_84d6314cfa9aff009fbb4f55c22; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_currencies
    ADD CONSTRAINT "PK_84d6314cfa9aff009fbb4f55c22" PRIMARY KEY (id);


--
-- Name: vne_admingroups PK_885fdcbc51834c0641662d5d550; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_admingroups
    ADD CONSTRAINT "PK_885fdcbc51834c0641662d5d550" PRIMARY KEY (id);


--
-- Name: vne_mailtemplate_translations PK_9c2864edd8cf9260136c23914bc; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "PK_9c2864edd8cf9260136c23914bc" PRIMARY KEY (id);


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
-- Name: vne_restaurants UQ_83e1ce98acfb064fa10c6dbb9b6; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "UQ_83e1ce98acfb064fa10c6dbb9b6" UNIQUE (domain);


--
-- Name: vne_mailtemplates UQ_8dcdd7fca3bc0ba922e66e6e632; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "UQ_8dcdd7fca3bc0ba922e66e6e632" UNIQUE (name);


--
-- Name: IDX_04ce0a0d84f168475f385b5843; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_04ce0a0d84f168475f385b5843" ON "default".vne_words USING btree (mark);


--
-- Name: IDX_0ebf4ce544e97dc18ccf67dadb; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_0ebf4ce544e97dc18ccf67dadb" ON "default".vne_admins USING btree (email);


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
-- Name: vne_mailtemplate_translations FK_967e7082c5cd07daaa63df4a36b; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_967e7082c5cd07daaa63df4a36b" FOREIGN KEY (mailtemplate_id) REFERENCES "default".vne_mailtemplates(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
-- Name: vne_restaurants FK_f8d32ea80f03240f3f3328a7374; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_restaurants
    ADD CONSTRAINT "FK_f8d32ea80f03240f3f3328a7374" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

