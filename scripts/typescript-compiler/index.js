

const executable = './node_modules/typescript/bin/tsc'
const params = []
const options = {
	timeout: 5000,
	env: process.env,
	encoding: 'utf8'
}

console.log(`Spawn : spawning ${executable}`, params);
const result = spawnSync(executable, params, options);
console.log(`spawnSync : done`)
