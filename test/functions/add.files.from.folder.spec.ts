'use strict';

import {expect} from 'chai';

import addFilesFromFolder from '../../src/functions/add.files.from.folder';

describe('add.files.from.folder tests', () => {
	it('addFilesFromFolder exists', () => {
		expect(addFilesFromFolder).to.exist;
		expect(addFilesFromFolder).to.be.a('function');
	});

	it('should be implemented');
});
