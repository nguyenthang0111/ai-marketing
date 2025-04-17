import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './config/database/config.module';
import { DataSource } from 'typeorm';
import { BotSocialModule } from './models/bot-social/bot-social.module';
import { BotWebModule } from './models/bot-web/bot-web.module';
import { CreditCodeModule } from './models/credit-code/credit-code.module';
import { WorkspaceModule } from './models/workspace/workspace.module';
import { WorkspaceLogModule } from './models/workspace-log/workspace-log.module';
import { WorkspaceMemberModule } from './models/workspace-member/workspace-member.module';
import { ProductModule } from './models/product/product.module';
import { BrandModule } from './models/brand/brand.module';
import { UserModule } from './models/user/user.module';
import { ChatbotModule } from './models/chatbot/chatbot.module';
import { DocumentModule } from './models/document/document.module';
import { ProjectModule } from './models/project/project.module';
import { GeminiModule } from './providers/llm/gemini.module';
import { MemberBotUsageModule } from './models/member-bot-usage/member-bot-usage.module';
import { DatabaseModule } from './providers/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import LogsMiddleware from './common/middlewares/logs.middleware';
@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    DatabaseConfigModule,
    DatabaseModule,
    ProductModule,
    BrandModule,
    UserModule,
    BotSocialModule,
    BotWebModule,
    ChatbotModule,
    DocumentModule,
    CreditCodeModule,
    ProjectModule,
    WorkspaceModule,
    WorkspaceLogModule,
    WorkspaceMemberModule,
    GeminiModule,
    MemberBotUsageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log(
      this.dataSource.isInitialized
        ? 'Database is connected'
        : 'Database is not connected',
    );
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
