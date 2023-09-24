import { PACKET_TYPES } from "../constants";
import { TASDPacket, UnknownPacket } from "./utils";

import * as general from "./general";
import * as nes from "./nes";
import * as snes from "./snes";
import * as genesis from "./genesis";
import * as input from "./input";
import * as extra from "./extra";

export * as General from './general';
export * as NES from './nes';
export * as SNES from './snes';
export * as Genesis from './genesis';
export * as Input from './input';
export * as Extra from './extra';

export function parse(type: number, buffer: Uint8Array): TASDPacket {
  switch (type) {
    // General
    case PACKET_TYPES.CONSOLE_TYPE: return general.ConsoleTypePacket.fromBuffer(buffer);
    case PACKET_TYPES.CONSOLE_REGION: return general.ConsoleRegionPacket.fromBuffer(buffer);
    case PACKET_TYPES.GAME_TITLE: return general.GameTitlePacket.fromBuffer(buffer);
    case PACKET_TYPES.ROM_NAME: return general.ROMNamePacket.fromBuffer(buffer);
    case PACKET_TYPES.ATTRIBUTION: return general.AttributionPacket.fromBuffer(buffer);
    case PACKET_TYPES.CATEGORY: return general.CategoryPacket.fromBuffer(buffer);
    case PACKET_TYPES.EMULATOR_NAME: return general.EmulatorNamePacket.fromBuffer(buffer);
    case PACKET_TYPES.EMULATOR_VERSION: return general.EmulatorVersionPacket.fromBuffer(buffer);
    case PACKET_TYPES.EMULATOR_CORE: return general.EmulatorCorePacket.fromBuffer(buffer);
    case PACKET_TYPES.TAS_LAST_MODIFIED: return general.TASLastModifedPacket.fromBuffer(buffer);
    case PACKET_TYPES.DUMP_CREATED: return general.DumpCreatedPacket.fromBuffer(buffer);
    case PACKET_TYPES.DUMP_LAST_MODIFIED: return general.DumpLastModifiedPacket.fromBuffer(buffer);
    case PACKET_TYPES.TOTAL_FRAMES: return general.TotalFramesPacket.fromBuffer(buffer);
    case PACKET_TYPES.RERECORDS: return general.RerecordsPacket.fromBuffer(buffer);
    case PACKET_TYPES.SOURCE_LINK: return general.SourceLinkPacket.fromBuffer(buffer);
    case PACKET_TYPES.BLANK_FRAMES: return general.BlankFramesPacket.fromBuffer(buffer);
    case PACKET_TYPES.VERIFIED: return general.VerifiedPacket.fromBuffer(buffer);
    case PACKET_TYPES.MEMORY_INIT: return general.MemoryInitPacket.fromBuffer(buffer);
    case PACKET_TYPES.GAME_IDENTIFIER: return general.GameIdentiferPacket.fromBuffer(buffer);
    case PACKET_TYPES.MOVIE_LICENSE: return general.MovieLicensePacket.fromBuffer(buffer);
    case PACKET_TYPES.MOVIE_FILE: return general.MovieFilePacket.fromBuffer(buffer);
    case PACKET_TYPES.PORT_CONTROLLER: return general.PortControllerPacket.fromBuffer(buffer);
    // NES
    case PACKET_TYPES.NES_LATCH_FILTER: return nes.NESLatchFilterPacket.fromBuffer(buffer);
    case PACKET_TYPES.NES_CLOCK_FILTER: return nes.NESClockFilterPacket.fromBuffer(buffer);
    case PACKET_TYPES.NES_OVERREAD: return nes.NESOverreadPacket.fromBuffer(buffer);
    case PACKET_TYPES.NES_GAME_GENIE_CODE: return nes.NESGameGenieCodePacket.fromBuffer(buffer);
    // SNES
    case PACKET_TYPES.SNES_CLOCK_FILTER: return snes.SNESClockFilterPacket.fromBuffer(buffer);
    case PACKET_TYPES.SNES_OVERREAD: return snes.SNESOverreadPacket.fromBuffer(buffer);
    case PACKET_TYPES.SNES_GAME_GENIE_CODE: return snes.SNESGameGenieCodePacket.fromBuffer(buffer);
    case PACKET_TYPES.SNES_LATCH_TRAIN: return snes.SNESLatchTrainPacket.fromBuffer(buffer);
    // Genesis
    case PACKET_TYPES.GENESIS_GAME_GENIE_CODE: return genesis.GenesisGameGenieCodePacket.fromBuffer(buffer);
    // Input
    case PACKET_TYPES.INPUT_CHUNK: return input.InputChunkPacket.fromBuffer(buffer);
    case PACKET_TYPES.INPUT_MOMENT: return input.InputMomentPacket.fromBuffer(buffer);
    case PACKET_TYPES.TRANSITION: return input.TransitionPacket.fromBuffer(buffer);
    case PACKET_TYPES.LAG_FRAME_CHUNK: return input.LagFrameChunkPacket.fromBuffer(buffer);
    case PACKET_TYPES.MOVIE_TRANSITION: return input.MovieTransitionPacket.fromBuffer(buffer);
    // Extra
    case PACKET_TYPES.COMMENT: return extra.CommentPacket.fromBuffer(buffer);
    case PACKET_TYPES.EXPERIMENTAL: return extra.ExperimentalPacket.fromBuffer(buffer);
    case PACKET_TYPES.UNSPECIFIED: return extra.UnspecifiedPacket.fromBuffer(buffer);
    // Unknown
    default: return new UnknownPacket(type, buffer);
  }
}