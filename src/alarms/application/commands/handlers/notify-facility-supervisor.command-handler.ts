import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotifiyFacilitySupervisorCommand } from '../notify-facility-supervisor.command';
import { Logger } from '@nestjs/common';

@CommandHandler(NotifiyFacilitySupervisorCommand)
export class NotifiyFacilitySupervisorCommandHandler
  implements ICommandHandler<NotifiyFacilitySupervisorCommand>
{
  private readonly logger = new Logger(
    NotifiyFacilitySupervisorCommandHandler.name,
  );

  async execute(command: NotifiyFacilitySupervisorCommand) {
    this.logger.debug(
      `Processing "NotifyFacilitySupervisorCommand": ${JSON.stringify(command)}`,
    );
  }
}
