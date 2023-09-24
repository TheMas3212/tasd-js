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