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
-- Name: vne_settings id; Type: DEFAULT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_settings ALTER COLUMN id SET DEFAULT nextval('"default".vne_settings_id_seq'::regclass);


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
1	1	Alex	7573497@gmail.com	$2b$10$rw6.jxMsMClPyXRmFpFB..v79zc6yiE4WZ1jueL9rBBveh923vjoq	2021-8/1629929025223_150.jpg	t	t
\.


--
-- Data for Name: vne_currencies; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_currencies (id, name, symbol, pos, defended) FROM stdin;
1	RUR	₽	1	t
3	USD	$	3	f
2	EUR	€	2	f
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
\.


--
-- Data for Name: vne_mailtemplates; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_mailtemplates (id, name, defended) FROM stdin;
\.


--
-- Data for Name: vne_settings; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_settings (id, p, v, c, pos, in_app, defended) FROM stdin;
1	domain	restclick.vio.net.ua	main domain of app	1	t	f
4	owner-app-url	https://owner.restclick.vio.net.ua	owner application URL	2	t	f
2	google-clientid	63103186909-5ut3m449vpr9uqp0v7jv02phea85mub0.apps.googleusercontent.com	Google Oauth API client ID	3	t	f
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
11	5	1	Страница
12	5	2	Page
13	6	1	Выход
14	6	2	Sign out
2	1	2	Add restaurant
1	1	1	Добавить ресторан
15	7	1	Активные
16	7	2	Active
17	8	1	Активные рестораны
18	8	2	Active restaurants
19	9	1	Неактивные
20	9	2	Inactive
21	10	1	Неактивные рестораны
22	10	2	Inactive restaurants
23	11	1	Продлить подписку
24	11	2	Prolong subscription
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
37	18	1	Подписка
38	18	2	Subscription
39	19	1	дн. осталось
40	19	2	days left
33	16	1	Дата создания
34	16	2	Created at
45	22	1	E-mail
46	22	2	E-mail
47	23	1	Пароль
48	23	2	Password
49	24	1	Войти
50	24	2	Sign in
51	25	1	Произошла ошибка. Попробуйте позднее.
52	25	2	An error has occurred. Please try again later.
55	27	1	Доступ запрещен
56	27	2	Access denied
57	28	1	Смена пароля
58	28	2	Change password
59	29	1	Смена пароля
60	29	2	Change password
61	30	1	Сохранить
62	30	2	Save
63	31	1	загрузка...
64	31	2	loading...
65	32	1	Войти через Google
66	32	2	Sign in with Google
67	33	1	Войти через Apple
68	33	2	Sign in with Apple
41	20	1	Авторизация
42	20	2	Authorization
43	21	1	Авторизация
44	21	2	Authorization
69	34	1	Главная
70	34	2	Home
71	35	1	Новый пароль
72	35	2	New password
73	36	1	Новый пароль еще раз
74	36	2	Repeat new password
75	37	1	Ваш логин
76	37	2	Your login
77	38	1	Пароли не совпадают
78	38	2	Passwords don't match
\.


--
-- Data for Name: vne_wordbooks; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_wordbooks (id, name, pos) FROM stdin;
1	owner-restaurants	2
2	owner-common	1
3	owner-login	3
4	owner-password	4
\.


--
-- Data for Name: vne_words; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_words (id, wordbook_id, pos, mark, note) FROM stdin;
2	2	1	menu-active	\N
3	2	2	menu-inactive	\N
4	2	3	menu-pw	\N
5	2	100	page	\N
6	2	101	logout	\N
1	1	100	create	\N
7	1	1	head-active	\N
8	1	2	title-active	\N
9	1	3	head-inactive	\N
10	1	4	title-inactive	\N
11	1	101	prolong	\N
12	1	102	history	\N
13	1	103	edit	\N
14	1	104	delete	\N
15	1	105	actions	\N
16	1	200	created-at	\N
17	1	201	name	\N
18	1	202	subscription	\N
19	1	106	days-left	\N
20	3	1	title	\N
21	3	2	head	\N
22	3	3	email	\N
23	3	4	password	\N
24	3	5	login	\N
27	2	201	error-401	\N
25	2	200	error	\N
28	4	1	head	\N
29	4	2	title	\N
30	2	102	save	\N
31	2	103	loading	\N
32	3	6	with-google	\N
33	3	7	with-apple	\N
34	2	104	home	\N
35	4	3	password1	\N
36	4	4	password2	\N
37	4	5	login	\N
38	4	6	error-mismatch	\N
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

SELECT pg_catalog.setval('"default".vne_currencies_id_seq', 3, true);


--
-- Name: vne_langs_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_langs_id_seq', 4, true);


--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplate_translations_id_seq', 2, true);


--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplates_id_seq', 1, true);


--
-- Name: vne_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_settings_id_seq', 4, true);


--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_word_translations_id_seq', 78, true);


--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_wordbooks_id_seq', 4, true);


--
-- Name: vne_words_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_words_id_seq', 38, true);


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
-- Name: vne_mailtemplates UQ_8dcdd7fca3bc0ba922e66e6e632; Type: CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplates
    ADD CONSTRAINT "UQ_8dcdd7fca3bc0ba922e66e6e632" UNIQUE (name);


--
-- Name: IDX_04ce0a0d84f168475f385b5843; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_04ce0a0d84f168475f385b5843" ON "default".vne_words USING btree (mark);


--
-- Name: IDX_2e1de563e14f7009d683b9bde4; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_2e1de563e14f7009d683b9bde4" ON "default".vne_langs USING btree (slug);


--
-- Name: IDX_8dcdd7fca3bc0ba922e66e6e63; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_8dcdd7fca3bc0ba922e66e6e63" ON "default".vne_mailtemplates USING btree (name);


--
-- Name: IDX_961714c023daa0f447930913e0; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_961714c023daa0f447930913e0" ON "default".vne_settings USING btree (p);


--
-- Name: vne_mailtemplate_translations FK_04dd42b567b276df508ea10d846; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_04dd42b567b276df508ea10d846" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


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
    ADD CONSTRAINT "FK_55d689227fb459994e546aa0293" FOREIGN KEY (admingroup_id) REFERENCES "default".vne_admingroups(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vne_mailtemplate_translations FK_967e7082c5cd07daaa63df4a36b; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_mailtemplate_translations
    ADD CONSTRAINT "FK_967e7082c5cd07daaa63df4a36b" FOREIGN KEY (mailtemplate_id) REFERENCES "default".vne_mailtemplates(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vne_word_translations FK_c7d449bf6c30c1b0c83af297543; Type: FK CONSTRAINT; Schema: default; Owner: vio
--

ALTER TABLE ONLY "default".vne_word_translations
    ADD CONSTRAINT "FK_c7d449bf6c30c1b0c83af297543" FOREIGN KEY (lang_id) REFERENCES "default".vne_langs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

