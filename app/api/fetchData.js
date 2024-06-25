export const fetchTodoList = async () => {
  try {
    const response = await fetch(
      "https://gorest.co.in/public/v2/users/6940135/todos?page=1&per_page=100",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Pagination-Limit": 100,
          Authorization:
            "Bearer b983d32020827112aaaeb8065fe3eb0a21e82fd379111b09c5adaec78c4af5aa",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
