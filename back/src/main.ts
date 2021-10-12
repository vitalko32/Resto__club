import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsedUrls = ["https://mgr.restclick.vio.net.ua", "https://owner.restclick.vio.net.ua", "https://restorator.restclick.vio.net.ua", "https://customer.restclick.vio.net.ua"];

async function bootstrap() {
	const app = await NestFactory.create(AppModule);	
	app.enableCors({origin: corsedUrls});
	await app.listen(3044);
}

bootstrap();
