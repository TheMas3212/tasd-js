import { PACKET_TYPES } from "../constants";
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
    return new InputChunkPacket(buffer[0], buffer.subarray(1));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(this.inputs.length + 1);
    payload[0] = this.port;
    payload.set(this.inputs, 1);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString() {
    return `InputChunk ${this.port}, ${this.size}`;
  }
}