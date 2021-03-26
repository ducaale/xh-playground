import WasmTerminal, { fetchCommandFromWAPM } from '@wasmer/wasm-terminal';
import { WasmFs } from "@wasmer/wasmfs";
import xh from '../Cargo.toml';
import 'xterm/css/xterm.css';
import './style.css';

const fetchCommandHandler = async ({args}) => {
  let commandName = args[0];
  if (commandName === 'xh') {
    return async (options, wasmFs) => {
      // TODO: call these functions from xh side

      // read from stdin
      // let myArr = new Uint8Array(1024);
      // let stdin = wasmFs.fs.readSync(0, myArr, 0, 1024, 0);

      // output to stdout
      // wasmFs.fs.writeFileSync("/dev/stdout", "Quick Start!");

      // output to stderr
      // wasmFs.fs.writeFileSync("/dev/stderr", "Quick Start!");

      // TODO: figure out how to check tty mode (probably not supported
      // in WasmTerminal at the moment)

      const mod = await xh();
      return mod.run(options.args);
    }
  }

  return fetchCommandFromWAPM({args});
};

const wasmTerminal = new WasmTerminal({
  fetchCommand: fetchCommandHandler,
  wasmFs: new WasmFs()
});

wasmTerminal.xterm.setOption('fontFamily', 'Cascadia Mono');
wasmTerminal.xterm.setOption('fontWeight', '400');
wasmTerminal.xterm.setOption('lineHeight', '1.1');
wasmTerminal.xterm.setOption('cursorBlink', true);
wasmTerminal.xterm.setOption('theme', { // taken from campbell theme
  "foreground": "#CCCCCC",
  "background": "#0C0C0C",
  "cursorColor": "#FFFFFF",
  "black": "#0C0C0C",
  "red": "#C50F1F",
  "green": "#13A10E",
  "yellow": "#C19C00",
  "blue": "#0037DA",
  "purple": "#881798",
  "cyan": "#3A96DD",
  "white": "#CCCCCC",
  "brightBlack": "#767676",
  "brightRed": "#E74856",
  "brightGreen": "#16C60C",
  "brightYellow": "#F9F1A5",
  "brightBlue": "#3B78FF",
  "brightPurple": "#B4009E",
  "brightCyan": "#61D6D6",
  "brightWhite": "#F2F2F2"
});

const containerElement = document.querySelector('#app');
wasmTerminal.open(containerElement);
wasmTerminal.fit();
wasmTerminal.focus();