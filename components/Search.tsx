const Search = (props) => {
  return (
    <div className="find-movies">
      <p>
        Find Movies, TV series and much more
      </p>
      <form onSubmit={props.onSubmit}>
        <input name="query" placeholder="Enter the Name" onChange={props.onChange} />
      </form>
    </div>
  )
};
export default Search;
