'use strict';

import {expect} from 'chai';

import * as OwservableFolders from '../src/owservable.folders';

describe('owservable.folders tests', () => {
	it('OwservableFolders', () => {
		expect(OwservableFolders).to.exist;
	});

	it('OwservableFolders::addFilesFromFolder:', () => {
		expect(OwservableFolders.addFilesFromFolder).to.exist;
		expect(OwservableFolders.addFilesFromFolder).to.be.a('function');
	});

	it('OwservableFolders::listSubfoldersByName:', () => {
		expect(OwservableFolders.listSubfoldersByName).to.exist;
		expect(OwservableFolders.listSubfoldersByName).to.be.a('function');
	});

	it('OwservableFolders::listSubfoldersFilesByFolderName:', () => {
		expect(OwservableFolders.listSubfoldersFilesByFolderName).to.exist;
		expect(OwservableFolders.listSubfoldersFilesByFolderName).to.be.a('function');
	});

	it('OwservableFolders::default', () => {
		expect(OwservableFolders.default).to.exist;
		expect(OwservableFolders.default).to.be.empty;
		expect(OwservableFolders.default).to.deep.equal({});
	});
});
