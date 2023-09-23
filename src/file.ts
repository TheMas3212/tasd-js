import { packetName, PACKET_TYPES } from "./constants";
import { parse } from "./packets";
import { DumpLastModifiedPacket, PortControllerPacket } from "./packets/general";
import { InputChunkPacket } from "./packets/input";
import { TASDPacket } from "./packets/utils";
import { readUint16, readUint8, readUintN, writeUint16, writeUint8, concatUint8Array } from "./utils";

export class TASD {
  static MAGIC = new Uint8Array([0x54, 0x41, 0x53, 0x44]);
  public version: number;
  public g_keylen: number;
  public packets: TASDPacket[];
  private _isDirty: boolean = false;
  constructor(_version: number, _keylen: number) {
    this.version = _version;
    this.g_keylen = _keylen;
    this.packets = [];
  }
  get dirty() {
    return this._isDirty;
  }
  markDirty() {
    this._isDirty = true;
  }
  toBuffer() {
    const header = new Uint8Array(7);
    header.set(TASD.MAGIC, 0);
    writeUint16(this.version, header, 4);
    writeUint8(this.g_keylen, header, 6);
    const packets = [ header ];
    if (this._isDirty) {
      this.packets = this.packets.filter((packet) => packet.key === PACKET_TYPES.DUMP_LAST_MODIFIED);
      this.packets.push(new DumpLastModifiedPacket(BigInt(Date.now())));
    }
    for (const packet of this.packets) {
      packets.push(packet.toBuffer(this.g_keylen));
    }
    return concatUint8Array(packets);
  }
  pprint() {
    console.log('VERSION', this.version);
    console.log('G_KEYLEN', this.g_keylen);
    for (const packet of this.packets) {
      console.log(packet.toString());
    }
  }
  compactInputs() {
    if (this.packets.some(packet => packet.key === PACKET_TYPES.INPUT_MOMENT)) return;
    const otherPackets = this.packets.filter(packet => packet.key !== PACKET_TYPES.INPUT_CHUNK);
    const inputPackets = this.packets.filter(packet => packet.key === PACKET_TYPES.INPUT_CHUNK);
    const ports: Uint8Array[][] = [];
    for (const packet of otherPackets.filter(packet => packet.key === PACKET_TYPES.PORT_CONTROLLER)) {
      ports[(packet as PortControllerPacket).port] = [];
    }
    for (const packet of inputPackets as InputChunkPacket[]) {
      ports[packet.port].push(packet.inputs);
    }
    for (let port = 1; port < 256; port++) {
      if (ports[port]) {
        otherPackets.push(new InputChunkPacket(port, concatUint8Array(ports[port])));
      }
    }
    this.packets = otherPackets;
    this.markDirty();
  }
  static parseFile(buffer: Uint8Array) {
    if (buffer.length < 7) throw new Error('Input Too Short');
    for (let i = 0; i < TASD.MAGIC.length; i++) {
      if (buffer[i] !== TASD.MAGIC[i]) throw new Error('Invalid Magic Bytes');
    }
    const version = readUint16(buffer, 4);
    if (version !== 1) throw new Error('Unsupported Version');
    const g_keylen = readUint8(buffer, 6);
    if (g_keylen !== 2) throw new Error('G_KEYLEN not equal to 2, unsupported');
    const file = new TASD(version, g_keylen);
    let index = 7;
    while (index < buffer.length) {
      const p_key = readUintN(buffer, index, g_keylen);
      index += g_keylen;
      const p_pexp = readUint8(buffer, index);
      index += 1;
      const p_plen = readUintN(buffer, index, p_pexp);
      index += p_pexp;
      const p_payload = buffer.subarray(index, index+p_plen);
      index += p_plen;
      file.packets.push(parse(p_key, p_payload));
    }
    return file;
  }
}
