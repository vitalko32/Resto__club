import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { FilesController } from "./files.controller";
import { jwtConstants } from "../../common/auth.constants";
import { CommonModule } from "src/common/common.module";

@Module({
    imports: [        
        JwtModule.register(jwtConstants),
        CommonModule,
    ],    
    controllers: [FilesController],
    providers: [],
})
export class FilesModule {}
