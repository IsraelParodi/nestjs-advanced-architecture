import { Type } from '@nestjs/common';

export class EventClsRegistry {
  private static readonly eventClsMap = new Map<string, any>();

  static add(eventCls: Type): void {
    this.eventClsMap.set(eventCls.name, eventCls);
  }

  static get(eventClsName: string) {
    const eventCls = this.eventClsMap.get(eventClsName);

    if (!eventCls) {
      throw new Error(`Event cass "${eventClsName}" not registered`);
    }

    return eventCls;
  }
}
