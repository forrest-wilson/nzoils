## Getting Started

Before you start, please follow the steps below to get yourself up and running with a working development environment.

### Prerequisites

Please make sure the following command line tools are installed on your machine.

* [NPM](https://www.npmjs.com) - Node Package Manager

This project uses [Gulp](https://gulpjs.com) for workflow automation. If you are unfamiliar, please get yourself acquainted with the basics and familiarize yourself with the gulpfile.js.

## Commands

### Installing the Node Packages

To ensure you have the required node packages, please enter the below command in terminal to install the node_modules on your machine.

**Note:** Please make sure you are in the root directory of the project before running any of the below commands.

```
npm install
```

This will install all dependencies and devDependencies required to build and run this project.

### Building the Dist

Open a terminal window and run the below command.

```
npm run start
```

This should build the project and create a 'dist' folder where the compiled code is saved. Terminal will continue to listen for any changes made to files in the 'src' directory and re-build whenever anything is saved.

**Note:** The 'dist' folder is **NOT** to be added to the repo.