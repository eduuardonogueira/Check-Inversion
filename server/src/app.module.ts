import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { HostsModule } from './modules/hosts/hosts.module';
import { NeighborsModule } from './modules/neighbors/neighbors.module';
import { QueryLogsModule } from './modules/query-logs/query-logs.module';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [configuration],
    }),
    HostsModule,
    NeighborsModule,
    QueryLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
