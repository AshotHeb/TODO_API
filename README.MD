# TODO List REST API


### How to use it

---
## Requirements

You will need install `Node.js`, `npm` and `MongoDB`  in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v13.12.0

    $ npm --version
    6.14.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### MongoDB
 Install MongoDb [Guide](https://docs.mongodb.com/manual/administration/install-community/)



 ### Registration
API_HOST/user
{
  name:string,
  surname:string,
  email:string,
  password:string,
  confirm:string
}


### Sign In

API_HOST/user/sign-in

{
  email:string,
  password:string
}