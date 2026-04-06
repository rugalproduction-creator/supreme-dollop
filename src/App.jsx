import { Router, Route } from "@solidjs/router";
import Login from "#pgs/auth/Login";
import Register from "#pgs/auth/Register";
import Layout from "#pgs/layout/Layout";
import Home from "#pgs/home/Home";
import Search from "#pgs/search/Search";
import { booksLoader, chapterLoader, checkAuthLoader, contentLoader, storyLoader } from "#utils/loaders.js";
import Album from "#pgs/album/Album.jsx";
import Account from "#pgs/account/Account.jsx";
import Comic from "#pgs/comics/Comic.jsx";
import Create from "#pgs/publish/Create.jsx";
import Publish from "#pgs/publish/Publish.jsx";

export default function App() {
  return  (
    <Router>
    	<Route path="/auth">
	  		<Route path="/" component={Login} />
	  		<Route path="/register" component={Register} />
		  </Route>
      <Route path="/" component={Layout}>
        <Route path="/" component={Home} preload={contentLoader}/>
        <Route path="/search" component={Search}/>
        <Route path="/album" component={Album}/>
        <Route path="/account" component={Account}/>
        <Route path="/settings" component={Home}/>
        <Route path="/comics/:id" component={Comic} preload={storyLoader}/>
        <Route path="/publish" component={Publish} preload={booksLoader}/>
        <Route path="/publish/create" component={Create}/>
      </Route>
    </Router>
  )
}
