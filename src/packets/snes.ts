import { PACKET_TYPES } from "../constants";
import { encodeString, readString, readUint16, readUint64, readUint8, writeUint16, writeUint64, writeUint8 } from "../utils";
import { TASDPacket, buildBuffer } from "./utils";

export class SNESLatchFilterPacket implements TASDPacket {
  constructor(public time: number) {}
  get key() {
    return PACKET_TYPES.SNES_LATCH_FILTER;
  }
  get size() {
    return 2;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint16(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(2);
    writeUint16(this.time, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `SNESLatchFilter ${this.time}`;
  }
}

export class SNESClockFilterPacket implements TASDPacket {
  constructor(public time: number) {}
  get key() {
    return PACKET_TYPES.SNES_CLOCK_FILTER;
  }
  get size() {
    return 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(1);
    writeUint8(this.time, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `SNESClockFilter ${this.time}`;
  }
}

export class SNESGameGenieCodePacket implements TASDPacket {
  constructor(public code: string) {}
  get key() {
    return PACKET_TYPES.SNES_GAME_GENIE_CODE;
  }
  get size() {
    return this.code.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    return buildBuffer(g_keylen, this.key, encodeString(this.code));
  }
  toString(): string {
    return `SNESGameGenieCode ${this.code}`;
  }
}

export class SNESLatchTrainPacket implements TASDPacket {
  constructor(public trains: bigint[]) {}
  get key() {
    return PACKET_TYPES.SNES_LATCH_TRAIN;
  }
  get size() {
    return this.trains.length * 8;
  }
  static fromBuffer(buffer: Uint8Array) {
    const trains = [];
    for (let index = 0; index < buffer.length; index += 8) {
      trains.push(readUint64(buffer, index));
    }
    return new this(trains);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    let index = 0;
    for (const train of this.trains) {
      writeUint64(train, payload, index);
      index += 8;
    }
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `SNESLatchTrain ${this.trains.length}`;
  }
}
