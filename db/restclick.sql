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
    active_until timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    lang_id integer,
    prolonged_at timestamp without time zone
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
1	1	Alex	7573497@gmail.com	$2b$10$dDwIj8/ShPCtl5jay6vjUOrHSJjHBB7GhO8FewyV.BYj0jCEOW3De	2021-8/1629929025223_150.jpg	t	t
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
2	2	1	admin@vio.net.ua		Мышкин Иван	+38 095 2010000	f	2021-08-26 21:32:06.303446	f
1	1	\N	7573497@gmail.com		Кошкин Алексей	+38 066 4020000	t	2021-08-26 21:31:03.512723	t
6	18	\N	7573498@gmail.com	123	\N	\N	t	2021-08-27 22:30:50.941314	t
7	19	\N	7573499@gmail.com	123	\N	\N	t	2021-08-28 00:39:48.284041	t
3	1	1	viovalya2@gmail.com	$2b$10$uGttm7Z2Ovz1A95DkFmxZO2n9dObnnL08GPoI9oyvEUkIGpK5nwt6	Виктор Лисичкин	+38123444444444	t	2021-08-26 22:03:00.332342	f
24	38	\N	viovalya@gmail.com	$2b$10$55Yr5WOoTrh2TD3DnyXEh.thX6oFeE459/qpt1hxOI93hWHW6lY8u	\N	\N	t	2021-08-30 12:54:22.738402	t
10	22	\N	757349788@gmail.com	123	Алексей Петров	\N	t	2021-08-28 11:27:23.119406	t
9	21	\N	75734999@gmail.com	123	Булкин Олег	\N	t	2021-08-28 11:12:59.882811	t
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
\.


--
-- Data for Name: vne_mailtemplates; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_mailtemplates (id, name, defended) FROM stdin;
2	restaurant-created	f
\.


--
-- Data for Name: vne_restaurants; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_restaurants (id, currency_id, name, domain, ownername, phone, address, inn, ogrn, comment, active_until, created_at, lang_id, prolonged_at) FROM stdin;
38	1	Владимирский	vlad	Овечкин Игорь Иванович	+380664021350	Танкопия, 13/9	999666333	11222333	тест	\N	2021-08-30 12:54:22.738402	1	\N
1	1	Плакучая ива	iva	Иван Петров	+38 066 4020000	Харьков, ул. Кошкина, 1	123456	654987	тестовый ресторан	2025-08-26 18:55:00	2021-08-26 20:52:31.021727	1	\N
15	1	Длинное название ресторана	test12	\N	\N	\N	\N	\N	\N	2022-02-18 01:55:00	2021-08-27 01:55:15.844543	1	\N
2	2	Рога и копыта	roga	Андрей Рыбкин	+38 067 0000000	Москва, ул. Собачкина, 2	111222	333555	еще один тестовый ресторан	2022-04-14 17:27:00	2021-08-26 20:52:31.021727	1	\N
10	1	Сто пудов	test8	\N	\N	\N	\N	\N	\N	2021-09-01 00:25:00	2021-08-27 00:25:50.223075	1	\N
9	1	McDonalds	test7	\N	\N	\N	\N	\N	\N	2021-12-25 00:25:00	2021-08-27 00:25:34.269246	1	2021-08-26 00:01:00
13	2	Ромашка	test11	Свинкин Олег Иванович	+3806778945612	ул. Ленина, 2	999666333	888999999	тестовый камент	2022-01-20 01:53:00	2021-08-27 00:26:35.018103	2	\N
12	1	Вкусно-быстро	tets10	Птичкин Федор Моисеевич	+38 095 12345687	Харьков, ул. Маршала Жукова, 5	666555444	11222333	\N	2022-02-18 00:26:00	2021-08-27 00:26:24.033626	1	\N
18	1	Пирожковая	pirog	\N	+380664021350	Танкопия, 13/99	\N	\N	\N	\N	2021-08-27 22:30:50.941314	1	\N
11	1	В гостях у сказки	test9	\N	\N	\N	\N	\N	\N	2022-01-14 00:25:00	2021-08-27 00:26:05.774306	1	\N
19	1	Рыбный день	test222	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	\N	2021-08-28 00:39:48.284041	1	\N
6	1	Привет из 90-х	test4	\N	\N	\N	\N	\N	\N	2022-01-14 00:24:00	2021-08-27 00:24:57.598572	1	\N
5	1	У Ашота	test3	\N	\N	\N	\N	\N	\N	2021-12-18 00:24:00	2021-08-27 00:24:34.213564	2	\N
4	1	Шашлычная №1	test2	\N	\N	\N	\N	\N	\N	2021-12-17 00:24:00	2021-08-27 00:24:10.543446	1	\N
3	1	Одарка	test1	\N	\N	\N	\N	\N	\N	2021-10-21 00:23:00	2021-08-27 00:23:50.454941	1	\N
8	1	Слепая свинья	test6	\N	\N	\N	\N	\N	\N	2021-08-26 17:55:00	2021-08-27 00:25:12.606101	1	\N
7	1	National	test5	\N	\N	\N	\N	\N	\N	2021-08-25 03:42:00	2021-08-27 00:25:04.843937	1	\N
22	1	Курский	kursk	\N	+380664021350	Танкопия, 13/9	\N	\N	\N	2022-08-30 00:37:46.523	2021-08-28 11:27:23.119406	1	2021-08-29 00:38:06.151
21	1	Пушкинский	push	Курочкин Иван Кузьмич	+38 097 456789987	\N	\N	\N	\N	2021-08-31 23:41:38.223	2021-08-28 11:12:59.882811	1	2021-08-29 23:41:53.088
\.


