# Email client app written in Inferno + Brunch + TypeScript2 + Babel/ES6+
### Author: Noel Colon

## Description
This project is a fun learning/working progress/proof of concept for a secure and spam free way to do email. The idea is to maintain a central inbox sourced by multiple aliases.

## Current Caveats
* Limited TS capabilities with`typescript-brunch`. Also requires modification in order to translate the `tsx/jsx` files right. Changes can be obtained from [this](https://github.com/brunch/typescript-brunch/pull/39/files) PR.
* No clear way to compose and save mail yet

### Installation
* Project uses the latest version of Node, Yarn, and Brunch.
1. Install dependencies: ```yarn install```
2. Watch and reload changes: ```yarn start```