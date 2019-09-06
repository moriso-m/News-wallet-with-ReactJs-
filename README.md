# News-Wallet
This is a an API that can be used to save articles read online and helps you to organize your articles by grouping them according to their category.
This API has been built using Laravel framework and uses Laravel passport for authentication and authorization.
The project also has a frontend written in ReactJs that will be used to consume the API. ReactJs  expressive API for building robust JavaScript applications using components.
 ----------
 Use Laravel Mix to easily compile JavaScript components into a single, browser-ready JavaScript file.

 ***Setting up React***
 To install all the required dependancies in package.json, run
 ``npm install``
 Once the dependancies have been installed, compile assets by running
 ``npm run dev``
 or 
 ``npm run watch`` - monitors and compiles assets automatically

 To set React as the default frontend scaffolding run
 ``php artisan preset react``

***Setting up the API***
Install laravel passport which will be required for authentication. Navigate to the project folder on the terminal and run the command below

``composer require laravel/passport``

The rest of the configurations have been setup
Migrate models Configure your database and then Run the following commands:

``php artisan migrate``

Create the encryption keys needed to generate secure access tokens. 

``php artisan passport:install``


