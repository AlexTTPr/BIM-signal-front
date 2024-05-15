Frontend of a web application for the BIM hackathon.


## Start 

`npm install` installation of all dependencies

`npm run dev` start front in debug mode

`npm build` build project for deploy



## Docker containerization 

Client app support the Docker containerization. Basically uses for prodaction or testing docker.

`docker compose build` to build container 

`docker compose up` to make container works

`docker compose restart` to restart after changing code


## Enviroments

The project uses the following stack:
- Node
- React
- TypeScript (`.tsx`, `.ts` files)
- Sass preprocessor (`.scss` files)
- Docker ( optional )
- Ant Design


## Arch 

The application implements a component-based architecture. Each page represents a differend component. Components are divided into two types: page and shared 

Pages implemet complete pages of the web application
Shared components can be reused.
Shared components are located in `/app/components/shared`


## Start tasks 

- [x] Make inital buid 

- [ ] Implements auth 

- [ ] Add main page, personal page  
