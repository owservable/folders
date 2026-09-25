'use strict';

import * as path from 'node:path';
import listSubfoldersFilesByFolderName from '../../src/functions/list.subfolders.files.by.folder.name';

describe('list.subfolders.files.by.folder.name tests', () => {
	it('listSubfoldersFilesByFolderName exists', () => {
		expect(listSubfoldersFilesByFolderName).toBeDefined();
		expect(typeof listSubfoldersFilesByFolderName).toBe('function');
	});

	it('listSubfoldersFilesByFolderName works', () => {
		expect(typeof listSubfoldersFilesByFolderName).toBe('function');
		expect(listSubfoldersFilesByFolderName).toHaveLength(2);
	});

	it('listSubfoldersFilesByFolderName finds files in specific folder names', () => {
		const files = listSubfoldersFilesByFolderName('test', 'special');
		expect(Array.isArray(files)).toBe(true);
		expect(files).toHaveLength(2);
		expect(files).toEqual(expect.arrayContaining([path.join('test', '_folder', 'a', 'special', 'a.txt'), path.join('test', '_folder', 'c', 'special', 'c.txt')]));
	});

	it('listSubfoldersFilesByFolderName handles empty results', () => {
		const files = listSubfoldersFilesByFolderName('test', 'nonexistent');
		expect(Array.isArray(files)).toBe(true);
		expect(files).toHaveLength(0);
	});
});
