import { PostList } from "./components/PostList/PostList";

function App() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Lista de publicaciones</h1>
      <PostList />
    </div>
  );
}

export default App;
