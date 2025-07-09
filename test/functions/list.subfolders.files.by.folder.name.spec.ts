'use strict';

import listSubfoldersFilesByFolderName from '../../src/functions/list.subfolders.files.by.folder.name';

describe('list.subfolders.files.by.folder.name tests', () => {
	it('listSubfoldersFilesByFolderName exists', () => {
		expect(listSubfoldersFilesByFolderName).toBeDefined();
		expect(typeof listSubfoldersFilesByFolderName).toBe('function');
	});

	it('listSubfoldersFilesByFolderName works', () => {
		const subfoldersFiles = listSubfoldersFilesByFolderName('test', 'special');

		expect(subfoldersFiles).toEqual([
			'test\\_folder\\a\\special\\a.txt', //
			'test\\_folder\\c\\special\\c.txt'
		]);
	});

	describe('Error handling tests', () => {
		it('should throw error for non-existent root folder', () => {
			expect(() => {
				listSubfoldersFilesByFolderName('non/existent/root', 'any');
			}).toThrow();
		});

		it('should throw error for null root path', () => {
			expect(() => {
				listSubfoldersFilesByFolderName(null as any, 'any');
			}).toThrow();
		});

		it('should throw error for undefined root path', () => {
			expect(() => {
				listSubfoldersFilesByFolderName(undefined as any, 'any');
			}).toThrow();
		});

		it('should throw error for empty root path', () => {
			expect(() => {
				listSubfoldersFilesByFolderName('', 'any');
			}).toThrow();
		});
	});

	describe('Edge cases', () => {
		it('should handle empty folder name', () => {
			const files = listSubfoldersFilesByFolderName('test', '');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(0);
		});

		it('should handle null folder name', () => {
			const files = listSubfoldersFilesByFolderName('test', null as any);
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(0);
		});

		it('should handle undefined folder name', () => {
			const files = listSubfoldersFilesByFolderName('test', undefined as any);
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(0);
		});

		it('should handle case-sensitive folder names', () => {
			const files = listSubfoldersFilesByFolderName('test', 'Special');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(0);
		});

		it('should handle non-existent folder name', () => {
			const files = listSubfoldersFilesByFolderName('test', 'nonexistent');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(0);
		});

		it('should handle folders with same name at different levels', () => {
			const files = listSubfoldersFilesByFolderName('test', 'special');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(2);
			expect(files).toEqual(expect.arrayContaining([
				'test\\_folder\\a\\special\\a.txt',
				'test\\_folder\\c\\special\\c.txt'
			]));
		});
	});

	describe('Return value tests', () => {
		it('should always return an array', () => {
			const files = listSubfoldersFilesByFolderName('test', 'special');
			expect(Array.isArray(files)).toBe(true);
		});

		it('should return empty array when no matching folders found', () => {
			const files = listSubfoldersFilesByFolderName('test', 'nonexistent');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(0);
		});

		it('should return full file paths', () => {
			const files = listSubfoldersFilesByFolderName('test', 'special');
			files.forEach(file => {
				expect(file).toContain('test');
				expect(file).toContain('special');
				expect(file).toContain('.txt');
			});
		});
	});

	describe('Integration tests', () => {
		it('should combine folder search and file listing correctly', () => {
			const files = listSubfoldersFilesByFolderName('test', 'special');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(2);
			expect(files).toEqual(expect.arrayContaining([
				'test\\_folder\\a\\special\\a.txt',
				'test\\_folder\\c\\special\\c.txt'
			]));
		});

		it('should handle nested folder structures with files', () => {
			const files = listSubfoldersFilesByFolderName('test', 'unspecial');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(3);
			expect(files).toEqual(expect.arrayContaining([
				'test\\_folder\\b\\unspecial\\another.txt',
				'test\\_folder\\b\\unspecial\\some.txt',
				'test\\_folder\\b\\unspecial\\deep\\more.txt'
			]));
		});

		it('should handle folders with no files', () => {
			// Create a test for a folder that exists but has no files
			const files = listSubfoldersFilesByFolderName('test', 'deep');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(1);
			expect(files[0]).toBe('test\\_folder\\b\\unspecial\\deep\\more.txt');
		});
	});

	describe('Recursive behavior tests', () => {
		it('should search recursively through all subfolders', () => {
			const files = listSubfoldersFilesByFolderName('test/_folder', 'special');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(2);
			expect(files).toEqual(expect.arrayContaining([
				'test\\_folder\\a\\special\\a.txt',
				'test\\_folder\\c\\special\\c.txt'
			]));
		});

		it('should handle multiple levels of nesting', () => {
			const files = listSubfoldersFilesByFolderName('test/_folder/b', 'deep');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(1);
			expect(files[0]).toBe('test\\_folder\\b\\unspecial\\deep\\more.txt');
		});
	});
});
