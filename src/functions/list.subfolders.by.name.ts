'use strict';

import * as fs from 'fs';
import * as path from 'path';
import {ItemStat} from '../types/item.stat.interface';

const listSubfoldersByName: Function = async (root: string, folderName: string): Promise<string[]> => {
	let folders: string[] = [];

	const subfolderNames: string[] = await fs.promises.readdir(root);

	// ✅ PERFORMANCE: Single lstat call per item + parallel processing
	const itemStats: ItemStat[] = await Promise.all(
		subfolderNames.map(async (subfolderName: string): Promise<ItemStat> => {
			const fullPath: string = path.join(root, subfolderName);
			const stat: fs.Stats = await fs.promises.lstat(fullPath);
			return {
				name: subfolderName,
				fullPath,
				isDirectory: stat.isDirectory()
			};
		})
	);

	// ✅ PERFORMANCE: Filter directories using cached stat results
	const subfolders: ItemStat[] = itemStats.filter((item: ItemStat): boolean => item.isDirectory);

	// ✅ PERFORMANCE: Process subfolders in parallel
	const results: string[][] = await Promise.all(
		subfolders.map(async (subfolder: ItemStat): Promise<string[]> => {
			if (folderName === subfolder.name) {
				return [subfolder.fullPath];
			} else {
				return await listSubfoldersByName(subfolder.fullPath, folderName);
			}
		})
	);

	// ✅ PERFORMANCE: Flatten results using native method
	folders = results.flat();

	return folders;
};
export default listSubfoldersByName;
