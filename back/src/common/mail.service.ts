import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as Nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

import { Setting } from "src/model/orm/setting.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { MailtemplateTranslation } from "src/model/orm/mailtemplate.translation.entity";
import { IMailtemplateData } from "src/model/mailtemplatedata.interface";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { Word } from "src/model/orm/word.entity";
import { APIService } from "./api.service";
import { Lang } from "src/model/orm/lang.entity";

@Injectable()
export class MailService extends APIService {
    constructor(
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        @InjectRepository(Mailtemplate) private mailtemplateRepository: Repository<Mailtemplate>,
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        @InjectRepository(Word) private wordRepository: Repository<Word>,
    ) {
        super();
    }
    
    /*public async mailCustomerCreatedWithGoogle(lang_id: number, email: string): Promise<void> {
        try {
            const staticUrl: string = (await this.settingRepository.findOne({where: {p: "static-url"}}))?.v;
            const mtd: IMailtemplateData = await this.getMailtemplateData("customer-created-with-google", lang_id);                
            const subject: string = mtd.subject;
            const content: string = mtd.content
                .replace(/{{staticUrl}}/g, staticUrl)    
                .replace(/{{email}}/g, email);            
            await this.send(email, subject, content);               
        } catch (err) {
            console.log(`Error in MailService.mailCustomerCreatedWithGoogle: ${String(err)}`);            
        }
    }

    public async mailCustomerCreatedWithEmail(lang_id: number, email: string, password: string): Promise<void> {
        try {
            const staticUrl: string = (await this.settingRepository.findOne({where: {p: "static-url"}}))?.v;
            const mtd: IMailtemplateData = await this.getMailtemplateData("customer-created-with-email", lang_id);               
            const subject: string = mtd.subject;
            const content: string = mtd.content
                .replace(/{{staticUrl}}/g, staticUrl)        
                .replace(/{{email}}/g, email)
                .replace(/{{password}}/g, password);                
            await this.send(email, subject, content);               
        } catch (err) {
            console.log(`Error in MailService.mailCustomerCreatedWithEmail: ${String(err)}`);            
        }
    }

    public async mailCustomerVerifyEmail(lang_id: number, email: string, code: string): Promise<void> {
        try {
            const staticUrl: string = (await this.settingRepository.findOne({where: {p: "static-url"}}))?.v;
            const mtd: IMailtemplateData = await this.getMailtemplateData("customer-email-verification", lang_id);   
            const subject: string = mtd.subject;
            const content: string = mtd.content
                .replace(/{{staticUrl}}/g, staticUrl)        
                .replace(/{{code}}/g, code);
            await this.send(email, subject, content);
        } catch (err) {
            console.log(`Error in MailService.mailCustomerVerifyEmail: ${String(err)}`); 
        }
    }

    public async mailCustomerPasswordRecovery(lang_id: number, email: string, password: string): Promise<void> {
        try {
            const staticUrl: string = (await this.settingRepository.findOne({where: {p: "static-url"}}))?.v;
            const mtd: IMailtemplateData = await this.getMailtemplateData("customer-password-recovery", lang_id);               
            const subject: string = mtd.subject;
            const content: string = mtd.content            
                .replace(/{{staticUrl}}/g, staticUrl)           
                .replace(/{{password}}/g, password);
            await this.send(email, subject, content);   
        } catch (err) {
            console.log(`Error in MailService.mailCustomerPasswordRecovery: ${String(err)}`);            
        }
    }

    
    public async mailShopPasswordChanged(lang_id: number, email: string, password: string): Promise<void> {
        try {
            const mtd: IMailtemplateData = await this.getMailtemplateData("shop-password-changed", lang_id);               
            const subject: string = mtd.subject;
            const content: string = mtd.content            
                .replace(/{{password}}/g, password);
            await this.send(email, subject, content);   
        } catch (err) {
            console.log(`Error in MailService.mailShopPasswordChanged: ${String(err)}`);            
        }
    }
    

    public async mailOrderCreatedForOwner(customer: Customer, order: Order, lang: Lang): Promise<void> {
        try {            
            const staticUrl: string = (await this.settingRepository.findOne({where: {p: "static-url"}}))?.v;
            const shopEmail: string = (await this.settingRepository.findOne({where: {p: "shop-email"}}))?.v;
            const wordbook_id: number = (await this.wordbookRepository.findOne({where: {name: "common"}}))?.id;
            const wordCode: string = wordbook_id ? (await this.wordRepository.findOne({where: {wordbook_id, mark: "code"}, relations: ["translations"]}))?.translations.find(t => t.lang_id === lang.id)?.text : null;
            const wordPrice: string = wordbook_id ? (await this.wordRepository.findOne({where: {wordbook_id, mark: "price"}, relations: ["translations"]}))?.translations.find(t => t.lang_id === lang.id)?.text : null;
            const wordQty: string = wordbook_id ? (await this.wordRepository.findOne({where: {wordbook_id, mark: "qty"}, relations: ["translations"]}))?.translations.find(t => t.lang_id === lang.id)?.text : null;

            if (!staticUrl || !shopEmail || !wordCode || !wordPrice || !wordQty ) {
                return;
            }

            const mtd: IMailtemplateData = await this.getMailtemplateData("order-created-owner", lang.id);   
            const subject: string = mtd.subject;
            const content: string = mtd.content    
                .replace(/{{staticUrl}}/g, staticUrl)  
                .replace(/{{order.id}}/g, order.id.toString())
                .replace(/{{order.created_at}}/g, this.beautifulDatetime(order.created_at, lang.slug))    
                .replace(/{{customer.email}}/g, customer.email)
                .replace(/{{order.firstname}}/g, order.firstname)
                .replace(/{{order.lastname}}/g, order.lastname)
                .replace(/{{order.phone}}/g, order.phone)                
                .replace(/{{order.country}}/g, order.country)
                .replace(/{{order.region}}/g, order.region)
                .replace(/{{order.city}}/g, order.city)
                .replace(/{{order.zip}}/g, order.zip)
                .replace(/{{order.address}}/g, order.address)                
                .replace(/{{order.records}}/g, order.records.map(r => this.orderRecordToEmail(r, staticUrl, "USD", wordCode, wordPrice, wordQty)).join(""))
                .replace(/{{order.total}}/g, `${order.records.map(r => r.q * r.price).reduce((acc, x) => acc + x)} USD`);
            await this.send(shopEmail, subject, content);   
        } catch (err) {
            console.log(`Error in MailService.mailOrderCreatedForOwner: ${String(err)}`); 
        }
    }

    public async mailOrderCreatedForCustomer(customer: Customer, order: Order): Promise<void> {
        try {            
            const staticUrl: string = (await this.settingRepository.findOne({where: {p: "static-url"}}))?.v;            
            const wordbook_id: number = (await this.wordbookRepository.findOne({where: {name: "common"}}))?.id;
            const wordCode: string = wordbook_id ? (await this.wordRepository.findOne({where: {wordbook_id, mark: "code"}, relations: ["translations"]}))?.translations.find(t => t.lang_id === customer.lang_id)?.text : null;
            const wordPrice: string = wordbook_id ? (await this.wordRepository.findOne({where: {wordbook_id, mark: "price"}, relations: ["translations"]}))?.translations.find(t => t.lang_id === customer.lang_id)?.text : null;
            const wordQty: string = wordbook_id ? (await this.wordRepository.findOne({where: {wordbook_id, mark: "qty"}, relations: ["translations"]}))?.translations.find(t => t.lang_id === customer.lang_id)?.text : null;

            if (!staticUrl || !wordCode || !wordPrice || !wordQty ) {
                return;
            }

            const mtd: IMailtemplateData = await this.getMailtemplateData("order-created-customer", customer.lang_id);   
            const subject: string = mtd.subject;
            const content: string = mtd.content    
                .replace(/{{staticUrl}}/g, staticUrl)  
                .replace(/{{order.id}}/g, order.id.toString())
                .replace(/{{order.created_at}}/g, this.beautifulDatetime(order.created_at, customer.lang.slug))    
                .replace(/{{customer.email}}/g, customer.email)
                .replace(/{{order.firstname}}/g, order.firstname)
                .replace(/{{order.lastname}}/g, order.lastname)
                .replace(/{{order.phone}}/g, order.phone)                
                .replace(/{{order.country}}/g, order.country)
                .replace(/{{order.region}}/g, order.region)
                .replace(/{{order.city}}/g, order.city)
                .replace(/{{order.zip}}/g, order.zip)
                .replace(/{{order.address}}/g, order.address)                
                .replace(/{{order.records}}/g, order.records.map(r => this.orderRecordToEmail(r, staticUrl, "USD", wordCode, wordPrice, wordQty)).join(""))
                .replace(/{{order.total}}/g, `${order.records.map(r => r.q * r.price).reduce((acc, x) => acc + x)} USD`);                
            await this.send(customer.email, subject, content);   
        } catch (err) {
            console.log(`Error in MailService.mailOrderCreatedForOwner: ${String(err)}`); 
        }
    }    */

