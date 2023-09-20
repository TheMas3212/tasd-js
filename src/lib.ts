export class TASD {
  static MAGIC = new Uint8Array([0x54, 0x41, 0x53, 0x44]);
  public version: number;
  public g_keylen: number;
  public packets: TASDPacket[];
  constructor(_version: number, _keylen: number) {
    this.version = _version;
    this.g_keylen = _keylen;
    this.packets = [];
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
      file.packets.push({ type: p_key, payload: p_payload });
    }
    return file;
  }
  toBuffer() {
    let size = 7; // Header
    for (const packet of this.packets) {
      size += this.g_keylen; // Packet Key
      size += 1; // Packet PEXP
      size += minUInt(packet.payload.length); // Packet PLen
      size += packet.payload.length;
    }
    const buffer = new Uint8Array(size);
    buffer.set(TASD.MAGIC, 0);
    writeUint16(this.version, buffer, 4);
    writeUint8(this.g_keylen, buffer, 6);
    let index = 7;
    for (const packet of this.packets) {
      writeUintN(packet.type, buffer, index, this.g_keylen);
      index += this.g_keylen;
      const plen = packet.payload.length;
      const pexp = minUInt(plen);
      writeUint8(pexp, buffer, index);
      index += 1;
      writeUintN(plen, buffer, index, pexp);
      index += pexp;
      buffer.set(packet.payload, index);
      index += plen;
    }
    return buffer;
  }
  pprint() {
    console.log('VERSION', this.version);
    console.log('G_KEYLEN', this.g_keylen);
    for (const packet of this.packets) {
      console.log('PACKET', packetName(packet.type), packet.payload.length, 'Bytes');
    }
  }
  compactInputs() {
    if (this.packets.some(packet => packet.type === PACKET_TYPES.INPUT_MOMENT)) return;
    const otherPackets = this.packets.filter(packet => packet.type !== PACKET_TYPES.INPUT_CHUNK);
    const inputPackets = this.packets.filter(packet => packet.type === PACKET_TYPES.INPUT_CHUNK);
    const ports: Uint8Array[][] = [];
    for (const packet of otherPackets.filter(packet => packet.type === PACKET_TYPES.PORT_CONTROLLER)) {
      ports[packet.payload[0]] = [];
    }
    for (const packet of inputPackets) {
      ports[packet.payload[0]].push(packet.payload.subarray(1));
    }
    for (let port = 1; port < 256; port++) {
      if (ports[port]) {
        const portN = new Uint8Array([port]);
        otherPackets.push({ type: PACKET_TYPES.INPUT_CHUNK, payload: concatUint8Array([portN, ...ports[port]]) });
      }
    }
    this.packets = otherPackets;
  }
}

export type TASDPacket = {
  type: number;
  payload: Uint8Array;
}

