//import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, 
  Grid, 
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Button, 
  AppBar, 
  Toolbar, 
  InputBase, 
  Typography 
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PhotoList from "./components/PhotoList/PhotoList";
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  root2: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginLeft: '2rem'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const [photos, setPhotos] = useState();
  const classes = useStyles();
  const [inputUser, setInputUser] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=e8a7f5fd9748f2567214440d10611b4a&format=json&nojsoncallback=true`,
     
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("data", res)
          setPhotos(res?.data?.photos);
          setTotalPages(res?.data?.photos?.pages);
         // setTotalResults(res?.data?.photos?.total);
        }
      })
      .catch((err) => {
        console.log("errornya", err);
      });
  }, []);

  console.log("photos", photos && photos)

  const search = () => {
    axios({
      method: "GET",
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e8a7f5fd9748f2567214440d10611b4a&tags=${inputUser}&format=json&nojsoncallback=true`,
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("data search", res)
          setPhotos(res?.data?.photos);
          setInputUser('');
          setTotalPages(res?.data?.photos?.pages);
        }
      })
      .catch((err) => {
        console.log("errornya", err);
    });
  };

  const handleChange = (e) => {
    setInputUser(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUser) {
      search();
    }
  }

  const pageSearch = (event, pageNumber) => {
    axios({
      method: "GET",
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e8a7f5fd9748f2567214440d10611b4a&tags=${inputUser}&format=json&nojsoncallback=true&page=${pageNumber}`,
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("data search", res)
          setPhotos(res?.data?.photos);
          setCurrentPage(pageNumber)
        }
      })
      .catch((err) => {
        console.log("errornya", err);
    });
  };

  const onChange = (event, pageNumber) => {
    if (inputUser) {
      pageSearch();
    } else {
      axios({
        method: "GET",
        url: `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=e8a7f5fd9748f2567214440d10611b4a&format=json&nojsoncallback=true&page=${pageNumber}`,
      })
        .then((res) => {
          if (res.status === 200) {
            //console.log("data search", res)
            setPhotos(res?.data?.photos);
            setCurrentPage(pageNumber)
          }
        })
        .catch((err) => {
          console.log("errornya", err);
      });
    }
  }

  //const numberPages = Math.floor(totalResults / 100);
   
  return (
    
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                  Photo Gallery
                </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form onSubmit= {handleSubmit}>
                  <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      value= {inputUser}
                      onChange={handleChange}
                    />
                </form>
              </div>
            </Toolbar>
        </AppBar>
      </div>
      <PhotoList photos={photos} />
      <div className={classes.root2}>
        <Pagination count={totalPages} page={currentPage} onChange={onChange} color="secondary" />
      </div>
      {/* {totalResults > 10 ? <PagePagination pages={numberPages} nextPage={nextPage} currentPage={currentPage} /> : '' } */}
      {/* { photos ? <Paginate totalPages={totalPages} /> : '' } */}
    </React.Fragment>
  );
}

export default App;
