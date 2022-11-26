'use strict';

import {each} from 'lodash';

import addFilesFromFolder from '@/functions/add.files.from.folder';
import listSubfoldersByName from '@/functions/list.subfolders.by.name';

const listSubfoldersFilesByFolderName = (root: string, name: string): string[] => {
	let files: string[] = [];
	const folders: string[] = listSubfoldersByName(root, name);
	each(folders, (folder: string) => {
		files = addFilesFromFolder(files, folder);
	});
	return files;
};
export default listSubfoldersFilesByFolderName;
