import { PACKET_TYPES } from "../constants";
import { encodeString, readString } from "../utils";
import { TASDPacket, buildBuffer } from "./utils";

export class GenesisGameGenieCodePacket implements TASDPacket {
  constructor(public code: string) {}
  get key() {
    return PACKET_TYPES.GENESIS_GAME_GENIE_CODE;
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
    return `GenesisGameGenieCode ${this.code}`;
  }
}