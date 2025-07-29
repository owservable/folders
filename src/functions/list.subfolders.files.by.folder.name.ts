'use strict';

import addFilesFromFolder from './add.files.from.folder';
import listSubfoldersByName from './list.subfolders.by.name';

const listSubfoldersFilesByFolderName: Function = (root: string, name: string): string[] => {
	let files: string[] = [];
	const folders: string[] = listSubfoldersByName(root, name);

	// Process folders using native forEach
	folders.forEach((folder: string): void => {
		files = addFilesFromFolder(files, folder);
	});

	return files;
};

export default listSubfoldersFilesByFolderName;
