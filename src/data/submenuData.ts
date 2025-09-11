import empty from "/navbar-icons/footer-submenu-icons/empty.png";
import backup from "/navbar-icons/footer-submenu-icons/23(16x16).png";
import keyboard from "/navbar-icons/footer-submenu-icons/58(16x16).png";
import cmd from "/navbar-icons/footer-submenu-icons/56(16x16).png";
import calculator from "/navbar-icons/footer-submenu-icons/74(16x16).png";
import utility from "/navbar-icons/footer-submenu-icons/119(16x16).png";
import volume from "/navbar-icons/footer-submenu-icons/120(16x16).png";
import characterMap from "/navbar-icons/footer-submenu-icons/127(16x16).png";
import cleanDisk from "/navbar-icons/footer-submenu-icons/128(16x16).png";
import wordPad from "/navbar-icons/footer-submenu-icons/153(16x16).png";
import winExplorer from "/navbar-icons/footer-submenu-icons/156(16x16).png";
import MSN from "/navbar-icons/footer-submenu-icons/159(16x16).png";
import sync from "/navbar-icons/footer-submenu-icons/182(16x16).png";
import security from "/navbar-icons/footer-submenu-icons/214(16x16).png";
import access from "/navbar-icons/footer-submenu-icons/227(16x16).png";
import wireless from "/navbar-icons/footer-submenu-icons/234(16x16).png";
import accessibility from "/navbar-icons/footer-submenu-icons/238(16x16).png";
import connection from "/navbar-icons/footer-submenu-icons/309(16x16).png";
import update from "/navbar-icons/footer-submenu-icons/322(16x16).png";
import notepad from "/navbar-icons/footer-submenu-icons/327(16x16).png";
import networkAssistance from "/navbar-icons/footer-submenu-icons/357(16x16).png";
import menu from "/navbar-icons/footer-submenu-icons/358(16x16).png";
import transfer from "/navbar-icons/footer-submenu-icons/367(16x16).png";
import defragmenter from "/navbar-icons/footer-submenu-icons/374(16x16).png";
import catalog from "/navbar-icons/footer-submenu-icons/392(16x16).png";
import networkConnection from "/navbar-icons/footer-submenu-icons/404(16x16).png";
import info from "/navbar-icons/footer-submenu-icons/505(16x16).png";
import address from "/navbar-icons/footer-submenu-icons/554(16x16).png";
import connectionWizard from "/navbar-icons/footer-submenu-icons/663(16x16).png";
import networkSetup from "/navbar-icons/footer-submenu-icons/664(16x16).png";
import hyperCmd from "/navbar-icons/footer-submenu-icons/669(16x16).png";
import painter from "/navbar-icons/footer-submenu-icons/680(16x16).png";
import sound from "/navbar-icons/footer-submenu-icons/690(16x16).png";
import recent from "/navbar-icons/footer-submenu-icons/716(16x16).png";
import compatibility from "/navbar-icons/footer-submenu-icons/747(16x16).png";
import magnifier from "/navbar-icons/footer-submenu-icons/817(16x16).png";
import mediaPlayer from "/navbar-icons/footer-submenu-icons/846(16x16).png";
import tour from "/navbar-icons/footer-submenu-icons/853(32x32).png";
import outlook from "/navbar-icons/footer-submenu-icons/887(16x16).png";
import spade from "/navbar-icons/footer-submenu-icons/888(16x16).png";
import reversi from "/navbar-icons/footer-submenu-icons/889(16x16).png";
import onlineHeart from "/navbar-icons/footer-submenu-icons/890(16x16).png";
import checker from "/navbar-icons/footer-submenu-icons/891(16x16).png";
import backgammon from "/navbar-icons/footer-submenu-icons/892(16x16).png";
import movieMaker from "/navbar-icons/footer-submenu-icons/894(16x16).png";
import ie from "/navbar-icons/footer-submenu-icons/896(16x16).png";
import messenger from "/navbar-icons/footer-submenu-icons/msn.png";
import spider from "/navbar-icons/footer-submenu-icons/spider.png";
import freecell from "/navbar-icons/footer-submenu-icons/freecell.png";
import heart from "/navbar-icons/footer-submenu-icons/heart.png";
import rdp from "/navbar-icons/footer-submenu-icons/rdp.png";
import solitaire from "/navbar-icons/footer-submenu-icons/solitaire.png";
import narrator from "/navbar-icons/footer-submenu-icons/narrator.ico";
import pinball from "/navbar-icons/footer-submenu-icons/pinball.png";
import restore from "/navbar-icons/footer-submenu-icons/restore.ico";
import mine from "/navbar-icons/footer-submenu-icons/mine-icon.png";

type SubMenuItemType =
  | { type: "item"; icon?: string; text: string }
  | { type: "separator" }
  | {
      type: "menu";
      icon?: string;
      text: string;
      bottom?: string;
      items: SubMenuItemType[];
    };

