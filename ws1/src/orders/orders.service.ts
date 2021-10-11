import { Injectable } from "@nestjs/common";

@Injectable()
export class OrdersService {
    public test(): string {
        return "test";
    }
}