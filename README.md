# spaceship-frontend

This project is build with React.

## Installation

Clone this repository:
```
$ git clone https://github.com/helmithejoe/spaceship-frontend.git
```
Go to project folder:
```
$ cd spaceship-frontend
```
Set up the API endpoint URL inside src/App.js
```
constructor(props) {
    super(props);
    this.state = {
        loginPage : [],
        profileScreen : [],
        apiEndpoint: 'http://localhost:7000'
    }
}
```
Run npm install to download all package dependencies:
```
$ npm install
```
Run npm start to run the application:
```
$ npm start
```
Application will start on port 3000. Open browser to access the application:

[http://localhost:3000](http://localhost:3000)

### Database

Create a database and put the config inside application/config/database.php
```
$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => 'root',
	'password' => '',
	'database' => 'spaceship',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
```
Run database migration
```
$ php index.php migrate
```
Edit base_url inside application/config/config.php:
```
$config['base_url'] = 'http://localhost/';
```
Run the server:
```
$ sudo php -S 0.0.0.0:7000
```