export const PACKET_TYPES = {
  // General Keys
  'CONSOLE_TYPE': 0x00_01,
  'CONSOLE_REGION': 0x00_02,
  'GAME_TITLE': 0x00_03,
  'ROM_NAME': 0x00_04,
  'ATTRIBUTION': 0x00_05,
  'CATEGORY': 0x00_06,
  'EMULATOR_NAME': 0x00_07,
  'EMULATOR_VERSION': 0x00_08,
  'EMULATOR_CORE': 0x00_09,
  'TAS_LAST_MODIFIED': 0x00_0A,
  'DUMP_CREATED': 0x00_0B,
  'DUMP_LAST_MODIFIED': 0x00_0C,
  'TOTAL_FRAMES': 0x00_0D,
  'RERECORDS': 0x00_0E,
  'SOURCE_LINK': 0x00_0F,
  'BLANK_FRAMES': 0x00_10,
  'VERIFIED': 0x00_11,
  'MEMORY_INIT': 0x00_12,
  'GAME_IDENTIFIER': 0x00_13,
  'MOVIE_LICENSE': 0x00_14,
  'MOVIE_FILE': 0x00_15,
  'PORT_CONTROLLER': 0x00_F0,
  // NES Specific Keys
  'NES_LATCH_FILTER': 0x01_01,
  'NES_CLOCK_FILTER': 0x01_02,
  'NES_OVERREAD': 0x01_03,
  'NES_GAME_GENIE_CODE': 0x01_04,
  // SNES Specific Keys
  'SNES_CLOCK_FILTER': 0x02_02,
  'SNES_OVERREAD': 0x02_03,
  'SNES_GAME_GENIE_CODE': 0x02_04,
  'SNES_LATCH_TRAIN': 0x02_05,
  // Genesis Specific Keys
  'GENESIS_GAME_GENIE_CODE': 0x08_04,
  // Input Frame/Timing Keys
  'INPUT_CHUNK': 0xFE_01,
  'INPUT_MOMENT': 0xFE_02,
  'TRANSITION': 0xFE_03,
  'LAG_FRAME_CHUNK': 0xFE_04,
  'MOVIE_TRANSITION': 0xFE_05,
  // Extraneous Keys
  'COMMENT': 0xFF_01,
  'EXPERIMENTAL': 0xFF_FE,
  'UNSPECIFIED': 0xFF_FF,
} as const;
export function packetName(key: number) {
  for (const name of Object.keys(PACKET_TYPES)) {
    if (PACKET_TYPES[name as keyof typeof PACKET_TYPES] === key) return name;
  }
  return 'Unknown Packet ' + key.toString(16).toUpperCase();
}

export function readUint8(buffer: Uint8Array, index: number) {
  return buffer[index];
}
export function readUint16(buffer: Uint8Array, index: number) {
  return (buffer[index] << 8) + buffer[index+1];
}
export function readUint24(buffer: Uint8Array, index: number) {
  return (buffer[index] << 16) + (buffer[index+1] << 8) + buffer[index+2];
}
export function readUint32(buffer: Uint8Array, index: number) {
  return (buffer[index] << 24) + (buffer[index+1] << 16) + (buffer[index+2] << 8) + buffer[index+3];
}
export function readUintN(buffer: Uint8Array, index: number, n: number) {
  switch (n) {
    case 1: return readUint8(buffer, index);
    case 2: return readUint16(buffer, index);
    case 3: return readUint24(buffer, index);
    case 4: return readUint32(buffer, index);
    default: throw new Error('Unsupported UInt size');
  }
}

export function writeUint8(uint: number, buffer: Uint8Array, index: number) {
  buffer[index] = uint & 0xFF;
}
export function writeUint16(uint: number, buffer: Uint8Array, index: number) {
  buffer[index] = (uint & 0xFF00) >> 8;
  buffer[index+1] = uint & 0xFF;
}
export function writeUint24(uint: number, buffer: Uint8Array, index: number) {
  buffer[index] = (uint & 0xFF0000) >> 16;
  buffer[index+1] = (uint & 0xFF00) >> 8;
  buffer[index+2] = uint & 0xFF;
}
export function writeUint32(uint: number, buffer: Uint8Array, index: number) {
  buffer[index] = (uint & 0xFF000000) >> 24;
  buffer[index+1] = (uint & 0xFF0000) >> 16;
  buffer[index+2] = (uint & 0xFF00) >> 8;
  buffer[index+3] = uint & 0xFF;
}
export function writeUintN(uint: number, buffer: Uint8Array, index: number, size: number) {
  switch (size) {
    case 1: return writeUint8(uint, buffer, index);
    case 2: return writeUint16(uint, buffer, index);
    case 3: return writeUint24(uint, buffer, index);
    case 4: return writeUint32(uint, buffer, index);
    default: throw new Error('Unsupported UInt size');
  }
}

export function minUInt(uint: number) {
  if (uint < 256) return 1;
  if (uint < 65536) return 2;
  if (uint < 16777216) return 3;
  if (uint < 4294967296) return 4;
  throw new Error('Unsupported UInt size');
}

export function concatUint8Array(arrays: Uint8Array[]): Uint8Array {
  let size = 0;
  for (const array of arrays) {
    size += array.length;
  }
  const buffer = new Uint8Array(size);
  let index = 0;
  for (const array of arrays) {
    buffer.set(array, index);
    index += array.length;
  }
  return buffer;
}
