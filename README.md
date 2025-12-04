# Angular Version Updates

A comprehensive repository showcasing Angular framework evolution across different versions. Each branch contains a specific Angular version with practical examples demonstrating the key innovations and features introduced in that release.

## 📋 Overview

This repository is organized into separate branches, where each branch represents a different Angular version. Every branch includes:

- A complete Angular project setup for that specific version
- Working examples of new features introduced in that version
- Detailed documentation explaining the innovations and changes
- Code samples demonstrating best practices

## 📚 Showcase Application
This repository contains a showcase application with a dropdown menu that allows you to view all the Markdown chapters of the course.

## 🌿 Available Branches

| Branch | Angular Version                                                               |
| ------ | ----------------------------------------------------------------------------- |
| `ng8`  | 8.2.14                                                                        |
| `ng9`  | 9.1.13                                                                        |
| `NONE` | no significant improvement in v9                                              |
| `NONE` | no significant improvement in v10, only hot-module-replacement for developers |
| `ng12` | 12.2.0                                                                        |
| `ng13` | 13.3.0                                                                        |
| `ng14` | 14.2.0                                                                        |
| `ng15` | 15.2.0                                                                        |
| `ng16` | 16.2.0                                                                        |
| `ng17` | 17.3.0                                                                        |
| `ng18` | 18.2.0                                                                        |
| `ng19` | 19.2.0                                                                        |


## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version depends on Angular version)
- [nvm](https://github.com/nvm-sh/nvm) (recommended for managing Node versions)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/angular-version-updates.git
   cd angular-version-updates
   ```

2. **Choose a branch**

   ```bash
   # List all available branches
   git branch -a

   # Checkout the desired Angular version
   git checkout ng-8
   ```

3. **Switch Node version**

   if using nvm

   ```bash
   nvm use
   ```

   if using nvm and the version is not installed

   ```bash
   nvm install
   ```

   or manually install the node js version contained into the .nvmrc file

4. **Install dependencies**

   ```bash
    rm -rf node_modules package-lock.json # remove previous if necessary
   npm install
   ```

5. **Start the development server**

   ```bash
   npm start
   ```

6. **Open your browser**

   Navigate to `http://localhost:4200`

### Exploring Examples

Each branch contains multiple examples explained in the README file.

## ⚠️ Version Support

Please note that older Angular versions may no longer receive security updates. This repository is for educational purposes. For production applications, always use a supported Angular version.

## 🌱 Creating a New Angular Version Branch

To add a new Angular version to this repository, follow these steps:

### Step-by-Step Instructions

1. **Create an orphan branch** (no shared history with other branches)

   ```bash
   git checkout --orphan ng<version>
   ```

   Example: `git checkout --orphan ng19`

2. **Remove all files except .git folder**

3. **Create .nvmrc file with correct Node.js version**

   ```bash
   echo "20" > .nvmrc
   ```

4. **Create new Angular project**

   ```bash
   npx -p @angular/cli@<version> ng new angular-version-updates --routing --style=scss --skip-install
   ```

5. **Move project files to root level**

   ```bash

   # Move all files to parent directory
   mv angular-version-updates/* .

   # Remove empty directory
   rm -rf angular-version-updates
   ```

6. **Initial commit**

   ```bash
   git add .
   git commit -m "initial"
   ```

7. **Push the new branch**

   ```bash
   git push -u origin ng<version>
   ```

9. **DEVELOP**
   every branch must have samples explained in the README.md file which must be similar to the others

10. **Update master branch after completion**

   - Switch to master/main branch

   ```bash
   git checkout main
   ```

   - Add the new branch to the "Available Branches" table
   - Copy the README.md file into the markdowns folder changing name according to others
   - Add the filename prefix to "fileName.js" file array

   ```javascript
   const FILE_NAMES = [...other elements 'ng17', 'ng18', 'ng19', 'ng<< NEW ELEMENT >>'];
   ```

- commit and push

   ```bash
      git add README.md
      git commit -m "docs: add Angular <version> branch to README"
      git push origin main
   ```
