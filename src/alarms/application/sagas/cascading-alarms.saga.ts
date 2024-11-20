import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { bufferTime, filter, groupBy, map, mergeMap, Observable } from 'rxjs';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';
import { NotifiyFacilitySupervisorCommand } from '../commands/notify-facility-supervisor.command';

@Injectable()
export class CascadingAlarmsSaga {
  private readonly logger = new Logger(CascadingAlarmsSaga.name);

  @Saga()
  start = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AlarmCreatedEvent),
      groupBy((event) => event.alarm.name),
      mergeMap((groupedEvents$) =>
        groupedEvents$.pipe(bufferTime(5000, undefined, 3)),
      ),
      filter((events) => events.length >= 3),
      map((events) => {
        this.logger.debug('⚠️⚠️⚠️ 3 alarms in 5 seconds!');
        const facilityId = '12345';

        return new NotifiyFacilitySupervisorCommand(
          facilityId,
          events.map((event) => event.alarm.id),
        );
      }),
    );
  };
}
