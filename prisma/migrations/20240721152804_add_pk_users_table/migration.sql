ALTER TABLE public.users ADD CONSTRAINT users_pk PRIMARY KEY (id);
ALTER TABLE public.users ADD CONSTRAINT users_unique UNIQUE (id);
