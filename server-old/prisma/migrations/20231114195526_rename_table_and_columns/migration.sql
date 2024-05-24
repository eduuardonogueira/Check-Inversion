/*
  Warnings:

  - You are about to drop the column `hostname` on the `Neighbor` table. All the data in the column will be lost.
  - You are about to drop the `NeighborQuery` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `neighbor` to the `Neighbor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NeighborQuery" DROP CONSTRAINT "NeighborQuery_hostId_fkey";

-- AlterTable
ALTER TABLE "Neighbor" DROP COLUMN "hostname",
ADD COLUMN     "neighbor" TEXT NOT NULL;

-- DropTable
DROP TABLE "NeighborQuery";

-- CreateTable
CREATE TABLE "HostQuery" (
    "id" TEXT NOT NULL,
    "neighbor" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "remotePort" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostId" TEXT NOT NULL,

    CONSTRAINT "HostQuery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HostQuery" ADD CONSTRAINT "HostQuery_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
