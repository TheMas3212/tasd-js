import { PACKET_TYPES } from "../constants";
import {
  encodeString, readString, writeString, readBoolean, writeBoolean,
  readUint8, writeUint8, readUint16, writeUint16,
  readUint32, writeUint32, readUint64, writeUint64
} from "../utils";
import { TASDPacket, buildBuffer } from "./utils";

export class ConsoleTypePacket implements TASDPacket {
  constructor(public type: number, public name: string) {}
  get key() {
    return PACKET_TYPES.CONSOLE_TYPE;
  }
  get size() {
    return this.name.length + 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0), readString(buffer, 1, buffer.length - 1));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.name.length + 1);
    writeUint8(this.type, payload, 0);
    writeString(this.name, payload, 1);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `ConsoleType ${this.type}, ${this.name}`;
  }
}

export class ConsoleRegionPacket implements TASDPacket {
  constructor(public region: number) {}
  get key() {
    return PACKET_TYPES.CONSOLE_REGION;
  }
  get size() {
    return 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(1);
    writeUint8(this.region, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `ConsoleRegion ${this.region}`;
  }
}

export class GameTitlePacket implements TASDPacket {
  constructor(public title: string) {}
  get key() {
    return PACKET_TYPES.GAME_TITLE;
  }
  get size() {
    return this.title.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.title);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `GameTitle ${this.title}`;
  }
}

export class ROMNamePacket implements TASDPacket {
  constructor(public name: string) {}
  get key() {
    return PACKET_TYPES.ROM_NAME;
  }
  get size() {
    return this.name.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.name);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `RomName ${this.name}`;
  }
}

export class AttributionPacket implements TASDPacket {
  constructor(public type: number, public name: string) {}
  get key() {
    return PACKET_TYPES.ATTRIBUTION;
  }
  get size() {
    return this.name.length + 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0), readString(buffer, 1, buffer.length - 1));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.name.length + 1);
    writeUint8(this.type, payload, 0);
    writeString(this.name, payload, 1);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `Attribution ${this.type}, ${this.name}`;
  }
}

export class CategoryPacket implements TASDPacket {
  constructor(public name: string) {}
  get key() {
    return PACKET_TYPES.CATEGORY;
  }
  get size() {
    return this.name.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.name);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `Category ${this.name}`;
  }
}

export class EmulatorNamePacket implements TASDPacket {
  constructor(public name: string) {}
  get key() {
    return PACKET_TYPES.EMULATOR_NAME;
  }
  get size() {
    return this.name.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.name);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `EmulatorName ${this.name}`;
  }
}

export class EmulatorVersionPacket implements TASDPacket {
  constructor(public version: string) {}
  get key() {
    return PACKET_TYPES.EMULATOR_VERSION;
  }
  get size() {
    return this.version.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.version);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `EmulatorVersion ${this.version}`;
  }
}

export class EmulatorCorePacket implements TASDPacket {
  constructor(public core: string) {}
  get key() {
    return PACKET_TYPES.EMULATOR_CORE;
  }
  get size() {
    return this.core.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.core);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `EmulatorCore ${this.core}`;
  }
}

