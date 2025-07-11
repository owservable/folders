'use strict';

import * as fs from 'fs';
import * as path from 'path';

import {each, filter} from 'lodash';

const addFilesFromFolder = (files: string[], folder: string): string[] => {
	const subfolderNames: string[] = fs.readdirSync(folder);

	const subFiles: string[] = filter(subfolderNames, (name: string) => !fs.lstatSync(path.join(folder, name)).isDirectory());
	each(subFiles, (file: string): void => {
		files.push(path.join(folder, file));
	});

	const subFolders: string[] = filter(subfolderNames, (name: string) => fs.lstatSync(path.join(folder, name)).isDirectory());
	each(subFolders, (subFolder: string): void => {
		files = addFilesFromFolder(files, path.join(folder, subFolder));
	});

	return files;
};
export default addFilesFromFolder;
