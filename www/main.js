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

      const mod = await xh();
      return mod.run();
    }
  }

  return fetchCommandFromWAPM({args});
};

const wasmTerminal = new WasmTerminal({
  fetchCommand: fetchCommandHandler,
  wasmFs: new WasmFs()
});

wasmTerminal.print('Hello World!');
wasmTerminal.xterm.setOption('fontFamily','Cascadia Mono');
wasmTerminal.xterm.setOption('fontWeight','300');

const containerElement = document.querySelector('#app');
wasmTerminal.open(containerElement);
wasmTerminal.fit();
wasmTerminal.focus();