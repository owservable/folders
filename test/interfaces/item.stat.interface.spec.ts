'use strict';

import {ItemStat} from '../../src/interfaces/item.stat.interface';

describe('ItemStat interface tests', () => {
	it('should create valid ItemStat objects', () => {
		const fileItem: ItemStat = {
			name: 'test.txt',
			fullPath: '/path/to/test.txt',
			isDirectory: false
		};

		const dirItem: ItemStat = {
			name: 'folder',
			fullPath: '/path/to/folder',
			isDirectory: true
		};

		expect(fileItem.name).toBe('test.txt');
		expect(fileItem.fullPath).toBe('/path/to/test.txt');
		expect(fileItem.isDirectory).toBe(false);

		expect(dirItem.name).toBe('folder');
		expect(dirItem.fullPath).toBe('/path/to/folder');
		expect(dirItem.isDirectory).toBe(true);
	});

	it('should work with array operations', () => {
		const items: ItemStat[] = [
			{name: 'file.txt', fullPath: '/path/file.txt', isDirectory: false},
			{name: 'dir', fullPath: '/path/dir', isDirectory: true}
		];

		const files = items.filter((item) => !item.isDirectory);
		const dirs = items.filter((item) => item.isDirectory);

		expect(files).toHaveLength(1);
		expect(dirs).toHaveLength(1);
		expect(files[0].name).toBe('file.txt');
		expect(dirs[0].name).toBe('dir');
	});
});
