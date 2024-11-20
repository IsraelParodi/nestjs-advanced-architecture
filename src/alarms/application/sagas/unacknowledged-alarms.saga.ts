import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import {
  EMPTY,
  filter,
  first,
  map,
  mergeMap,
  Observable,
  race,
  timer,
} from 'rxjs';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { AlarmAcknowledgeEvent } from 'src/alarms/domain/events/alarm-acknowledge.event';
import { NotifiyFacilitySupervisorCommand } from '../commands/notify-facility-supervisor.command';

@Injectable()
export class UnacknowledgedAlarmsSaga {
  private readonly logger = new Logger(UnacknowledgedAlarmsSaga.name);

  @Saga()
  start = (events$: Observable<any>): Observable<ICommand> => {
    const alarmAcknowledgeEvents$ = events$.pipe(ofType(AlarmAcknowledgeEvent));

    const alarmCreatedEvents$ = events$.pipe(ofType(AlarmCreatedEvent));

    return alarmCreatedEvents$.pipe(
      mergeMap((alarmCreatedEvent) =>
        race(
          alarmAcknowledgeEvents$.pipe(
            filter(
              (alarmAcknowledgeEvent) =>
                alarmAcknowledgeEvent.alarmId === alarmCreatedEvent.alarm.id,
            ),
            first(),
            mergeMap(() => EMPTY),
          ),
          timer(15000).pipe(map(() => alarmCreatedEvent)),
        ),
      ),
      map((alarmCreatedEvent) => {
        this.logger.debug(
          `⚠️⚠️⚠️ Alarm "${alarmCreatedEvent.alarm.name}" not acknowledged in 15 seconds!`,
        );

        const facilityId = '12345';
        return new NotifiyFacilitySupervisorCommand(facilityId, [
          alarmCreatedEvent.alarm.id,
        ]);
      }),
    );
  };
}
