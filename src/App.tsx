import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TypedPosts from './Types/Posts.type';
import { getPosts } from './Api/Api';
import Posts from './Components/Posts/Posts';

import Preloader from './Components/Preloader/Preloader';
import Login from './pages/Login-page/Login-page';
import PaginationComponent from './Components/Pagination/Pagination';
import Navbar from './Components/Navbar/Navbar';

// ESTOS ESTILOS TIENEN QUE ESTAR LO ULTIMO
import './scss/App.scss';
import './index.scss';



function App() {

  const [loadingEntrance, setLoadingEntrance] = useState(true);

  const [posts, setPosts] = useState<TypedPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage/* , setPostsPerPage */] = useState(10);

  useEffect(() => {
     // Animación entrada
    setTimeout(() => {
      setLoadingEntrance(false);
    }, 4000)
    getPosts().then(
      (res) => {
        setLoading(true);
        setPosts(res);
        setLoading(false);
        console.log(typeof error);
      },
      (error) => {
        setLoading(true);
        setError(error);
      }
    );
  }, []);

  // Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);



  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes>
          {loadingEntrance ? <Route path="/" element={<Preloader />}></Route>
            : <Route path="/" element={<Login />}></Route>
          }
          <Route path="/posts" element={
              <>
                <Navbar></Navbar>
                <Posts posts={currentPosts} loading={loading} error={error} />
                <PaginationComponent postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
              </>
            }></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
