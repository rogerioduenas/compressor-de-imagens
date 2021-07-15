const sharp = require("sharp")
const compress_images = require("compress-images")
const fs = require("fs")
//endereço do arquivo
let path = process.argv[2];
//tranforma em num pq o terminal retorna string
let width = Number(process.argv[3]);
function resize(inputPath, outputPath, width) {
    sharp(inputPath).resize({ width: width })
        .toFile(outputPath, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("imagem redimencionada com sucesso")
                compress(outputPath, "./compressed/")
            }
        })
}
function compress(inputPath, outputPath) {
    //codigo copiado da documentação
    compress_images(inputPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
//apaga o arquivo redimencionado apos comprimi-lo
            fs.unlink(inputPath, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(inputPath, "apagado")
                }
            })
        }
    );
}
// da o nome para o novo arquivo e o endereço pra onde ele vai
resize(path, "./temp/gato-verde.jpg", width);

