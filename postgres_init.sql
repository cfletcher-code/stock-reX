CREATE DATABASE backend_db;

\c backend_db;

CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    user_id INT,
    product_id VARCHAR(255),
    feedback_value INT
);

CREATE TABLE IF NOT EXISTS shoe_metadata (
    "id" INT,
    "title" VARCHAR(255),
    "colorway" VARCHAR(255),
    "releaseDate" DATE,
    "retailPrice" NUMERIC,
    "brand" VARCHAR(255),
    "model" VARCHAR(255),
    "lowestAsk" INT,
    "numberOfAsks" INT,
    "highestBid" INT,
    "numberOfBids" INT,
    "annualHigh" INT,
    "annualLow"  INT,
    "volatility" NUMERIC,
    "pricePremium" NUMERIC,
    "lastSale" INT,
    "changeValue" INT,
    "changePercentage" NUMERIC,
    "salesLast72Hours" INT,
    "sku" VARCHAR(255),
    "currency" VARCHAR(255),
    "png_path" VARCHAR(255)
);

COPY shoe_metadata("id","title","colorway","releaseDate","retailPrice",
    "brand","model","lowestAsk","numberOfAsks","highestBid","numberOfBids",
    "annualHigh","annualLow","volatility","pricePremium","lastSale","changeValue",
    "changePercentage","salesLast72Hours","sku","currency","png_path")
FROM '/clean_shoe_metadata.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE IF NOT EXISTS shoe_tokens (
    id SERIAL PRIMARY KEY,
    prod_id INT,
    token VARCHAR(255),
    total INT
);

COPY shoe_tokens(id,prod_id,token,total)
FROM '/shoe_tokens.csv' DELIMITER ',' CSV HEADER;