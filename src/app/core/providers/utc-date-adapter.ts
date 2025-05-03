import {DateAdapter, NativeDateAdapter} from "@angular/material/core";
import {Injectable, Provider} from "@angular/core";

@Injectable()
export class UTCDateAdapter extends NativeDateAdapter {
  override toIso8601(date: Date): string {
    return date.toISOString(); // Force UTC
  }

  override createDate(year: number, month: number, date: number): Date {
    return new Date(Date.UTC(year, month, date)); // UTC date creation
  }
}

export const UTCDateAdapterProvider: Provider = {
  provide: DateAdapter,
  useClass: UTCDateAdapter
};