export class TASLastModifedPacket implements TASDPacket {
  constructor(public timestamp: bigint) {}
  get key() {
    return PACKET_TYPES.TAS_LAST_MODIFIED;
  }
  get size() {
    return 8;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint64(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(8);
    writeUint64(this.timestamp, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `TASLastModified ${new Date(Number(this.timestamp * 1000n)).toUTCString()}`;
  }
}

export class DumpCreatedPacket implements TASDPacket {
  constructor(public timestamp: bigint) {}
  get key() {
    return PACKET_TYPES.DUMP_CREATED;
  }
  get size() {
    return 8;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint64(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(8);
    writeUint64(this.timestamp, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `DumpCreated ${new Date(Number(this.timestamp * 1000n)).toUTCString()}`;
  }
}

export class DumpLastModifiedPacket implements TASDPacket {
  constructor(public timestamp: bigint) {}
  get key() {
    return PACKET_TYPES.DUMP_LAST_MODIFIED;
  }
  get size() {
    return 8;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint64(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(8);
    writeUint64(this.timestamp, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `DumpLastModified ${new Date(Number(this.timestamp * 1000n)).toUTCString()}`;
  }
}

export class TotalFramesPacket implements TASDPacket {
  constructor(public frames: number) {}
  get key() {
    return PACKET_TYPES.TOTAL_FRAMES;
  }
  get size() {
    return 4;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint32(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(4);
    writeUint32(this.frames, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `TotalFrames ${this.frames}`;
  }
}

export class RerecordsPacket implements TASDPacket {
  constructor(public rerecords: number) {}
  get key() {
    return PACKET_TYPES.RERECORDS;
  }
  get size() {
    return 4;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint32(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(4);
    writeUint32(this.rerecords, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `Rerecords ${this.rerecords}`;
  }
}

export class SourceLinkPacket implements TASDPacket {
  constructor(public link: string) {}
  get key() {
    return PACKET_TYPES.SOURCE_LINK;
  }
  get size() {
    return this.link.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.link);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `SourceLink ${this.link}`;
  }
}

export class BlankFramesPacket implements TASDPacket {
  constructor(public frames: number) {}
  get key() {
    return PACKET_TYPES.BLANK_FRAMES;
  }
  get size() {
    return 2;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint16(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(2);
    writeUint16(this.frames, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `BlankFrames ${this.frames}`;
  }
}

export class VerifiedPacket implements TASDPacket {
  constructor(public verified: boolean) {}
  get key() {
    return PACKET_TYPES.VERIFIED;
  }
  get size() {
    return 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0) !== 0);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(2);
    writeUint8(this.verified ? 1 : 0, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `Verified ${this.verified}`;
  }
}

export class MemoryInitPacket implements TASDPacket {
  constructor(
    public datatype: number,
    public device: number,
    public required: boolean,
    public name: string,
    public data: Uint8Array
  ) {}
  get key() {
    return PACKET_TYPES.MEMORY_INIT;
  }
  get size() {
    return 5 + this.name.length + this.data.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    const datatype = readUint8(buffer, 0);
    const device = readUint16(buffer, 1);
    const required = readBoolean(buffer, 3);
    const nlen = readUint8(buffer, 4);
    let index = 5;
    const name = readString(buffer, index, nlen);
    index += nlen;
    const data = buffer.subarray(index);
    return new this(datatype, device, required, name, data);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    writeUint8(this.datatype, payload, 0);
    writeUint16(this.device, payload, 1);
    writeBoolean(this.required, payload, 3);
    writeUint8(this.name.length, payload, 4);
    writeString(this.name, payload, 5);
    payload.set(this.data, 5+this.name.length);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `MemoryInit ${this.datatype}, ${this.device}, ${this.required}, ${this.name}, ${this.data.length}`;
  }
}

export class GameIdentiferPacket implements TASDPacket {
  constructor(public type: number, public base: number, public identifier: Uint8Array) {}
  get key() {
    return PACKET_TYPES.GAME_IDENTIFIER;
  }
  get size() {
    return 2 + this.identifier.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0), readUint8(buffer, 1), buffer.subarray(2));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    writeUint8(this.type, payload, 0);
    writeUint8(this.base, payload, 1);
    payload.set(this.identifier, 2);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `GameIdentifier ${this.type}, ${this.base}, ${this.identifier}`;
  }
}

export class MovieLicensePacket implements TASDPacket {
  constructor(public link: string) {}
  get key() {
    return PACKET_TYPES.MOVIE_LICENSE;
  }
  get size() {
    return this.link.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.link);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `SourceLink ${this.link}`;
  }
}

export class MovieFilePacket implements TASDPacket {
  constructor(public name: string, public data: Uint8Array) {}
  get key() {
    return PACKET_TYPES.MOVIE_FILE;
  }
  get size() {
    return 1 + this.name.length + this.data.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    const nlen = readUint8(buffer, 0);
    const name = readString(buffer, 1, nlen);
    const data = buffer.subarray(nlen+1);
    return new this(name, data);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    writeUint8(this.name.length, payload, 0);
    writeString(this.name, payload, 1);
    payload.set(this.data, 1 + this.name.length);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `MovieFile ${this.name}, ${this.data.length}`;
  }
}

export class PortControllerPacket implements TASDPacket {
  constructor(public port: number, public type: number) {}
  get key() {
    return PACKET_TYPES.PORT_CONTROLLER;
  }
  get size() {
    return 3;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0), readUint16(buffer, 1));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(3);
    writeUint8(this.port, payload, 0);
    writeUint16(this.type, payload, 1);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `PortController ${this.port}, 0x${this.type.toString(16).padStart(4, '0')}`;
  }
}

export class PortOverreadPacket implements TASDPacket {
  constructor(public port: number, public high: boolean) {}
  get key() {
    return PACKET_TYPES.PORT_OVERREAD;
  }
  get size() {
    return 2;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0), readBoolean(buffer, 1));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(2);
    writeUint8(this.port, payload, 0);
    writeBoolean(this.high, payload, 1);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `PortOverreadPacket ${this.port}, ${this.high}`;
  }
}
