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

	describe('Error handling tests', () => {
		it('should throw error for non-existent root folder', () => {
			expect(() => {
				listSubfoldersByName('non/existent/root', 'any');
			}).to.throw();
		});

		it('should throw error for null root path', () => {
			expect(() => {
				listSubfoldersByName(null as any, 'any');
			}).to.throw();
		});

		it('should throw error for undefined root path', () => {
			expect(() => {
				listSubfoldersByName(undefined as any, 'any');
			}).to.throw();
		});

		it('should throw error for empty root path', () => {
			expect(() => {
				listSubfoldersByName('', 'any');
			}).to.throw();
		});
	});

	describe('Edge cases', () => {
		it('should handle empty folder name', () => {
			const folders = listSubfoldersByName('test', '');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should handle null folder name', () => {
			const folders = listSubfoldersByName('test', null as any);
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should handle undefined folder name', () => {
			const folders = listSubfoldersByName('test', undefined as any);
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should handle case-sensitive folder names', () => {
			const folders = listSubfoldersByName('test', 'Special');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should handle non-existent folder name', () => {
			const folders = listSubfoldersByName('test', 'nonexistent');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should handle folders with same name at different levels', () => {
			const folders = listSubfoldersByName('test', 'special');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(2);
			expect(folders).to.include.members([
				'test\\_folder\\a\\special',
				'test\\_folder\\c\\special'
			]);
		});
	});

	describe('Return value tests', () => {
		it('should always return an array', () => {
			const folders = listSubfoldersByName('test', 'special');
			expect(folders).to.be.an('array');
		});

		it('should return empty array when no matches found', () => {
			const folders = listSubfoldersByName('test', 'nonexistent');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(0);
		});

		it('should return full paths', () => {
			const folders = listSubfoldersByName('test', 'special');
			folders.forEach(folder => {
				expect(folder).to.include('test');
				expect(folder).to.include('special');
			});
		});
	});

	describe('Recursive behavior tests', () => {
		it('should search recursively through all subfolders', () => {
			const folders = listSubfoldersByName('test/_folder', 'special');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(2);
			expect(folders).to.include.members([
				'test\\_folder\\a\\special',
				'test\\_folder\\c\\special'
			]);
		});

		it('should handle nested folder structures', () => {
			const folders = listSubfoldersByName('test/_folder/b', 'deep');
			expect(folders).to.be.an('array');
			expect(folders).to.have.length(1);
			expect(folders[0]).to.equal('test\\_folder\\b\\unspecial\\deep');
		});
	});
});
