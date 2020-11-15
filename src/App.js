import { useEffect, useState } from "react";
import queryString from "query-string";
import "./App.scss";
import Pagination from "./components/Pagination";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import PostFilterForm from "./components/PostFilterForm";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Frontend!" },
    { id: 2, title: "We love Frontend!" },
    { id: 3, title: "They love Frontend!" },
  ]);

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: "",
  });

  const [pagination, setPagination] = useState({
    _limit: 10,
    _page: 1,
    _totalRows: 100,
  });

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;

    // clone new list
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handlePageChange(newPage) {
    setFilters({
      ...pagination,
      _page: newPage,
    });
  }

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestURL = `https://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();

        const { data, pagination } = responseJSON;
        setTodoList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handleFiltersChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  return (
    <div className="app">
      <h1>React hooks - TodoList</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      <PostFilterForm onSubmit={handleFiltersChange} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
