-- CreateTable
CREATE TABLE "Host" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "hostname" VARCHAR(50) NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Neighbor" (
    "id" TEXT NOT NULL,
    "hostname" VARCHAR(50) NOT NULL,
    "port" VARCHAR(50) NOT NULL,
    "remote_port" VARCHAR(10) NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host_id" TEXT NOT NULL,

    CONSTRAINT "Neighbor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "query_logs" (
    "id" TEXT NOT NULL,
    "hostname" VARCHAR(50) NOT NULL,
    "port" VARCHAR(50) NOT NULL,
    "remote_port" VARCHAR(10) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host_id" TEXT NOT NULL,

    CONSTRAINT "query_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Host_ip_key" ON "Host"("ip");

-- AddForeignKey
ALTER TABLE "Neighbor" ADD CONSTRAINT "Neighbor_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "query_logs" ADD CONSTRAINT "query_logs_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
