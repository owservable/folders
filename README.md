![owservable](https://avatars0.githubusercontent.com/u/87773159?s=75)

# @owservable/folders

A TypeScript utility library for file system operations, providing functions to work with folders and files recursively.

## 🚀 Features

- Recursively add files from folders
- List subfolders by name with filtering
- Get files from specific subfolders
- Written in TypeScript with full type support
- Lodash integration for efficient data manipulation

## 📦 Installation

```bash
npm install @owservable/folders
```

or

```bash
yarn add @owservable/folders
```

or

```bash
pnpm add @owservable/folders
```

## 🔧 Usage

### Basic Import

```typescript
import {
  addFilesFromFolder,
  listSubfoldersByName,
  listSubfoldersFilesByFolderName
} from '@owservable/folders';
```

### Adding Files from Folder Recursively

```typescript
import { addFilesFromFolder } from '@owservable/folders';

// Initialize empty array to collect files
const files: string[] = [];

// Add all files from a folder recursively
const allFiles = addFilesFromFolder(files, '/path/to/folder');

console.log(allFiles); // Array of all file paths
```

### Listing Subfolders by Name

```typescript
import { listSubfoldersByName } from '@owservable/folders';

// Get all subfolders with specific name
const subfolders = listSubfoldersByName('/path/to/parent', 'targetFolderName');

console.log(subfolders); // Array of matching subfolder paths
```

### Getting Files from Specific Subfolders

```typescript
import { listSubfoldersFilesByFolderName } from '@owservable/folders';

// Get all files from subfolders with specific name
const files = await listSubfoldersFilesByFolderName('/path/to/parent', 'targetFolderName');

console.log(files); // Array of file paths from matching subfolders
```

## 📚 API Documentation

### `addFilesFromFolder(files: string[], folder: string): string[]`

Recursively adds all files from a folder and its subfolders to the provided array.

**Parameters:**
- `files`: Array to store file paths
- `folder`: Path to the folder to scan

**Returns:** Array of file paths

### `listSubfoldersByName(folder: string, name: string): string[]`

Lists all subfolders with a specific name within a given folder.

**Parameters:**
- `folder`: Path to the parent folder
- `name`: Name of subfolders to find

**Returns:** Array of matching subfolder paths

### `listSubfoldersFilesByFolderName(folder: string, name: string): string[]`

Gets all files from subfolders that match a specific name.

**Parameters:**
- `folder`: Path to the parent folder
- `name`: Name of subfolders to search in

**Returns:** Array of file paths from matching subfolders

## 🏗️ Requirements

- Node.js >= 20
- TypeScript support

## 🧪 Testing

```bash
npm test
```

## 📖 Documentation

- **TypeDoc Documentation**: [https://owservable.github.io/folders/docs/](https://owservable.github.io/folders/docs/)
- **Test Coverage**: [https://owservable.github.io/folders/coverage/](https://owservable.github.io/folders/coverage/)

## 🔗 Related Projects

- [@owservable/actions](https://github.com/owservable/actions) - Action pattern implementation
- [@owservable/fastify-auto-routes](https://github.com/owservable/fastify-auto-routes) - Fastify auto routing
- [owservable](https://github.com/owservable/owservable) - Main reactive backend library

## 📄 License

Licensed under [The Unlicense](./LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
