import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import metadata from "@/utils/metadata";
import * as request from 'supertest';

describe('AppController', () => {
    let app: INestApplication;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [AppService],
        }).compile();
    
        app = module.createNestApplication();
        await app.init();
    });
    
    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect(metadata.description)        
    })
})