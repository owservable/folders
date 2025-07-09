'use strict';

import * as OwservableFolders from '../src/owservable.folders';

describe('owservable.folders tests', () => {
	it('OwservableFolders', () => {
		expect(OwservableFolders).toBeDefined();
	});

	it('OwservableFolders::addFilesFromFolder:', () => {
		expect(OwservableFolders.addFilesFromFolder).toBeDefined();
		expect(typeof OwservableFolders.addFilesFromFolder).toBe('function');
	});

	it('OwservableFolders::listSubfoldersByName:', () => {
		expect(OwservableFolders.listSubfoldersByName).toBeDefined();
		expect(typeof OwservableFolders.listSubfoldersByName).toBe('function');
	});

	it('OwservableFolders::listSubfoldersFilesByFolderName:', () => {
		expect(OwservableFolders.listSubfoldersFilesByFolderName).toBeDefined();
		expect(typeof OwservableFolders.listSubfoldersFilesByFolderName).toBe('function');
	});

	it('OwservableFolders::default', () => {
		expect(OwservableFolders.default).toBeDefined();
		expect(OwservableFolders.default).toEqual({});
	});

	describe('Integration tests', () => {
		it('should work together to find files in specific folder names', () => {
			const files = OwservableFolders.listSubfoldersFilesByFolderName('test', 'special');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(2);
			expect(files).toEqual(expect.arrayContaining([
				'test\\_folder\\a\\special\\a.txt',
				'test\\_folder\\c\\special\\c.txt'
			]));
		});

		it('should return empty array when no folders match the name', () => {
			const files = OwservableFolders.listSubfoldersFilesByFolderName('test', 'nonexistent');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(0);
		});

		it('should handle recursive folder structures', () => {
			const files: string[] = [];
			const result = OwservableFolders.addFilesFromFolder(files, 'test/_folder/b/unspecial');
			expect(result).toHaveLength(3);
			expect(result).toEqual(expect.arrayContaining([
				'test\\_folder\\b\\unspecial\\another.txt',
				'test\\_folder\\b\\unspecial\\some.txt',
				'test\\_folder\\b\\unspecial\\deep\\more.txt'
			]));
		});
	});

	describe('Error handling tests', () => {
		it('addFilesFromFolder should throw error for non-existent folder', () => {
			expect(() => {
				OwservableFolders.addFilesFromFolder([], 'non/existent/folder');
			}).toThrow();
		});

		it('listSubfoldersByName should throw error for non-existent root folder', () => {
			expect(() => {
				OwservableFolders.listSubfoldersByName('non/existent/root', 'any');
			}).toThrow();
		});

		it('listSubfoldersFilesByFolderName should handle non-existent root gracefully', () => {
			expect(() => {
				OwservableFolders.listSubfoldersFilesByFolderName('non/existent/root', 'any');
			}).toThrow();
		});
	});

	describe('Edge cases', () => {
		it('should handle empty folder names', () => {
			const folders = OwservableFolders.listSubfoldersByName('test', '');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should handle case-sensitive folder names', () => {
			const folders = OwservableFolders.listSubfoldersByName('test', 'Special');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should handle folders with same name at different levels', () => {
			const folders = OwservableFolders.listSubfoldersByName('test', 'special');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(2);
			expect(folders).toEqual(expect.arrayContaining([
				'test\\_folder\\a\\special',
				'test\\_folder\\c\\special'
			]));
		});
	});
});
