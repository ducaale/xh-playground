use structopt::StructOpt;

#[derive(StructOpt, Debug)]
#[structopt(name = "xh")]
pub struct Cli {
    /// The request URL
    #[structopt(name = "URL")]
    pub url: String,
}
