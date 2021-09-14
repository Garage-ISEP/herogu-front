export abstract class BaseModel {
  constructor(data: any) {
    Object.assign(this, data);
  }
}