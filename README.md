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

### Building the Temp folder for Development

Open a terminal window and run the below command.

```
npm run start
```

This should build the project and create a 'temp' folder where the compiled code is saved. Terminal will continue to listen for any changes made to files in the 'src' directory and re-build whenever anything is saved.

**Note:** The 'temp' folder is **NOT** to be added to the repo.

### Building the Dist folder for Production

Run the below command when you are ready to distribute the current version of the site.

```
npm run build
```

This will rebuild the 'temp' folder and create the 'dist' folder containing all files ready for deployment.

There is also a handy shell script housed in this repo that will build the dist folder for you.

**Note:** Please ensure all features work by running the 'npm run start' command before deploying the 'dist' folder to any live servers.

### Updating after new node module installs

Once a new node module is being used, please run the below command to update your node_modules folder.

```
npm install
```

Once this has been run, it is a good idea to re-run the start command in terminal.

## Libraries

This project uses the following libraries:

* [jQuery v3.2.1](https://jquery.com/)
* [Normalize v7.0.0](https://necolas.github.io/normalize.css/)

## Contributors

* [Florence Lo](https://github.com/fpwl) - Lead
* [Forrest Wilson-Jennings](https://github.com/forrest-wilson) - Dev
