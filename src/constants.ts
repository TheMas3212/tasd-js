
export const PACKET_TYPES = {
  // General Keys
  'CONSOLE_TYPE': 1,
  'CONSOLE_REGION': 2,
  'GAME_TITLE': 3,
  'ROM_NAME': 4,
  'ATTRIBUTION': 5,
  'CATEGORY': 6,
  'EMULATOR_NAME': 7,
  'EMULATOR_VERSION': 8,
  'EMULATOR_CORE': 9,
  'TAS_LAST_MODIFIED': 10,
  'DUMP_CREATED': 11,
  'DUMP_LAST_MODIFIED': 12,
  'TOTAL_FRAMES': 13,
  'RERECORDS': 14,
  'SOURCE_LINK': 15,
  'BLANK_FRAMES': 16,
  'VERIFIED': 17,
  'MEMORY_INIT': 18,
  'GAME_IDENTIFIER': 19,
  'MOVIE_LICENSE': 20,
  'MOVIE_FILE': 21,
  'PORT_CONTROLLER': 240,
  // NES Specific Keys
  'NES_LATCH_FILTER': 257,
  'NES_CLOCK_FILTER': 258,
  'NES_OVERREAD': 259,
  'NES_GAME_GENIE_CODE': 260,
  // SNES Specific Keys
  'SNES_CLOCK_FILTER': 514,
  'SNES_OVERREAD': 515,
  'SNES_GAME_GENIE_CODE': 516,
  'SNES_LATCH_TRAIN': 517,
  // Genesis Specific Keys
  'GENESIS_GAME_GENIE_CODE': 2052,
  // Input Frame/Timing Keys
  'INPUT_CHUNK': 65025,
  'INPUT_MOMENT': 65026,
  'TRANSITION': 65027,
  'LAG_FRAME_CHUNK': 65028,
  'MOVIE_TRANSITION': 65029,
  // Extraneous Keys
  'COMMENT': 65281,
  'EXPERIMENTAL': 65534,
  'UNSPECIFIED': 65535,
} as const;
export function packetName(key: number) {
  for (const name of Object.keys(PACKET_TYPES)) {
    if (PACKET_TYPES[name as keyof typeof PACKET_TYPES] === key) return name;
  }
  return 'Unknown Packet ' + key.toString(16).toUpperCase();
}
