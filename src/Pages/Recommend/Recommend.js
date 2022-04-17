import {
    Button,
    createMuiTheme,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
  } from "@material-ui/core";
  import "./Recommend.css";
  import SearchIcon from "@material-ui/icons/Search";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import CustomPagination from "../../components/Pagination/CustomPagination";
  import SingleContent from "../../components/SingleContent/SingleContent";
  
  const Search = () => {
    const [type, setType] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
  
    const darkTheme = createMuiTheme({
      palette: {
        type: "light",
        primary: {
          main: "#000",
        },
      },
    });

    const fetchSearch_2 = async (newData) => {
      try {
        const movie=[];
        for (let i = 0; i < newData.length; i++) {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${'d88ecc16f4fc5990147391570a6592c8'}&language=en-US&query=${newData[i]}&page=${page}&include_adult=false`
          );
          movie.push(data.results[0]); 
        }
        setContent(movie);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSearch_1 = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/recms/${searchText}`
        );
        fetchSearch_2(data["rec_movie"]);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      window.scroll(0, 0);
      fetchSearch_1();  
      // eslint-disable-next-line
    }, [type, page]);
  
    return (
      <div>
        <ThemeProvider theme={darkTheme}>
          <div className="search">
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch_1}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
                Recommend
              {/* <SearchIcon fontSize="large" /> */}
            </Button>
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
          >
            {/* <Tab style={{ width: "50%" }} label="Search Movies" /> */}
            {/* <Tab style={{ width: "50%" }} label="Search TV Series" /> */}
          </Tabs>
        </ThemeProvider>
        <div className="trending">
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {searchText &&
            !content &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
        </div>
        {/* {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} /> */}
        {/* )} */}
      </div>
    );
  };
  
  export default Search;
  