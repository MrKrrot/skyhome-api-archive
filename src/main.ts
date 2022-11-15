import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'dotenv/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
        .setTitle('SkyHome API')
        .setDescription('The Official SkyHome API')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('/', app, document)
    await app.listen(process.env.PORT || 5000)
}
bootstrap()
