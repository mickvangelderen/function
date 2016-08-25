import guardedSpawnSync from '../scripts/utility/guardedSpawnSync'
import { version } from '../package.json'
import { join } from 'path'

guardedSpawnSync('documentation', [ 'build',
	'--output', join('documentation', version),
	'--format', 'html'
], {
	stdio: 'inherit'
})

// guardSpawnSync(spawnSync('git', [ 'add', '.' ], {
// 	cwd: join(process.cwd(), 'documentation'),
// 	stdio: 'inherit'
// }))
//
// guardSpawnSync(spawnSync('git', [ 'commit', '--no-verify', '-m', `Documentation for ${version}`], {
// 	cwd: join(process.cwd(), 'documentation'),
// 	stdio: 'inherit'
// }))
