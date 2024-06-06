export const enum SnmpObjectType {
  Boolean = 1,
  Integer = 2,
  BitString = 3,
  OctetString = 4,
  Null = 5,
  OID = 6,
  IpAddress = 64,
  Counter = 65,
  Gauge = 66,
  TimeTicks = 67,
  Opaque = 68,
  Counter64 = 70,
  NoSuchObject = 128,
  NoSuchInstance = 129,
  EndOfMibView = 130,
}

export interface Varbinds {
  oid: string;
  type: SnmpObjectType;
  value: Buffer | string | number | null;
}
