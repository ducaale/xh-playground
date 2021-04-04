use std::fmt::Write;
use cli::Cli;
use structopt::StructOpt;
use wasm_bindgen::prelude::*;

mod cli;
mod utils;

#[wasm_bindgen]
pub async fn run(args: js_sys::Array) -> Result<JsValue, js_sys::Error> {
    console_error_panic_hook::set_once();

    // https://rustwasm.github.io/docs/wasm-bindgen/reference/arbitrary-data-with-serde.html
    let args: Vec<String> = args.iter().map(|x| x.as_string().unwrap()).collect();

    let args = match Cli::from_iter_safe(args.iter()) {
        Ok(args) => args,
        Err(err) => {
            return Ok(err.message.into())
        }
    };

    let res = reqwest::Client::new()
        .get(args.url)
        .send()
        .await?;

    let text = res.text().await?;

    let mut colored_text = String::from("");
    for line in utils::colorize(&utils::indent_json(&text), "json") {
        write!(&mut colored_text, "{}", &line).unwrap();
    }
    write!(&mut colored_text, "\x1b[0m").unwrap();

    Ok(colored_text.into())
}
