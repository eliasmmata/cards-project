import React, { useEffect, useState } from 'react'
import TypedPosts from './Types/Posts.type';
import { getPosts } from './Api/Api';
import Posts from './Components/Posts';

// ESTOS ESTILOS TIENEN QUE ESTAR LO ULTIMO
import './index.scss';
import './scss/App.scss';
import PaginationComponent from './Components/Pagination/Pagination';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Preloader from './Components/Preloader/Preloader';

function App() {

  const [loadingEntrance, setLoadingEntrance] = useState(true);
  // Animación entrada
  useEffect(() => {
    setTimeout(() => {
      setLoadingEntrance(false);
    }, 114000)
  }, []);

  const [posts, setPosts] = useState<TypedPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage/* , setPostsPerPage */] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      setLoadingEntrance(false);
    }, 4000)
    getPosts().then(
      (res: any) => {
        setLoading(true);
        setPosts(res);
        setLoading(false);
        console.log(res);
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
            : <Route path="/" element={<Posts posts={currentPosts} loading={loading} error={error} />}></Route>
          }
          <Route path="/" element={<PaginationComponent postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />}>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
