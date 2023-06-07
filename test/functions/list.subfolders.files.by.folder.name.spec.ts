'use strict';

import {expect} from 'chai';

import listSubfoldersFilesByFolderName from '../../src/functions/list.subfolders.files.by.folder.name';

describe('list.subfolders.files.by.folder.name tests', () => {
	it('fixUrl exists', () => {
		expect(listSubfoldersFilesByFolderName).to.exist;
		expect(listSubfoldersFilesByFolderName).to.be.a('function');
	});

	it('should be implemented');
});
