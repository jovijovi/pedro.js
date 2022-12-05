\c mock_pedro;

-- ----------------------------
-- Table structure for mock_animals
-- ----------------------------
DROP TABLE IF EXISTS "public"."mock_animals";
CREATE TABLE "public"."mock_animals" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "color" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Primary Key structure for table mock_animals
-- ----------------------------
ALTER TABLE "public"."mock_animals" ADD CONSTRAINT "mock_animals_pkey" PRIMARY KEY ("id");
