'use strict';

import addFilesFromFolder from './add.files.from.folder';
import listSubfoldersByName from './list.subfolders.by.name';

const listSubfoldersFilesByFolderName: Function = async (root: string, name: string): Promise<string[]> => {
	let files: string[] = [];
	const folders: string[] = await listSubfoldersByName(root, name);

	// ✅ PERFORMANCE: Process folders in parallel instead of sequentially
	const results: string[][] = await Promise.all(
		folders.map(async (folder: string): Promise<string[]> => {
			const folderFiles: string[] = [];
			await addFilesFromFolder(folderFiles, folder);
			return folderFiles;
		})
	);

	// ✅ PERFORMANCE: Flatten results using native method
	files = results.flat();

	return files;
};
export default listSubfoldersFilesByFolderName;
