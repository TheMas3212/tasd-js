import { PACKET_TYPES } from "../constants";
import { encodeString, readBoolean, readString, readUint16, readUint8, writeBoolean, writeUint16, writeUint8 } from "../utils";
import { TASDPacket, buildBuffer } from "./utils";

export class NESLatchFilterPacket implements TASDPacket {
  constructor(public time: number) {}
  get key() {
    return PACKET_TYPES.NES_LATCH_FILTER;
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
    return `NESLatchFilter ${this.time}`;
  }
}

export class NESClockFilterPacket implements TASDPacket {
  constructor(public time: number) {}
  get key() {
    return PACKET_TYPES.NES_CLOCK_FILTER;
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
    return `NESClockFilter ${this.time}`;
  }
}

export class NESOverreadPacket implements TASDPacket {
  constructor(public high: boolean) {}
  get key() {
    return PACKET_TYPES.NES_OVERREAD;
  }
  get size() {
    return 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readBoolean(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(1);
    writeBoolean(this.high, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `NESOverread ${this.high}`;
  }
}

export class NESGameGenieCodePacket implements TASDPacket {
  constructor(public code: string) {}
  get key() {
    return PACKET_TYPES.NES_GAME_GENIE_CODE;
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
    return `NESGameGenieCode ${this.code}`;
  }
}