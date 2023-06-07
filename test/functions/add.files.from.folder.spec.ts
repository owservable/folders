'use strict';

import {expect} from 'chai';

import addFilesFromFolder from '../../src/functions/add.files.from.folder';

describe('add.files.from.folder tests', () => {
	it('addFilesFromFolder exists', () => {
		expect(addFilesFromFolder).to.exist;
		expect(addFilesFromFolder).to.be.a('function');
	});

	it('addFilesFromFolder works', () => {
		const files = addFilesFromFolder([], 'test/_folder/b/unspecial');

		expect(files).to.deep.equal([
			'test\\_folder\\b\\unspecial\\another.txt', //
			'test\\_folder\\b\\unspecial\\some.txt',
			'test\\_folder\\b\\unspecial\\deep\\more.txt'
		]);
	});
});
