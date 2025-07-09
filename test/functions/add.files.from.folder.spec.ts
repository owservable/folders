'use strict';

import {expect} from 'chai';

import addFilesFromFolder from '../../src/functions/add.files.from.folder';

describe('add.files.from.folder tests', () => {
	it('addFilesFromFolder exists', () => {
		expect(addFilesFromFolder).to.exist;
		expect(addFilesFromFolder).to.be.a('function');
	});

	it('addFilesFromFolder works', () => {
		const files = addFilesFromFolder([], 'test/_folder/b/unspecial');

		expect(files).to.deep.equal([
			'test\\_folder\\b\\unspecial\\another.txt', //
			'test\\_folder\\b\\unspecial\\some.txt',
			'test\\_folder\\b\\unspecial\\deep\\more.txt'
		]);
	});

	describe('Error handling tests', () => {
		it('should throw error for non-existent folder', () => {
			expect(() => {
				addFilesFromFolder([], 'non/existent/folder');
			}).to.throw();
		});

		it('should throw error for invalid path', () => {
			expect(() => {
				addFilesFromFolder([], '');
			}).to.throw();
		});

		it('should throw error for null folder path', () => {
			expect(() => {
				addFilesFromFolder([], null as any);
			}).to.throw();
		});

		it('should throw error for undefined folder path', () => {
			expect(() => {
				addFilesFromFolder([], undefined as any);
			}).to.throw();
		});
	});

	describe('Edge cases', () => {
		it('should handle empty files array', () => {
			const files = addFilesFromFolder([], 'test/_folder/a/special');
			expect(files).to.be.an('array');
			expect(files).to.have.length(1);
			expect(files[0]).to.equal('test\\_folder\\a\\special\\a.txt');
		});

		it('should handle existing files in array', () => {
			const existingFiles = ['existing/file.txt'];
			const files = addFilesFromFolder(existingFiles, 'test/_folder/a/special');
			expect(files).to.be.an('array');
			expect(files).to.have.length(2);
			expect(files[0]).to.equal('existing/file.txt');
			expect(files[1]).to.equal('test\\_folder\\a\\special\\a.txt');
		});

		it('should handle folders with multiple files', () => {
			const files = addFilesFromFolder([], 'test/_folder');
			expect(files).to.be.an('array');
			expect(files).to.have.length(5);
			expect(files).to.include.members([
				'test\\_folder\\a\\special\\a.txt',
				'test\\_folder\\c\\special\\c.txt',
				'test\\_folder\\b\\unspecial\\another.txt',
				'test\\_folder\\b\\unspecial\\some.txt',
				'test\\_folder\\b\\unspecial\\deep\\more.txt'
			]);
		});

		it('should handle nested folder structures', () => {
			const files = addFilesFromFolder([], 'test/_folder/b/unspecial');
			expect(files).to.be.an('array');
			expect(files).to.have.length(3);
			expect(files).to.include('test\\_folder\\b\\unspecial\\deep\\more.txt');
		});
	});

	describe('Return value tests', () => {
		it('should return the same array reference', () => {
			const originalFiles: string[] = [];
			const result = addFilesFromFolder(originalFiles, 'test/_folder/a/special');
			expect(result).to.equal(originalFiles);
		});

		it('should maintain array order', () => {
			const files = addFilesFromFolder([], 'test/_folder/b/unspecial');
			expect(files[0]).to.equal('test\\_folder\\b\\unspecial\\another.txt');
			expect(files[1]).to.equal('test\\_folder\\b\\unspecial\\some.txt');
			expect(files[2]).to.equal('test\\_folder\\b\\unspecial\\deep\\more.txt');
		});
	});
});
