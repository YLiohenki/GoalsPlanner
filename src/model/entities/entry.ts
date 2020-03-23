import { Activity } from "./activity";

export class Entry {
  constructor(
    public id: string,
    public activity: Activity,
    public date: number,
    public amount: number
  ) {}
}
