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
import NavBar from "./components/NavBar/NavBar";
import PhotoList from "./components/PhotoList/PhotoList";
import styles from "./components/PhotoList/PhotoList.module.css";
import PagePagination from "./components/PagePagination"
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  const [perPage, setPerPage] = useState(12);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=e8a7f5fd9748f2567214440d10611b4a&format=json&nojsoncallback=true",
     
    })
      .then((res) => {
        if (res.status === 200) {
          //console.log("data", res)
          setPhotos(res?.data?.photos);
          setTotalResults(res?.data?.photos?.total);
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

  // const indexOfLast = currentPage * perPage;
  // const indexOfFirst = indexOfLast - perPage;
  //const current = photos.slice(indexOfFirst, indexOfLast);
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(photos?.photo.length / perPage); i++) {
  //   pageNumbers.push(i);
  // }

  // const renderPageNumbers = pageNumbers.map((number) => {
  //   return (
  //     <span 
  //       key={number}
  //       id= {number}
  //       onClick = {(e) => setCurrentPage(Number(e.target.id))}
  //       className = {styles.paginate}
  //     >
  //       {number}&nbsp;
  //     </span>
  //   )
  // })

  const nextPage = (pageNumber) => {
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

  const numberPages = Math.floor(totalResults / 50);
   
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
      {totalResults > 20 ? <PagePagination pages={numberPages} nextPage={nextPage} currentPage={currentPage} /> : '' }
    </React.Fragment>
  );
}

export default App;
