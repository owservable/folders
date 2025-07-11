'use strict';

import * as fs from 'fs';
import * as path from 'path';
import {ItemStat} from '../types/item.stat.interface';

const addFilesFromFolder: Function = async (files: string[], folder: string): Promise<string[]> => {
	const subfolderNames: string[] = await fs.promises.readdir(folder);

	// ✅ PERFORMANCE: Single lstat call per item instead of two
	const itemStats: ItemStat[] = await Promise.all(
		subfolderNames.map(async (name: string): Promise<ItemStat> => {
			const fullPath: string = path.join(folder, name);
			const stat: fs.Stats = await fs.promises.lstat(fullPath);
			return {
				name,
				fullPath,
				isDirectory: stat.isDirectory()
			};
		})
	);

	// ✅ PERFORMANCE: Separate files and folders from single stat check
	const subFiles: ItemStat[] = itemStats.filter((item: ItemStat): boolean => !item.isDirectory);
	const subFolders: ItemStat[] = itemStats.filter((item: ItemStat): boolean => item.isDirectory);

	// Add files to array
	subFiles.forEach((file: ItemStat): void => {
		files.push(file.fullPath);
	});

	// ✅ PERFORMANCE: Process subfolders in parallel
	await Promise.all(
		subFolders.map(async (subFolder: ItemStat): Promise<string[]> => {
			return await addFilesFromFolder(files, subFolder.fullPath);
		})
	);

	return files;
};
export default addFilesFromFolder;
