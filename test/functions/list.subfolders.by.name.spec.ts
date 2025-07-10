'use strict';

import listSubfoldersByName from '../../src/functions/list.subfolders.by.name';

describe('list.subfolders.by.name tests', () => {
	it('listSubfoldersByName exists', () => {
		expect(listSubfoldersByName).toBeDefined();
		expect(typeof listSubfoldersByName).toBe('function');
	});

	it('listSubfoldersByName works', () => {
		const subfolders = listSubfoldersByName('test', 'special');

		expect(subfolders).toEqual([
			'test\\_folder\\a\\special', //
			'test\\_folder\\c\\special'
		]);
	});

	describe('Error handling tests', () => {
		it('should throw error for non-existent root folder', () => {
			expect(() => {
				listSubfoldersByName('non/existent/root', 'any');
			}).toThrow();
		});

		it('should throw error for null root path', () => {
			expect(() => {
				listSubfoldersByName(null as any, 'any');
			}).toThrow();
		});

		it('should throw error for undefined root path', () => {
			expect(() => {
				listSubfoldersByName(undefined as any, 'any');
			}).toThrow();
		});

		it('should throw error for empty root path', () => {
			expect(() => {
				listSubfoldersByName('', 'any');
			}).toThrow();
		});
	});

	describe('Edge cases', () => {
		it('should handle empty folder name', () => {
			const folders = listSubfoldersByName('test', '');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should handle null folder name', () => {
			const folders = listSubfoldersByName('test', null as any);
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should handle undefined folder name', () => {
			const folders = listSubfoldersByName('test', undefined as any);
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should handle case-sensitive folder names', () => {
			const folders = listSubfoldersByName('test', 'Special');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should handle non-existent folder name', () => {
			const folders = listSubfoldersByName('test', 'nonexistent');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should handle folders with same name at different levels', () => {
			const folders = listSubfoldersByName('test', 'special');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(2);
			expect(folders).toEqual(expect.arrayContaining(['test\\_folder\\a\\special', 'test\\_folder\\c\\special']));
		});
	});

	describe('Return value tests', () => {
		it('should always return an array', () => {
			const folders = listSubfoldersByName('test', 'special');
			expect(Array.isArray(folders)).toBe(true);
		});

		it('should return empty array when no matches found', () => {
			const folders = listSubfoldersByName('test', 'nonexistent');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(0);
		});

		it('should return full paths', () => {
			const folders = listSubfoldersByName('test', 'special');
			folders.forEach((folder) => {
				expect(folder).toContain('test');
				expect(folder).toContain('special');
			});
		});
	});

	describe('Recursive behavior tests', () => {
		it('should search recursively through all subfolders', () => {
			const folders = listSubfoldersByName('test/_folder', 'special');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(2);
			expect(folders).toEqual(expect.arrayContaining(['test\\_folder\\a\\special', 'test\\_folder\\c\\special']));
		});

		it('should handle nested folder structures', () => {
			const folders = listSubfoldersByName('test/_folder/b', 'deep');
			expect(Array.isArray(folders)).toBe(true);
			expect(folders).toHaveLength(1);
			expect(folders[0]).toBe('test\\_folder\\b\\unspecial\\deep');
		});
	});
});
