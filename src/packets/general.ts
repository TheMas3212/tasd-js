import { PACKET_TYPES } from "../constants";
import { TASD } from "../file";
import { encodeString, readString, readUint16, readUint32, readUint64, readUint8, writeString, writeUint16, writeUint32, writeUint64, writeUint8 } from "../utils";
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
    return new ConsoleTypePacket(buffer[0], readString(buffer, 1, buffer.length));
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
    return new ConsoleRegionPacket(buffer[0]);
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
    return new GameTitlePacket(readString(buffer, 0, buffer.length));
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
    return new ROMNamePacket(readString(buffer, 0, buffer.length));
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
    return new AttributionPacket(buffer[0], readString(buffer, 1, buffer.length));
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
    return new CategoryPacket(readString(buffer, 0, buffer.length));
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
    return new EmulatorNamePacket(readString(buffer, 0, buffer.length));
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
    return new EmulatorVersionPacket(readString(buffer, 0, buffer.length));
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
    return new EmulatorCorePacket(readString(buffer, 0, buffer.length));
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
    return new TASLastModifedPacket(readUint64(buffer, 0));
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
    return new DumpCreatedPacket(readUint64(buffer, 0));
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
    return new DumpLastModifiedPacket(readUint64(buffer, 0));
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
    return new TotalFramesPacket(readUint32(buffer, 0));
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
    return new RerecordsPacket(readUint32(buffer, 0));
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
    return new SourceLinkPacket(readString(buffer, 0, buffer.length));
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
    return new BlankFramesPacket(readUint16(buffer, 0));
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
    return new VerifiedPacket(readUint8(buffer, 0) !== 0);
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

export class MovieLicensePacket implements TASDPacket {
  constructor(public link: string) {}
  get key() {
    return PACKET_TYPES.MOVIE_LICENSE;
  }
  get size() {
    return this.link.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new MovieLicensePacket(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = encodeString(this.link);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `SourceLink ${this.link}`;
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
    return new PortControllerPacket(buffer[0], readUint16(buffer, 1));
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