const album = "netBloc Vol. 24: tiuqottigeloot";
const MIN_MILKDROP_WIDTH = 725;

export const initialTracks = [
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Diablo_Swing_Orchestra_-_01_-_Heroines.mp3",
    duration: 322.612245,
    metaData: {
      title: "Heroines",
      artist: "Diablo Swing Orchestra",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Eclectek_-_02_-_We_Are_Going_To_Eclecfunk_Your_Ass.mp3",
    duration: 190.093061,
    metaData: {
      title: "We Are Going To Eclecfunk Your Ass",
      artist: "Eclectek",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Auto-Pilot_-_03_-_Seventeen.mp3",
    duration: 214.622041,
    metaData: {
      title: "Seventeen",
      artist: "Auto-Pilot",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Muha_-_04_-_Microphone.mp3",
    duration: 181.838367,
    metaData: {
      title: "Microphone",
      artist: "Muha",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Just_Plain_Ant_-_05_-_Stumble.mp3",
    duration: 86.047347,
    metaData: {
      title: "Stumble",
      artist: "Just Plain Ant",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Sleaze_-_06_-_God_Damn.mp3",
    duration: 226.795102,
    metaData: {
      title: "God Damn",
      artist: "Sleaze",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Juanitos_-_07_-_Hola_Hola_Bossa_Nova.mp3",
    duration: 207.072653,
    metaData: {
      title: "Hola Hola Bossa Nova",
      artist: "Juanitos",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Entertainment_for_the_Braindead_-_08_-_Resolutions_Chris_Summer_Remix.mp3",
    duration: 314.331429,
    metaData: {
      title: "Resolutions (Chris Summer Remix)",
      artist: "Entertainment for the Braindead",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Nobara_Hayakawa_-_09_-_Trail.mp3",
    duration: 204.042449,
    metaData: {
      title: "Trail",
      artist: "Nobara Hayakawa",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Paper_Navy_-_10_-_Tongue_Tied.mp3",
    duration: 201.116735,
    metaData: {
      title: "Tongue Tied",
      artist: "Paper Navy",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/60_Tigres_-_11_-_Garage.mp3",
    duration: 245.394286,
    metaData: {
      title: "Garage",
      artist: "60 Tigres",
      album,
    },
  },
  {
    url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/CM_aka_Creative_-_12_-_The_Cycle_Featuring_Mista_Mista.mp3",
    duration: 221.44,
    metaData: {
      title: "The Cycle (Featuring Mista Mista)",
      artist: "CM aka Creative",
      album,
    },
  },
];

export const availableSkins = [
  {
    url: "/webamp/skins/Green-Dimension-V2.wsz",
    name: "Green Dimension V2",
  },
  {
    url: "/webamp/skins/internet-archive-winamp-skin-by-luigihann.wsz",
    name: "Internet Archive",
  },
  {
    url: "/webamp/skins/mac_os_x_1_5-aqua.wsz",
    name: "Mac OSX v1.5 (Aqua)",
  },
  {
    url: "/webamp/skins/TopazAmp1-2.wsz",
    name: "TopazAmp",
  },
  {
    url: "/webamp/skins/Zelda-Amp.wsz",
    name: "ZeldaAmp",
  },
  {
    url: "/webamp/skins/Vizor1-01.wsz",
    name: "Vizor",
  },
  {
    url: "/webamp/skins/XMMS-Turquoise.wsz",
    name: "XMMS",
  },
  {
    url: "/webamp/skins/ZaxonRemake1-0.wsz",
    name: "Zaxon Remake",
  },
  {
    url: "/webamp/skins/My_Funny_Valentine.wsz",
    name: "My Funny Valentine",
  },
  {
    url: "/webamp/skins/rei_1.wsz",
    name: "Rei",
  },
  {
    url: "/webamp/skins/Skinner_Atlas.wsz",
    name: "Skinner Atlas",
  },
  {
    url: "/webamp/skins/Sonic_Attitude.wsz",
    name: "Sonic",
  },
];

export const windowLayout =
  document.body.clientWidth < MIN_MILKDROP_WIDTH
    ? {
        main: { position: { left: 0, top: 0 } },
        equalizer: { position: { left: 0, top: 116 } },
        playlist: {
          position: { left: 0, top: 232 },
          size: { extraHeight: 0, extraWidth: 0 },
        },
        milkdrop: {
          position: { left: 0, top: 348 },
          size: { extraHeight: 0, extraWidth: 0 },
        },
      }
    : {
        main: { position: { left: 0, top: 0 } },
        equalizer: { position: { left: 0, top: 116 } },
        playlist: {
          position: { left: 0, top: 232 },
          size: { extraHeight: 4, extraWidth: 0 },
        },
        milkdrop: {
          position: { left: 275, top: 0 },
          size: { extraHeight: 12, extraWidth: 7 },
        },
      };
