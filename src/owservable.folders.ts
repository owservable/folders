'use strict';

// functions
import addFilesFromFolder from './functions/add.files.from.folder';
import listSubfoldersByName from './functions/list.subfolders.by.name';
import listSubfoldersFilesByFolderName from './functions/list.subfolders.files.by.folder.name';

// interfaces
import type {ItemStat} from './interfaces/item.stat.interface';

export {addFilesFromFolder, listSubfoldersByName, listSubfoldersFilesByFolderName};
export type {ItemStat};

const OwservableFolders = {};
export default OwservableFolders;
