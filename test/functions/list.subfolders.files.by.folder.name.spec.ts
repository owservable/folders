'use strict';

import {expect} from 'chai';

import listSubfoldersFilesByFolderName from '../../src/functions/list.subfolders.files.by.folder.name';

describe('list.subfolders.files.by.folder.name tests', () => {
	it('listSubfoldersFilesByFolderName exists', () => {
		expect(listSubfoldersFilesByFolderName).to.exist;
		expect(listSubfoldersFilesByFolderName).to.be.a('function');
	});

	it('listSubfoldersFilesByFolderName works', () => {
		const subfolders = listSubfoldersFilesByFolderName('test', 'special');
		expect(subfolders).to.deep.equal([
			'test\\_folder\\a\\special\\a.txt', //
			'test\\_folder\\c\\special\\c.txt'
		]);
	});
});
