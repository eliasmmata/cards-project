import React, { useEffect, useState } from 'react'
import TypedPosts from './Types/Posts.type';
import { getPosts } from './Api/Api';
import Posts from './Components/Posts';

// ESTOS ESTILOS TIENEN QUE ESTAR LO ULTIMO
import './index.scss';
import './scss/App.scss';
import PaginationComponent from './Components/Pagination/Pagination';

function App() {

  const [posts, setPosts] = useState<TypedPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage/* , setPostsPerPage */] = useState(10);

  useEffect(() => {
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
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber)

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Posts posts={currentPosts} loading={loading} error={error} />
      <PaginationComponent postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
