const [dataFile] = Deno.args;
const data = Deno.readTextFileSync(dataFile);

console.log(data);