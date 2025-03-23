import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { LogsEntity } from '../../data/entities/Logs.entity';

@Injectable()
export class LogService {
    constructor(@InjectRepository(LogsEntity, 'sqliteConnection') private logRepository: Repository<LogsEntity>,) {}

    async createLog(type: 'DB' | 'HTTP' | 'ERR', message: string, input: string, output: string, url: string, method: string): Promise<LogsEntity> {
        const log    = new LogsEntity();
        log.type     = type;
        log.message  = message;
        log.input    = input;
        log.output   = output;
        log.url      = url;
        log.method   = method;
        return this.logRepository.save(log);
    }
}
