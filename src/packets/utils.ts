import { packetName } from "../constants";
import { minUInt, writeUintN, writeUint8 } from "../utils";

export interface TASDPacket {
  key: number;
  size: number;
  toBuffer(g_keylen: number): Uint8Array;
  toString(): string;
}

export function buildBuffer(g_keylen: number, key: number, payload: Uint8Array) {
  const plen = payload.length;
  const pexp = minUInt(plen);
  const buffer = new Uint8Array(g_keylen + 1 + pexp + plen);
  let index = 0;
  writeUintN(key, buffer, index, g_keylen);
  index += g_keylen;
  writeUint8(pexp, buffer, index);
  index += 1;
  writeUintN(plen, buffer, index, pexp);
  index += pexp;
  buffer.set(payload, index);
  return buffer;
}

export class UnknownPacket implements TASDPacket {
  constructor(public key: number, public payload: Uint8Array) {}
  get size() {
    return this.payload.length;
  }
  toBuffer(g_keylen: number) {
    return buildBuffer(g_keylen, this.key, this.payload);
  }
  toString() {
    return `UnknownPacket ${packetName(this.key)}, ${this.size}`;
  }
}