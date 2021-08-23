import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({origin: ["https://mgr.restclick.vio.net.ua", "https://owner.restclick.vio.net.ua"]});
	await app.listen(3044);
}

bootstrap();
