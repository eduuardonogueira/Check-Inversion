/*
  Warnings:

  - You are about to drop the `checks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "checks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "queries";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "hosts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ip" TEXT NOT NULL,
    "hostname" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Neighbor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "neighbor" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "remotePort" TEXT NOT NULL,
    "hostId" INTEGER NOT NULL,
    CONSTRAINT "Neighbor_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "hosts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "hosts_ip_key" ON "hosts"("ip");
