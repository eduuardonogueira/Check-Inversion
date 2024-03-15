/*
  Warnings:

  - You are about to drop the column `neighbor` on the `Neighbor` table. All the data in the column will be lost.
  - You are about to drop the `HostQuery` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hostname` to the `Neighbor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HostQuery" DROP CONSTRAINT "HostQuery_hostId_fkey";

-- AlterTable
ALTER TABLE "Neighbor" DROP COLUMN "neighbor",
ADD COLUMN     "hostname" TEXT NOT NULL;

-- DropTable
DROP TABLE "HostQuery";

-- CreateTable
CREATE TABLE "NeighborQuery" (
    "id" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "remotePort" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostId" TEXT NOT NULL,

    CONSTRAINT "NeighborQuery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NeighborQuery" ADD CONSTRAINT "NeighborQuery_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
