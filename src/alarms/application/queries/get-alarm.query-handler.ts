import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetAlarmsQuery } from './get-alarm.query';
import { FindAlarmsRepository } from '../ports/find-alarms.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  private readonly logger = new Logger(GetAlarmsQueryHandler.name);

  constructor(private readonly alarmRepository: FindAlarmsRepository) {}

  async execute(command: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    this.logger.debug(
      `Processing "GetAlarmsQueryHandler": ${JSON.stringify(command)}`,
    );
    return this.alarmRepository.findAll();
  }
}
