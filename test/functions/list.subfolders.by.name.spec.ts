'use strict';

import listSubfoldersByName from '../../src/functions/list.subfolders.by.name';

describe('list.subfolders.by.name tests', (): void => {
	it('listSubfoldersByName exists', (): void => {
		expect(listSubfoldersByName).toBeDefined();
		expect(typeof listSubfoldersByName).toBe('function');
	});

	it('listSubfoldersByName works', async (): Promise<void> => {
		expect(typeof listSubfoldersByName).toBe('function');
		expect(listSubfoldersByName.length).toBe(2);
	});

	it('listSubfoldersByName finds all folders with specific name', async (): Promise<void> => {
		const folders = await listSubfoldersByName('test', 'special');
		expect(Array.isArray(folders)).toBe(true);
		expect(folders).toHaveLength(2);
		folders.forEach((folder: string): void => {
			expect(folder).toMatch(/special$/);
		});
	});

	it('listSubfoldersByName works with case-sensitive names', async (): Promise<void> => {
		const folders = await listSubfoldersByName('test', 'unspecial');
		expect(Array.isArray(folders)).toBe(true);
		expect(folders).toHaveLength(1);
		expect(folders[0]).toBe('test\\_folder\\b\\unspecial');
	});
});
