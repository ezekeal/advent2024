type Position = [x: number, y: number];
const [dataFile] = Deno.args;
const data = Deno.readTextFileSync(dataFile);
const rows = data.split('\n').map(r => r.split(''));
const height = rows.length;
const width = rows[0].length;

const antennaLocations = new Map<string, Position>()
const isOutOfbounds = ([x, y]: Position) => x < 0 || x > width || y < 0 || y > height;

for ( const [y, row] of rows.entries() ) {
    for (const [x, s] of row.entries()) {
        if (s === '.') continue;
        antennaLocations.set(s, [x, y]);
    }
}

console.log(antennaLocations)