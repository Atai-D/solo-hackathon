import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    width: "45vw",
    background: "rgb(0,0,0,0.2)",
  },
  media: {
    height: "25vw",
  },
  title1: {
      fontFamily: "Nunito",
      fontWeight: "bold",
      fontSize: "2vw",
      color: "#fff"
  },
  description: {
    fontFamily: "Nunito",
    fontSize: "1.2vw",
    color: "#fff",
    fontWeight: "bold",
  }
});

export default function ImageCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + '/assets/bishkek1.jpeg'}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography 
          gutterBottom variant="h5" 
          component="h1" 
          className={classes.title1}>
            About Bishkek
          </Typography>
          <Typography 
          variant="body2" 
          color="textSecondary" 
          component="p"
          className={classes.description}
          >
        Bishkek, the capital of Kyrgyzstan, borders Central Asia's Tian Shan range. It’s a gateway to the Kyrgyz Ala-Too mountains and Ala Archa National Park, with glaciers and wildlife trails. The city’s arts scene encompasses the monumental State Museum of Fine Arts and the colonnaded Opera and Ballet Theater. The vast, central Ala-Too Square features the Manas monument, honoring the hero of the Kyrgyz Epic of Manas.

          </Typography>
        </CardContent>
      </CardActionArea>
       
    </Card>
    
  );
}