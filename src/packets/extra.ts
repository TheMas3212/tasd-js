import { PACKET_TYPES } from "../constants";
import { encodeString, readBoolean, readString, writeBoolean } from "../utils";
import { TASDPacket, buildBuffer } from "./utils";

export class CommentPacket implements TASDPacket {
  constructor(public comment: string) {}
  get key() {
    return PACKET_TYPES.COMMENT;
  }
  get size() {
    return this.comment.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readString(buffer, 0, buffer.length));
  }
  toBuffer(g_keylen: number): Uint8Array {
    return buildBuffer(g_keylen, this.key, encodeString(this.comment));
  }
  toString(): string {
    return `Comment ${this.comment}`;
  }
}

export class ExperimentalPacket implements TASDPacket {
  constructor(public experimental: boolean) {}
  get key() {
    return PACKET_TYPES.EXPERIMENTAL;
  }
  get size() {
    return 1;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(readBoolean(buffer, 0));
  }
  toBuffer(g_keylen: number): Uint8Array {
    const payload = new Uint8Array(1);
    writeBoolean(this.experimental, payload, 0);
    return buildBuffer(g_keylen, this.key, payload);
  }
  toString(): string {
    return `Experimental ${this.experimental}`;
  }
}

export class UnspecifiedPacket implements TASDPacket {
  constructor(public data: Uint8Array) {}
  get key() {
    return PACKET_TYPES.UNSPECIFIED;
  }
  get size() {
    return this.data.length;
  }
  static fromBuffer(buffer: Uint8Array) {
    return new this(buffer);
  }
  toBuffer(g_keylen: number): Uint8Array {
    return buildBuffer(g_keylen, this.key, this.data);
  }
  toString(): string {
    return `Unspecified ${this.data.length}`;
  }
}