/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './boilerMaker/navbar'
export {default as UserHome} from './boilerMaker/user-home'
export {Login, Signup} from './boilerMaker/auth-form'
export {default as Grid} from './grid/Grid'
export {default as Board} from './grid/Board.jsx'
export {default as Player} from './Player.jsx'
