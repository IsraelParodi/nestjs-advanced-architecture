export class NotifiyFacilitySupervisorCommand {
  constructor(
    public readonly facilityId: string,
    public readonly alarmIds: string[],
  ) {}
}