--
-- Data for Name: vne_settings; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_settings (id, p, v, c, pos, in_app, defended) FROM stdin;
1	domain	restclick.vio.net.ua	main domain of app	1	t	f
4	owner-app-url	https://owner.restclick.vio.net.ua	owner application URL	2	t	f
2	google-clientid	63103186909-5ut3m449vpr9uqp0v7jv02phea85mub0.apps.googleusercontent.com	Google Oauth API client ID	3	t	f
5	smtp-host	smtp.gmail.com	\N	100	f	f
6	smtp-port	587	\N	101	f	f
7	smtp-login	viodev.robot@gmail.com	\N	102	f	f
8	smtp-pw	6vl1TfeXq	\N	103	f	f
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
17	8	1	Активные рестораны
18	8	2	Active restaurants
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
164	65	1	Закончилась
168	67	1	Не задано
169	67	2	Not set
112	39	1	Фильтр
113	39	2	Filter
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
37	18	1	Подписка
38	18	2	Subscription
165	65	2	Expired
166	66	1	дн. назад
167	66	2	days ago
170	68	1	Регистрация ресторана
171	68	2	Restaurant registration
172	69	1	Домен
173	69	2	Domain
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
222	94	1	Дата продления
223	94	2	Prolonged at
224	95	1	Сортировка
225	95	2	Sorting
\.


--
-- Data for Name: vne_wordbooks; Type: TABLE DATA; Schema: default; Owner: vio
--

COPY "default".vne_wordbooks (id, name, pos) FROM stdin;
5	common	1
2	owner-common	2
1	owner-restaurants	3
3	owner-login	2
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
11	1	101	prolong	\N
12	1	102	history	\N
13	1	103	edit	\N
14	1	104	delete	\N
15	1	105	actions	\N
16	1	200	created-at	\N
17	1	201	name	\N
19	1	106	days-left	\N
20	3	1	title	\N
30	2	102	save	\N
31	2	103	loading	\N
34	2	104	home	\N
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
18	1	202	active-until	\N
39	1	107	filter	\N
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
65	1	108	expired	\N
66	1	109	days-ago	\N
57	5	101	no-date	\N
67	5	107	not-set	\N
68	1	3	title-create	\N
69	1	203	domain	\N
70	1	204	ownername	\N
71	1	205	phone	\N
72	1	206	address	\N
73	1	207	inn	\N
74	1	208	ogrn	\N
75	1	209	currency	\N
76	1	210	comment	\N
77	1	211	admin-email	\N
78	1	212	admin-password	\N
79	1	110	error-domain-duplication	\N
80	1	111	error-email-duplication	\N
81	1	213	lang	\N
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
94	1	214	prolonged-at	\N
95	1	215	sorting	\N
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

SELECT pg_catalog.setval('"default".vne_employees_id_seq', 24, true);


--
-- Name: vne_langs_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_langs_id_seq', 5, true);


--
-- Name: vne_mailtemplate_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplate_translations_id_seq', 4, true);


--
-- Name: vne_mailtemplates_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_mailtemplates_id_seq', 2, true);


--
-- Name: vne_restaurants_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_restaurants_id_seq', 38, true);


--
-- Name: vne_settings_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_settings_id_seq', 8, true);


--
-- Name: vne_word_translations_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_word_translations_id_seq', 225, true);


--
-- Name: vne_wordbooks_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_wordbooks_id_seq', 5, true);


--
-- Name: vne_words_id_seq; Type: SEQUENCE SET; Schema: default; Owner: vio
--

SELECT pg_catalog.setval('"default".vne_words_id_seq', 95, true);


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
-- Name: IDX_83e1ce98acfb064fa10c6dbb9b; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_83e1ce98acfb064fa10c6dbb9b" ON "default".vne_restaurants USING btree (domain);


--
-- Name: IDX_8dcdd7fca3bc0ba922e66e6e63; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_8dcdd7fca3bc0ba922e66e6e63" ON "default".vne_mailtemplates USING btree (name);


--
-- Name: IDX_961714c023daa0f447930913e0; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_961714c023daa0f447930913e0" ON "default".vne_settings USING btree (p);


--
-- Name: IDX_b5c0be82ee53a573665f8129f9; Type: INDEX; Schema: default; Owner: vio
--

CREATE INDEX "IDX_b5c0be82ee53a573665f8129f9" ON "default".vne_restaurants USING btree (active_until);


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

