/*
  Warnings:

  - Added the required column `ip` to the `queries` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_queries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "neighbor" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "remotePort" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_queries" ("created_at", "hostname", "id", "neighbor", "port", "remotePort") SELECT "created_at", "hostname", "id", "neighbor", "port", "remotePort" FROM "queries";
DROP TABLE "queries";
ALTER TABLE "new_queries" RENAME TO "queries";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
