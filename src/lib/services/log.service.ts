import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { Logs } from '../../data/entities/Logs';

@Injectable()
export class LogService {
    constructor(@InjectRepository(Logs, 'sqliteConnection') private logRepository: Repository<Logs>,) {}

    async createLog(type: 'DB' | 'HTTP' | 'ERR', message: string, input: string, output: string, url: string, method: string): Promise<Logs> {
        const log    = new Logs();
        log.type     = type;
        log.message  = message;
        log.input    = input;
        log.output   = output;
        log.url      = url;
        log.method   = method;
        return this.logRepository.save(log);
    }
}
