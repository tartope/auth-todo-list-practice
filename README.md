# auth-todo-list-practice
1. Postgresql: connects db with server in order to run pg queries
2. Express: used to quickly create server in node.js
3. React: used to build the frontend
4. Node.js: a runtime environment for JavaScript
## Steps 
### Build Server
1. Create 'server' folder
2. In 'server'  run 'npm init -y'; then 'npm i express cors pg jsonwebtoken bcrypt'
3. In 'server' create 'index.js' file
4. In 'index.js' require 'express', create 'app' variable, and require 'cors'
5. Create 'app.listen()' method to listen to port number
6. Use 'node index' or 'nodemon index' to run server and see changes
7. Create middleware
### Create Postgresql Database and Table 
8. In 'server' create 'database.sql' file
9. In 'database.sql' write commands for database and table (visually easier to see/write)
10. Open postgresql and copy/paste command for database to create it
11. Remember to set extension (download) for 'uuid_generate_v4()' to function: run command -> 'create extension if not exists "uuid-ossp";' inside database
12. Enter database and copy/paste command for table to create it
### Connect Database to Server
13. In 'server' create 'db.js' file
14. In 'db.js' configure connection to database by requiring pg library
### Build Register Route
15. In 'server' create 'routes' folder
16. In 'routes' create 'jwtAuth.js' file 
17. Use 'router' function and export it
18. In 'jwtAuth' file, require 'pool'
19. In 'jwtAuth' file, require 'bcrypt'
20. In 'index.js' file, specify routes 
21. Build 'register' route in 'jwtAuth.js' file
### Create JWT Generator
22. In 'server', run npm i dotenv
23. In 'server', create create '.env' file and create secret key
24. In 'server', create 'utils' folder that will create all functions
25. In 'utils' folder, create 'jwtGenerator.js' file 
26. In 'jwtGenerator.js' file, require jsonwebtoken, and require 'dotenv'
27. Create 'jwtGenerator' function
28. In "jwtAuth.js', require 'jwtGenerator' function
29. Add 'jwtGenerator' to 'register' route in 'jwtAuth.js' file
### Build Login Route
30. Buld 'login' route in 'jwtAuth.js' file
### Create JWT middleware
31. Create new folder, 'middleware'
32. In 'middleware', create 'authorization.js' file
33. In 'middleware', create 'validinfo.js' file (checks if email is valid or not)
34. In 'jwtAuth.js', take in middleware; require 'validinfo.js' file (add to register and login routes)
### Build Private Routes
35. In 'jwtAuth.js' file, build 'is-verify' route; require 'authorization.js' file (add to 'is-verify' route)
36. In 'routes' folder, create 'dashboard.js' file
37. In 'index.js' file, create dashboard route
38. In 'dashboard.js' file, build dashboard functions (CRUD)
### Create Client Side
39. In parent folder run 'npx create-react-app client'
40. Remove files not needed ('App.test.js', 'logo.svg', 'serviceWorker.js', 'setupTests.js')
41. Remove imports not needed from 'index.js' and 'App.js' 
42. In 'index.html' file add 'bootstrap 4' css link, and add modal scripts
43. Create 'components' folder with all component files needed
44. In client folder, install 'npm i react-router-dom react-toastify'
### Set-up React Router Dom
45. In 'App.js', import react-router-dom
46. Build basic Dashboard, Login, Register components and import to 'App.js'
47. In 'App.js', build Router and Route paths
48. Set state 'isAuthenticated' and build ternaries navigating to routes based on authentication
49. Create 'setAuth' function that toggles true/false, and pass it to each component
### Build Register Component
50. Build register form and style with bootstrap
### Build Login Route
51. Build login form and style
### Build Dashboard Component
### Validate JWT Token when refresh
52. Create function that checks if token is valid, and use 'useEffect' to continually bring user to the dashboard upon refresh
### Add Notifications with react-toastify
53. Import react-toastify and it's css into 'App.js' (https://www.npmjs.com/package/react-toastify)
54. Import react-toastify into components where notificatios are wanted
## Educational source

[freeCodeCamp.org](https://www.youtube.com/watch?v=7UQBMb8ZpuE)# auth-todo-list-practice
# auth-todo-list-practice
# auth-todo-list-practice
