import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CropFree from '@material-ui/icons/CropFree';
import Save from '@material-ui/icons/Save';
import Search from '@material-ui/icons/Search';
import GetApp from '@material-ui/icons/GetApp';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScanningQR from './Stages/ScanningQR';
import SearchingBill from './Stages/SearchingBill';
import GettingBill from './Stages/GettingBill';
import SavingBill from './Stages/SavingBill';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CropFree />,
    2: <Search />,
    3: <GetApp />,
    4: <Save />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Считывние QR-кода', 'Поиск чека', 'Загрузка чека', 'Сохранение чека'];
}

export default function CustomStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [ requisites, setRequisites ] = useState({});

  const requesitesSuccess = (data) => {
    setRequisites(data);
    handleNext();
  }

  const [ bill, setBill ] = useState({});
  const steps = getSteps();

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ScanningQR setData={requesitesSuccess} />;
      case 1:
        return <SearchingBill requisites={requisites}/>;
      case 2:
        return <GettingBill />;
      case 3:
        return <SavingBill />;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Back
            </Button>
            {getStepContent(activeStep)}
          </div>
        )}
      </div>
    </div>
  );
}


/*
<div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
             */