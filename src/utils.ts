
export function readUint8(buffer: Uint8Array, index: number) {
  return buffer[index];
}
export function readUint16(buffer: Uint8Array, index: number) {
  return (buffer[index] << 8) + buffer[index + 1];
}
export function readUint24(buffer: Uint8Array, index: number) {
  return (buffer[index] << 16) + (buffer[index + 1] << 8) + buffer[index + 2];
}
export function readUint32(buffer: Uint8Array, index: number) {
  return ((buffer[index] << 24) + (buffer[index + 1] << 16) + (buffer[index + 2] << 8) + buffer[index + 3]) >>> 0;
}
export function readUint64(buffer: Uint8Array, index: number) {
  const left = readUint32(buffer, index);
  const right = readUint32(buffer, index+4);
  return (BigInt(left) << 32n) + BigInt(right);
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
  buffer[index] = uint & 255;
}
export function writeUint16(uint: number, buffer: Uint8Array, index: number) {
  buffer[index] = (uint & 65280) >> 8;
  buffer[index + 1] = uint & 255;
}
export function writeUint24(uint: number, buffer: Uint8Array, index: number) {
  buffer[index] = (uint & 16711680) >> 16;
  buffer[index + 1] = (uint & 65280) >> 8;
  buffer[index + 2] = uint & 255;
}
export function writeUint32(uint: number, buffer: Uint8Array, index: number) {
  buffer[index] = (uint & 4278190080) >> 24;
  buffer[index + 1] = (uint & 16711680) >> 16;
  buffer[index + 2] = (uint & 65280) >> 8;
  buffer[index + 3] = uint & 255;
}
export function writeUint64(uint: bigint, buffer: Uint8Array, index: number) {
  const left = (uint & 0xffffffff00000000n) >> 32n;
  const right = uint & 0xffffffffn;
  writeUint32(Number(left), buffer, index);
  writeUint32(Number(right), buffer, index+4);
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

const decoder = new TextDecoder('utf8');
const encoder = new TextEncoder();
export function readString(buffer: Uint8Array, index: number, length: number) {
  return decoder.decode(buffer.subarray(index, index+length));
}
export function writeString(str: string, buffer: Uint8Array, index: number) {
  buffer.set(encoder.encode(str), index);
}
export function encodeString(str: string) {
  return encoder.encode(str);
}