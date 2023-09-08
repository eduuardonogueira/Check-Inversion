-- CreateTable
CREATE TABLE "Host" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Neighbor" (
    "id" TEXT NOT NULL,
    "neighbor" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "remotePort" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostId" TEXT NOT NULL,

    CONSTRAINT "Neighbor_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Host_ip_key" ON "Host"("ip");

-- AddForeignKey
ALTER TABLE "Neighbor" ADD CONSTRAINT "Neighbor_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostQuery" ADD CONSTRAINT "HostQuery_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
