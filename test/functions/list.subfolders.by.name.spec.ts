'use strict';

import {expect} from 'chai';

import listSubfoldersByName from '../../src/functions/list.subfolders.by.name';

describe('list.subfolders.by.name tests', () => {
	it('listSubfoldersByName exists', () => {
		expect(listSubfoldersByName).to.exist;
		expect(listSubfoldersByName).to.be.a('function');
	});

	it('listSubfoldersByName works', () => {
		const subfolders = listSubfoldersByName('test', 'special');

		expect(subfolders).to.deep.equal([
			'test\\_folder\\a\\special', //
			'test\\_folder\\c\\special'
		]);
	});
});
