import { PACKET_TYPES } from "../constants";
import { AttributionPacket, BlankFramesPacket, CategoryPacket, ConsoleRegionPacket, ConsoleTypePacket, DumpCreatedPacket, DumpLastModifiedPacket, EmulatorCorePacket, EmulatorNamePacket, EmulatorVersionPacket, GameTitlePacket, MovieLicensePacket, PortControllerPacket, ROMNamePacket, RerecordsPacket, SourceLinkPacket, TASLastModifedPacket, TotalFramesPacket, VerifiedPacket } from "./general";
import { InputChunkPacket } from "./input";
import { TASDPacket, UnknownPacket } from "./utils";
export * as General from './general';
export * as Input from './input';

export function parse(type: number, buffer: Uint8Array): TASDPacket {
  switch (type) {
    // General
    case PACKET_TYPES.CONSOLE_TYPE: return ConsoleTypePacket.fromBuffer(buffer);
    case PACKET_TYPES.CONSOLE_REGION: return ConsoleRegionPacket.fromBuffer(buffer);
    case PACKET_TYPES.GAME_TITLE: return GameTitlePacket.fromBuffer(buffer);
    case PACKET_TYPES.ROM_NAME: return ROMNamePacket.fromBuffer(buffer);
    case PACKET_TYPES.ATTRIBUTION: return AttributionPacket.fromBuffer(buffer);
    case PACKET_TYPES.CATEGORY: return CategoryPacket.fromBuffer(buffer);
    case PACKET_TYPES.EMULATOR_NAME: return EmulatorNamePacket.fromBuffer(buffer);
    case PACKET_TYPES.EMULATOR_VERSION: return EmulatorVersionPacket.fromBuffer(buffer);
    case PACKET_TYPES.EMULATOR_CORE: return EmulatorCorePacket.fromBuffer(buffer);
    case PACKET_TYPES.TAS_LAST_MODIFIED: return TASLastModifedPacket.fromBuffer(buffer);
    case PACKET_TYPES.DUMP_CREATED: return DumpCreatedPacket.fromBuffer(buffer);
    case PACKET_TYPES.DUMP_LAST_MODIFIED: return DumpLastModifiedPacket.fromBuffer(buffer);
    case PACKET_TYPES.TOTAL_FRAMES: return TotalFramesPacket.fromBuffer(buffer);
    case PACKET_TYPES.RERECORDS: return RerecordsPacket.fromBuffer(buffer);
    case PACKET_TYPES.SOURCE_LINK: return SourceLinkPacket.fromBuffer(buffer);
    case PACKET_TYPES.BLANK_FRAMES: return BlankFramesPacket.fromBuffer(buffer);
    case PACKET_TYPES.VERIFIED: return VerifiedPacket.fromBuffer(buffer);
    // case PACKET_TYPES.MEMORY_INIT: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.GAME_IDENTIFIER: return XXXXX.fromBuffer(buffer);
    case PACKET_TYPES.MOVIE_LICENSE: return MovieLicensePacket.fromBuffer(buffer);
    // case PACKET_TYPES.MOVIE_FILE: return XXXXX.fromBuffer(buffer);
    case PACKET_TYPES.PORT_CONTROLLER: return PortControllerPacket.fromBuffer(buffer);
    // NES
    // case PACKET_TYPES.NES_LATCH_FILTER: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.NES_CLOCK_FILTER: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.NES_OVERREAD: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.NES_GAME_GENIE_CODE: return XXXXX.fromBuffer(buffer);
    // SNES
    // case PACKET_TYPES.SNES_CLOCK_FILTER: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.SNES_OVERREAD: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.SNES_GAME_GENIE_CODE: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.SNES_LATCH_TRAIN: return XXXXX.fromBuffer(buffer);
    // Genesis
    // case PACKET_TYPES.GENESIS_GAME_GENIE_CODE: return XXXXX.fromBuffer(buffer);
    // Input
    case PACKET_TYPES.INPUT_CHUNK: return InputChunkPacket.fromBuffer(buffer);
    // case PACKET_TYPES.INPUT_MOMENT: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.TRANSITION: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.LAG_FRAME_CHUNK: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.MOVIE_TRANSITION: return XXXXX.fromBuffer(buffer);
    // Extra
    // case PACKET_TYPES.COMMENT: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.EXPERIMENTAL: return XXXXX.fromBuffer(buffer);
    // case PACKET_TYPES.UNSPECIFIED: return XXXXX.fromBuffer(buffer);
    // Unknown
    default: return new UnknownPacket(type, buffer);
  }
}