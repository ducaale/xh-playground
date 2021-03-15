use std::fmt::Write;
use wasm_bindgen::prelude::*;

mod utils;

#[wasm_bindgen]
pub async fn run() -> Result<JsValue, JsValue> {
    console_error_panic_hook::set_once();

    let res = reqwest::Client::new()
        .get("https://httpbin.org/json")
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
