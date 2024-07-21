CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION generate_cuid()
RETURNS TEXT AS $$
DECLARE
    cuid TEXT;
BEGIN
    -- Gerar um UUID
    cuid := left(encode(gen_random_bytes(18), 'hex'), 24);

    -- Retornar o CUID em formato de texto
    RETURN cuid;
END;
$$ LANGUAGE plpgsql;
