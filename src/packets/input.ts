import { PACKET_TYPES } from "../constants";
import { readUint32, readUint64, readUint8, writeUint32, writeUint64, writeUint8 } from "../utils";
import { TASDPacket, buildBuffer } from "./utils";

export class InputChunkPacket implements TASDPacket {
  constructor(public port: number, public inputs: Uint8Array) {}
  get key() {
    return PACKET_TYPES.INPUT_CHUNK;
  }
  get size() {
    return this.inputs.length + 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readUint8(buffer, 0), buffer.subarray(1));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.inputs.length + 1);
    writeUint8(this.port, payload, 0);
    payload.set(this.inputs, 1);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `InputChunk ${this.port}, ${this.size}`;
  }
}

export class InputMomentPacket implements TASDPacket {
  constructor(public port: number, public indexType: number, public index: bigint, public inputs: Uint8Array) {}
  get key() {
    return PACKET_TYPES.INPUT_MOMENT;
  }
  get size() {
    return 10 + this.inputs.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    const port = readUint8(buffer, 0);
    const indexType = readUint8(buffer, 1);
    const index = readUint64(buffer, 2);
    const inputs = buffer.subarray(10);
    return new this(port, indexType, index, inputs);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    writeUint8(this.port, payload, 0);
    writeUint8(this.indexType, payload, 1);
    writeUint64(this.index, payload, 2);
    payload.set(this.inputs, 10);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `InputMoment ${this.port}, ${this.indexType}, ${this.index}, ${this.inputs.length}`;
  }
}

export class TransitionPacket implements TASDPacket {
  constructor(public indexType: number, public index: bigint, public type: number, public data: Uint8Array) {}
  get key() {
    return PACKET_TYPES.TRANSITION;
  }
  get size() {
    return 10 + this.data.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    const indexType = readUint8(buffer, 0);
    const index = readUint64(buffer, 1);
    const type = readUint8(buffer, 9);
    const data = buffer.subarray(10);
    return new this(indexType, index, type, data);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    writeUint8(this.indexType, payload, 0);
    writeUint64(this.index, payload, 1);
    writeUint8(this.type, payload, 9);
    payload.set(this.data, 10);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `Transition ${this.indexType}, ${this.index}, ${this.type}, ${this.data.length}`;
  }
}

export class LagFrameChunkPacket implements TASDPacket {
  constructor(public frame: number, public count: number) {}
  get key() {
    return PACKET_TYPES.LAG_FRAME_CHUNK;
  }
  get size() {
    return 8;
  }
  static fromBuffer(buffer: Uint8Array) {
    const frame = readUint32(buffer, 0);
    const count = readUint32(buffer, 4);
    return new this(frame, count);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    writeUint32(this.frame, payload, 0);
    writeUint32(this.count, payload, 4);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `LagFrameChunk ${this.frame}, ${this.count}`;
  }
}

export class MovieTransitionPacket implements TASDPacket {
  constructor(public frame: number, public type: number, public data: Uint8Array) {}
  get key() {
    return PACKET_TYPES.MOVIE_TRANSITION;
  }
  get size() {
    return 5 + this.data.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    const frame = readUint32(buffer, 0);
    const type = readUint8(buffer, 4);
    const data = buffer.subarray(5);
    return new this(frame, type, data);
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.size);
    writeUint32(this.frame, payload, 0);
    writeUint8(this.type, payload, 4);
    payload.set(this.data, 5);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `MovieTransition ${this.frame}, ${this.type}, ${this.data.length}`;
  }
}