export const submenuApps: {
  allPrograms: SubMenuItemType[];
  connectTo: SubMenuItemType[];
  myRecentDocuments: SubMenuItemType[];
} = {
  allPrograms: [
    {
      type: "item",
      icon: access,
      text: "Set Program Access and Defaults",
    },
    {
      type: "item",
      icon: catalog,
      text: "Windows Catalog",
    },
    {
      type: "item",
      icon: update,
      text: "Windows Update",
    },
    {
      type: "separator",
    },
    {
      type: "menu",
      icon: menu,
      text: "Accessories",
      items: [
        {
          type: "menu",
          icon: menu,
          text: "Accessibility",
          bottom: "initial",
          items: [
            {
              type: "item",
              icon: accessibility,
              text: "Accessibility Wizard",
            },
            {
              type: "item",
              icon: magnifier,
              text: "Magnifier",
            },
            {
              type: "item",
              icon: narrator,
              text: "Narrator",
            },
            {
              type: "item",
              icon: keyboard,
              text: "On-Screen Keyboard",
            },
            {
              type: "item",
              icon: utility,
              text: "Utility Manager",
            },
          ],
        },
        {
          type: "menu",
          icon: menu,
          text: "Communications",
          bottom: "initial",
          items: [
            {
              type: "item",
              icon: hyperCmd,
              text: "HyperTerminal",
            },
            {
              type: "item",
              icon: networkConnection,
              text: "Network Connections",
            },
            {
              type: "item",
              icon: networkSetup,
              text: "Network Setup Wizard",
            },
            {
              type: "item",
              icon: connectionWizard,
              text: "New Connection Wizard",
            },
            {
              type: "item",
              icon: wireless,
              text: "Wireless Network Setup Wizard",
            },
          ],
        },
        {
          type: "menu",
          icon: menu,
          text: "Entertainment",
          bottom: "initial",
          items: [
            {
              type: "item",
              icon: sound,
              text: "Sound Recorder",
            },
            {
              type: "item",
              icon: volume,
              text: "Volume Control",
            },
            {
              type: "item",
              icon: mediaPlayer,
              text: "Windows Media Player",
            },
          ],
        },
        {
          type: "menu",
          icon: menu,
          text: "System Tools",
          bottom: "initial",
          items: [
            {
              type: "item",
              icon: backup,
              text: "Backup",
            },
            {
              type: "item",
              icon: characterMap,
              text: "Character Map",
            },
            {
              type: "item",
              icon: cleanDisk,
              text: "Disk Cleanup",
            },
            {
              type: "item",
              icon: defragmenter,
              text: "Disk Defragmenter",
            },
            {
              type: "item",
              icon: transfer,
              text: "Files and Settings Transfer Wizard",
            },
            {
              type: "item",
              icon: recent,
              text: "Scheduled Tasks",
            },
            {
              type: "item",
              icon: security,
              text: "Security Center",
            },
            {
              type: "item",
              icon: info,
              text: "System Information",
            },
            {
              type: "item",
              icon: restore,
              text: "System Restore",
            },
          ],
        },
        {
          type: "item",
          icon: address,
          text: "Address Book",
        },
        {
          type: "item",
          icon: cmd,
          text: "Command Prompt",
        },
        {
          type: "item",
          icon: notepad,
          text: "Notepad",
        },
        {
          type: "item",
          icon: painter,
          text: "Paint",
        },
        {
          type: "item",
          icon: calculator,
          text: "Calculator",
        },
        {
          type: "item",
          icon: compatibility,
          text: "Program Compatibility Wizard",
        },
        {
          type: "item",
          icon: rdp,
          text: "Remote Desktop Connection",
        },
        {
          type: "item",
          icon: sync,
          text: "Synchronize",
        },
        {
          type: "item",
          icon: tour,
          text: "Tour Windows XP",
        },
        {
          type: "item",
          icon: winExplorer,
          text: "Windows Explorer",
        },
        {
          type: "item",
          icon: wordPad,
          text: "WordPad",
        },
      ],
    },
    {
      type: "menu",
      icon: menu,
      text: "Games",
      items: [
        {
          type: "item",
          icon: freecell,
          text: "FreeCell",
        },
        {
          type: "item",
          icon: heart,
          text: "Hearts",
        },
        {
          type: "item",
          icon: backgammon,
          text: "Internet Backgammon",
        },
        {
          type: "item",
          icon: checker,
          text: "Internet Checkers",
        },
        {
          type: "item",
          icon: onlineHeart,
          text: "Internet Hearts",
        },
        {
          type: "item",
          icon: reversi,
          text: "Internet Reversi",
        },
        {
          type: "item",
          icon: spade,
          text: "Internet Spades",
        },
        {
          type: "item",
          icon: mine,
          text: "Minesweeper",
        },
        {
          type: "item",
          icon: pinball,
          text: "Pinball",
        },
        {
          type: "item",
          icon: solitaire,
          text: "Solitaire",
        },
        {
          type: "item",
          icon: spider,
          text: "Spider Solitaire",
        },
      ],
    },
    {
      type: "menu",
      icon: menu,
      text: "Startup",
      items: [
        {
          type: "item",
          icon: empty,
          text: "(Empty)",
        },
      ],
    },
    {
      type: "item",
      icon: ie,
      text: "Internet Explorer",
    },
    {
      type: "item",
      icon: outlook,
      text: "Outlook Express",
    },
    {
      type: "item",
      icon: networkAssistance,
      text: "Remote Assistance",
    },
    {
      type: "item",
      icon: mediaPlayer,
      text: "Windows Media Player",
    },
    {
      type: "item",
      icon: messenger,
      text: "Windows Messenger",
    },
    {
      type: "item",
      icon: movieMaker,
      text: "Windows Movie Maker",
    },
  ],
  connectTo: [
    {
      type: "item",
      icon: MSN,
      text: "MSN",
    },
    {
      type: "item",
      icon: connection,
      text: "Show all connections",
    },
  ],
  myRecentDocuments: [
    {
      type: "item",
      icon: empty,
      text: "(Empty)",
    },
  ],
};
