'use strict';

import addFilesFromFolder from '../../src/functions/add.files.from.folder';

describe('add.files.from.folder tests', () => {
	it('addFilesFromFolder exists', () => {
		expect(addFilesFromFolder).toBeDefined();
		expect(typeof addFilesFromFolder).toBe('function');
	});

	it('addFilesFromFolder works', () => {
		const files = addFilesFromFolder([], 'test/_folder/b/unspecial');

		expect(files).toEqual([
			'test\\_folder\\b\\unspecial\\another.txt', //
			'test\\_folder\\b\\unspecial\\some.txt',
			'test\\_folder\\b\\unspecial\\deep\\more.txt'
		]);
	});

	describe('Error handling tests', () => {
		it('should throw error for non-existent folder', () => {
			expect(() => {
				addFilesFromFolder([], 'non/existent/folder');
			}).toThrow();
		});

		it('should throw error for invalid path', () => {
			expect(() => {
				addFilesFromFolder([], '');
			}).toThrow();
		});

		it('should throw error for null folder path', () => {
			expect(() => {
				addFilesFromFolder([], null as any);
			}).toThrow();
		});

		it('should throw error for undefined folder path', () => {
			expect(() => {
				addFilesFromFolder([], undefined as any);
			}).toThrow();
		});
	});

	describe('Edge cases', () => {
		it('should handle empty files array', () => {
			const files = addFilesFromFolder([], 'test/_folder/a/special');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(1);
			expect(files[0]).toBe('test\\_folder\\a\\special\\a.txt');
		});

		it('should handle existing files in array', () => {
			const existingFiles = ['existing/file.txt'];
			const files = addFilesFromFolder(existingFiles, 'test/_folder/a/special');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(2);
			expect(files[0]).toBe('existing/file.txt');
			expect(files[1]).toBe('test\\_folder\\a\\special\\a.txt');
		});

		it('should handle folders with multiple files', () => {
			const files = addFilesFromFolder([], 'test/_folder');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(5);
			expect(files).toEqual(expect.arrayContaining([
				'test\\_folder\\a\\special\\a.txt',
				'test\\_folder\\c\\special\\c.txt',
				'test\\_folder\\b\\unspecial\\another.txt',
				'test\\_folder\\b\\unspecial\\some.txt',
				'test\\_folder\\b\\unspecial\\deep\\more.txt'
			]));
		});

		it('should handle nested folder structures', () => {
			const files = addFilesFromFolder([], 'test/_folder/b/unspecial');
			expect(Array.isArray(files)).toBe(true);
			expect(files).toHaveLength(3);
			expect(files).toContain('test\\_folder\\b\\unspecial\\deep\\more.txt');
		});
	});

	describe('Return value tests', () => {
		it('should return the same array reference', () => {
			const originalFiles: string[] = [];
			const result = addFilesFromFolder(originalFiles, 'test/_folder/a/special');
			expect(result).toBe(originalFiles);
		});

		it('should maintain array order', () => {
			const files = addFilesFromFolder([], 'test/_folder/b/unspecial');
			expect(files[0]).toBe('test\\_folder\\b\\unspecial\\another.txt');
			expect(files[1]).toBe('test\\_folder\\b\\unspecial\\some.txt');
			expect(files[2]).toBe('test\\_folder\\b\\unspecial\\deep\\more.txt');
		});
	});
});
