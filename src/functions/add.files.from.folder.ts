'use strict';

import * as fs from 'fs';
import * as path from 'path';

import {ItemStat} from '../interfaces/item.stat.interface';

const addFilesFromFolder: Function = (files: string[], folder: string): string[] => {
	const subfolderNames: string[] = fs.readdirSync(folder);

	// PERFORMANCE: Single lstat call per item instead of two
	const itemStats: ItemStat[] = subfolderNames.map((name: string): ItemStat => {
		const fullPath: string = path.join(folder, name);
		const stat: fs.Stats = fs.lstatSync(fullPath);
		return {
			name,
			fullPath,
			isDirectory: stat.isDirectory()
		};
	});

	// Separate files and folders using cached stat results
	const subFiles: ItemStat[] = itemStats.filter((item: ItemStat): boolean => !item.isDirectory);
	const subFolders: ItemStat[] = itemStats.filter((item: ItemStat): boolean => item.isDirectory);

	// Add files to the array using native forEach
	subFiles.forEach((file: ItemStat): void => {
		files.push(file.fullPath);
	});

	// Process subfolders recursively
	subFolders.forEach((subFolder: ItemStat): void => {
		files = addFilesFromFolder(files, subFolder.fullPath);
	});

	return files;
};

export default addFilesFromFolder;
