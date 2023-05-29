/*
  Warnings:

  - You are about to drop the `hosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "hosts_ip_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "hosts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Host" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ip" TEXT NOT NULL,
    "hostname" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Neighbor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "neighbor" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "remotePort" TEXT NOT NULL,
    "hostId" INTEGER NOT NULL,
    CONSTRAINT "Neighbor_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Neighbor" ("createdAt", "hostId", "id", "neighbor", "port", "remotePort", "updatedAt") SELECT "createdAt", "hostId", "id", "neighbor", "port", "remotePort", "updatedAt" FROM "Neighbor";
DROP TABLE "Neighbor";
ALTER TABLE "new_Neighbor" RENAME TO "Neighbor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Host_ip_key" ON "Host"("ip");