    public async mailTest(): Promise<void> {
        try {  
            const mtd: IMailtemplateData = await this.getMailtemplateData("test", 1);   
            const subject: string = mtd.subject;
            const content: string = mtd.content;
            await this.send("7573497@gmail.com", subject, content);   
        } catch (err) {
            console.log(`Error in MailService.mailTest: ${String(err)}`); 
        }
    }    

    private getMailtemplateData(name: string, lang_id: number): Promise<IMailtemplateData> {
        return new Promise(async (resolve, reject) => {
            try {
                let mt: Mailtemplate = await this.mailtemplateRepository.findOne({where: {name}, relations: ["translations"]});

                if (!mt) {
                    reject("mailtemplate not found");
                } else {
                    const t: MailtemplateTranslation = mt.translations.find(t => t.lang_id === lang_id);
                    resolve({subject: t.subject, content: t.content});
                }
            } catch (err) {
                reject(String(err));
            }
        });
    }
    
    public send(to: string, subject: string, html: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const host: string = (await this.settingRepository.findOne({where: {p: "smtp-host"}}))?.v;                
                const port: string = (await this.settingRepository.findOne({where: {p: "smtp-port"}}))?.v;                
                const from: string = (await this.settingRepository.findOne({where: {p: "smtp-login"}}))?.v;                
                const pw: string = (await this.settingRepository.findOne({where: {p: "smtp-pw"}}))?.v;
    
                if (!host || !port || !from || !pw) {  
                    console.log(`Error in MailService.send: some setting not found`);              
                    reject("some setting not found");
                }                     
                
                const transporter: Mail = Nodemailer.createTransport({host, port: parseInt(port), secure: false, auth: {user: from, pass: pw}});
                const mailOptions: MailOptions = {from, to, subject, html};
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(`Error in MailService.send: ${String(error)}`);     
                        reject(String(error));
                    } else {
                        console.log(`Email sent: ${new Date()}, ${info.response}`);
                        resolve();
                    }
                });
            } catch (err) {
                console.log(`Error in MailService.send: ${String(err)}`);     
                reject(String(err));
            }            
        });
    }    
}