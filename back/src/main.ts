import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);	
	// чтобы разрешить запросы от серии субдоменов, используем процедурный вызов enableCors вместо "классического" app.enableCors({origin: ["https://mgr.restclick.vio.net.ua", "https://owner.restclick.vio.net.ua"]});
	app.enableCors((req, callback) => {
		let corsOptions = req.header('Origin')?.includes("restclick.vio.net.ua") ? {origin: true} : {origin: false};
		callback(null, corsOptions);
	});
	await app.listen(3044);
}

bootstrap();
