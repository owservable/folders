'use strict';

// functions
import addFilesFromFolder from './functions/add.files.from.folder';
import listSubfoldersByName from './functions/list.subfolders.by.name';
import listSubfoldersFilesByFolderName from './functions/list.subfolders.files.by.folder.name';

// interfaces
import {ItemStat} from './interfaces/item.stat.interface';

export {
	// functions
	addFilesFromFolder,
	listSubfoldersByName,
	listSubfoldersFilesByFolderName,

	// interfaces
	ItemStat
};

const OwservableFolders = {};
export default OwservableFolders;
