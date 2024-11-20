import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/handlers/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarm.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created-event-handler';
import { AcknowledgeAlarmCommandHandler } from './commands/handlers/acknowledge-alarm.command-handler copy';
import { AlarmAcknowledgeEventHandler } from './event-handlers/alarm-acknowledged-event-handler';
import { CascadingAlarmsSaga } from './sagas/cascading-alarms.saga';
import { NotifiyFacilitySupervisorCommandHandler } from './commands/handlers/notify-facility-supervisor.command-handler';
import { UnacknowledgedAlarmsSaga } from './sagas/unacknowledged-alarms.saga';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgeEventHandler,
    CascadingAlarmsSaga,
    NotifiyFacilitySupervisorCommandHandler,
    UnacknowledgedAlarmsSaga,
  ],
})
export class AlarmsModule {
  static withInfrastucture(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
