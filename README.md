dbRocket
========

Database Driven Developpement - an MSAccess like CRUD generator

## Structure

Based on Mean Stack structure with some changes :

- Swig templating engine
- Squelize ORM
- Dynamic routing support
- Express MVC engine

## Features

- Analyse the database structure and generate model entities
- Bootstrap powered views & components
- Forms based on configuration files
- In-app coding
- Deployment & upgrade helpers
- Plugins manager

## Install

In order to install bower packages on windows use this before : `git config --global url."https://".insteadOf git://`

```
npm install -g grunt-cli
npm install -g bower
git clone https://github.com/ichiriac/dbRocket
cd dbRocket
npm install
grunt
```

## License

The MIT License (MIT)

Copyright (c) 2013 Ioan CHIRIAC

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
