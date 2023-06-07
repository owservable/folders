'use strict';

import {expect} from 'chai';

import listSubfoldersByName from '../../src/functions/list.subfolders.by.name';

describe('list.subfolders.by.name tests', () => {
	it('listSubfoldersByName exists', () => {
		expect(listSubfoldersByName).to.exist;
		expect(listSubfoldersByName).to.be.a('function');
	});

	it('should be implemented');
});
