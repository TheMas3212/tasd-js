# @themas3212/tasd
Javascript/Typescript library for parsing TASD files
https://github.com/bigbass1997/TASD-Spec

This library is designed to work in both broswers and nodejs

# Usage
`static TASD.parseFile(buffer: Uint8Array)`
Try to parses a file from a Uint8Array

`TASD.pprint()`
Print a description of the contents of the file

`TASD.toBuffer()`
Convert a file back into a Uint8Array

`TASD.compactInputs()`
Attempt to compact Input Data into a single chunk for each port

`const PACKET_TYPES` and `packetName(key: number)`
Provides mapping between numerical packet types and names

Some additional utility functions are also provided for working with tasd files
`writeUint8(uint:  number, buffer:  Uint8Array, index:  number)`
`writeUint16(uint:  number, buffer:  Uint8Array, index:  number)`
`writeUint24(uint:  number, buffer:  Uint8Array, index:  number)`
`writeUint32(uint:  number, buffer:  Uint8Array, index:  number)`
`writeUintN(uint:  number, buffer:  Uint8Array, index:  number, size:  number)`
Write a Unsigned Int of a given size into a Uint8Array at a given offset

`readUint8(buffer:  Uint8Array, index:  number)`
`readUint16(buffer:  Uint8Array, index:  number)`
`readUint24(buffer:  Uint8Array, index:  number)`
`readUint32(buffer:  Uint8Array, index:  number)`
`readUintN(buffer:  Uint8Array, index:  number, n:  number)`
Read a Unsigned Int of a given size from a Uint8Array at a given offset

`minUint(uint:  number)`
Calculate the minimum size needed to store a value in a Unsigned Int

`concatUint8Array(arrays:  Uint8Array[])`
Concatenates an array of Uint8Arrays into a single Uint8Array

# Example

Simple code to read a tasd file in nodejs and print information about it
```
import { TASD } from '@themas3212/tasd';
import { readFileSync } from 'node:fs';
const buffer = readFileSync('./inputfile.tasd');
const file = TASD.parseFile(buffer);
file.pprint();
```

Simple code to read tasd file, compact the inputs and write it back out to a new file
```
import { TASD } from '@themas3212/tasd';
import { readFileSync, writeFileSync } from 'node:fs';
const buffer = readFileSync('./inputfile.tasd');
const file = TASD.parseFile(buffer);
file.compactInputs();
const buffer2 = file.toBuffer();
writeFileSync('./compact.tasd', buffer2);
```
