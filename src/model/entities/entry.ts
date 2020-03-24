import { Activity } from "./activity";

export class Entry {
  public date: Date;
  constructor(
    public id: string,
    public activity: Activity,
    public timestamp: number,
    public amount: number
  ) {
    this.date = new Date(timestamp);
  }
}
