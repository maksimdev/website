import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rootCard: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function () {
  const [isAuth, setAuth] = useState(false);
  const [reg, setReg] = useState(false);
  const classes = useStyles();

  const createCard = (title) => (
    <Card className={classes.rootCard}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          be
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setReg(!reg)}>{reg ? 'Вход' : 'Регистрация'}</Button>
        {/* <Button size="small" onClick={() => setReg(!reg)}>{reg ? 'Зарегистрироваться' : 'Войти'}</Button> */}
      </CardActions>
    </Card>
  );

  const getRegistration = () => {
    return createCard('Регистрация');

  };

  const getLogin = () => {
    return createCard('Вход');
  };

  const getPage = () => reg ? getRegistration() : getLogin();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ height: '80vh' }}
      >
        <Grid item align="center" xs={3}>
          {getPage()} 
        </Grid>
      </Grid>
    </div>
  );
}