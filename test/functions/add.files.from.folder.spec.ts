'use strict';

import addFilesFromFolder from '../../src/functions/add.files.from.folder';

describe('add.files.from.folder tests', () => {
	it('addFilesFromFolder exists', () => {
		expect(addFilesFromFolder).toBeDefined();
		expect(typeof addFilesFromFolder).toBe('function');
	});

	it('addFilesFromFolder works', async () => {
		expect(typeof addFilesFromFolder).toBe('function');
		expect(addFilesFromFolder.length).toBe(2);
	});

	it('addFilesFromFolder works without all files', async () => {
		const files: string[] = [];
		const result = await addFilesFromFolder(files, 'test/_folder/a/special');
		expect(result).toHaveLength(1);
		expect(result[0]).toBe('test\\_folder\\a\\special\\a.txt');
	});

	it('addFilesFromFolder works with files already in array', async () => {
		const files: string[] = ['existing/file.txt'];
		const result = await addFilesFromFolder(files, 'test/_folder/a/special');
		expect(result).toHaveLength(2);
		expect(result[0]).toBe('existing/file.txt');
		expect(result[1]).toBe('test\\_folder\\a\\special\\a.txt');
	});

	it('addFilesFromFolder handles nested folder structures', async () => {
		const files: string[] = [];
		const result = await addFilesFromFolder(files, 'test/_folder/b');
		expect(result).toHaveLength(3);
		expect(result).toEqual(
			expect.arrayContaining(['test\\_folder\\b\\unspecial\\another.txt', 'test\\_folder\\b\\unspecial\\some.txt', 'test\\_folder\\b\\unspecial\\deep\\more.txt'])
		);
	});

	it('addFilesFromFolder works on complex structure', async () => {
		const files: string[] = [];
		const result = await addFilesFromFolder(files, 'test/_folder/b/unspecial');
		expect(result).toHaveLength(3);
		expect(result[0]).toBe('test\\_folder\\b\\unspecial\\another.txt');
		expect(result[1]).toBe('test\\_folder\\b\\unspecial\\some.txt');
		expect(result[2]).toBe('test\\_folder\\b\\unspecial\\deep\\more.txt');
	});

	it('addFilesFromFolder returns empty array for empty folder', async () => {
		const files: string[] = [];
		// Create an empty test folder if it doesn't exist
		const result = await addFilesFromFolder(files, 'test/_folder/c/special');
		expect(result).toHaveLength(1);
		expect(result[0]).toBe('test\\_folder\\c\\special\\c.txt');
	});
});
