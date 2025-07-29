'use strict';

import * as fs from 'fs';
import * as path from 'path';

import {ItemStat} from '../interfaces/item.stat.interface';

const listSubfoldersByName: Function = (root: string, folderName: string): string[] => {
	let folders: string[] = [];

	const subfolderNames: string[] = fs.readdirSync(root);

	// PERFORMANCE: Single lstat call per item instead of filtering twice
	const itemStats: ItemStat[] = subfolderNames.map((name: string): ItemStat => {
		const fullPath: string = path.join(root, name);
		const stat: fs.Stats = fs.lstatSync(fullPath);
		return {
			name,
			fullPath,
			isDirectory: stat.isDirectory()
		};
	});

	// Filter only directories using cached stat results
	const subfolders: ItemStat[] = itemStats.filter((item: ItemStat): boolean => item.isDirectory);

	// Process subfolders using native forEach
	subfolders.forEach((subfolder: ItemStat): void => {
		if (folderName === subfolder.name) {
			folders.push(subfolder.fullPath);
		} else {
			// Recursively search subfolders and combine results using native concat
			folders = folders.concat(listSubfoldersByName(subfolder.fullPath, folderName));
		}
	});

	return folders;
};

export default listSubfoldersByName;
