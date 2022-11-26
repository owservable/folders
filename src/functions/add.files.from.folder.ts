'use strict';

import * as fs from 'fs';
import * as path from 'path';

import {each, filter} from 'lodash';

const addFilesFromFolder = (files: string[], folder: string): string[] => {
	const subfolderNames = fs.readdirSync(folder);

	const subFiles = filter(subfolderNames, (name) => !fs.lstatSync(path.join(folder, name)).isDirectory());
	each(subFiles, (file: string) => {
		files.push(path.join(folder, file));
	});

	const subFolders = filter(subfolderNames, (name: string) => fs.lstatSync(path.join(folder, name)).isDirectory());
	each(subFolders, (subFolder: string) => {
		files = addFilesFromFolder(files, path.join(folder, subFolder));
	});

	return files;
};
export default addFilesFromFolder;