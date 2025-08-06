  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { MongooseModule } from '@nestjs/mongoose';
  import { ConfigModule } from '@nestjs/config';
  import { TodoModule } from './todo/todo.module';

  @Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRoot(process.env.MONGODB_URL as string, {
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('✅ MongoDB connected');
          });
          connection.on('error', (err : any) => {
            console.error('❌ MongoDB error:', err);
          });
          return connection;
        },
      }),
      TodoModule
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {
    constructor() {
    
    }
  }
