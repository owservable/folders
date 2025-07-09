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

	describe('Integration tests', () => {
		it('should work together to find files in specific folder names', () => {
			const files = OwservableFolders.listSubfoldersFilesByFolderName('test', 'special');
			expect(files).to.be.an('array');
			expect(files).to.have.length(2);
			expect(files).to.include.members([
				'test\\_folder\\a\\special\\a.txt',
				'test\\_folder\\c\\special\\c.txt'
			]);
		});

		it('should return empty array when no folders match the name', () => {
			const files = OwservableFolders.listSubfoldersFilesByFolderName('test', 'nonexistent');
			expect(files).to.be.an('array');
			expect(files).to.have.length(0);
		});

		it('should handle recursive folder structures', () => {
			const files: string[] = [];
			const result = OwservableFolders.addFilesFromFolder(files, 'test/_folder/b/unspecial');
			expect(result).to.have.length(3);
			expect(result).to.include.members([
				'test\\_folder\\b\\unspecial\\another.txt',
				'test\\_folder\\b\\unspecial\\some.txt',
				'test\\_folder\\b\\unspecial\\deep\\more.txt'
			]);
		});
	});

	describe('Error handling tests', () => {
		it('addFilesFromFolder should throw error for non-existent folder', () => {
			expect(() => {
				OwservableFolders.addFilesFromFolder([], 'non/existent/folder');
			}).to.throw();
		});

		it('listSubfoldersByName should throw error for non-existent root folder', () => {
			expect(() => {
				OwservableFolders.listSubfoldersByName('non/existent/root', 'any');
			}).to.throw();
		});

		it('listSubfoldersFilesByFolderName should handle non-existent root gracefully', () => {
			expect(() => {
				OwservableFolders.listSubfoldersFilesByFolderName('non/existent/root', 'any');
			}).to.throw();
		});
	});

	describe('Edge cases', () => {
		it('should handle empty folder names', () => {
			const folders = OwservableFolders.listSubfoldersByName('test', '');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should handle case-sensitive folder names', () => {
			const folders = OwservableFolders.listSubfoldersByName('test', 'Special');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should handle folders with same name at different levels', () => {
			const folders = OwservableFolders.listSubfoldersByName('test', 'special');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(2);
			expect(folders).to.include.members([
				'test\\_folder\\a\\special',
				'test\\_folder\\c\\special'
			]);
		});
	});
});
