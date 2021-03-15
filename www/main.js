import WasmTerminal, { fetchCommandFromWAPM } from '@wasmer/wasm-terminal';
import xh from '../Cargo.toml';
import 'xterm/css/xterm.css';
import './style.css';

const fetchCommandHandler = async ({args}) => {
  let commandName = args[0];
  if (commandName === 'xh') {
    return async (...x) => {
      const mod = await xh();
      console.log(x);
      return mod.run();
    }
  }

  return fetchCommandFromWAPM({args});
};

const wasmTerminal = new WasmTerminal({
  fetchCommand: fetchCommandHandler
});

wasmTerminal.print('Hello World!');
wasmTerminal.xterm.setOption('fontFamily','Cascadia Mono');
wasmTerminal.xterm.setOption('fontWeight','300');

const containerElement = document.querySelector('#app');
wasmTerminal.open(containerElement);
wasmTerminal.fit();
wasmTerminal.focus();