Job-Desk
========

[![Code Climate](https://codeclimate.com/github/alv-ch/job-desk/badges/gpa.svg)](https://codeclimate.com/github/alv-ch/job-desk) [![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/alv-ch/job-desk) [![Build Status](https://travis-ci.org/alv-ch/job-desk.svg?branch=dev)](https://travis-ci.org/alv-ch/job-desk)

Job search frontend made for internet terminals.

http://www.job-desk.ch

staging: http://staging.job-desk.ch

POC Denmark: http://jobdesk-dascoli.rhcloud.com / github: https://github.com/tdascoli/job-desk

# Getting started

## Prerequisites

- `node` v. 5.6.0
- `npm` v. 3.7.3
- Elasticsearch server v. 5.2.2 correctly mapped and containing the data

By default, the project is using the Elasticsearch server running on www.job-desk.ch. It is possible to change the target (e.g. for a local running instance) in the `Gruntfile.js` file (proxies section).

Hint : It is highly recommended to use `nvm` to install and manage versions of `node` (https://github.com/creationix/nvm/blob/master/README.md)

## Installing

Clone the projet and _cd_ into it. 

Run : 
```
npm install
bower install 
grunt serve
```

## Deployment

The application is deployed using Ansible : https://github.com/alv-ch/ansible-job-desk

## Hints for Intellij IDEA users

After having cloned the project with the help of IDEA, don't agree to create a project by checking the files. It's easier to create a new project via "File / New Project" and point this new project to the cloned files.
