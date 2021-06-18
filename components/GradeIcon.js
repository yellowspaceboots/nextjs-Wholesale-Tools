import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  iconRoot: props => ({
    height: 100,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderRadius: '10%',
    margin: 6,
    padding: 10,
    border: `solid 4px ${props.color}`
  }),
  iconTitle: props => ({
    backgroundColor: props.isLate ? theme.palette.error.dark : 'grey',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    width: 'calc(100% + 2px)',
    padding: 4,
    marginTop: -2,
    color: 'whitesmoke',
    fontWeight: 'bold'
  }),
  iconBody: props => ({
    color: props.color
  }),
  winText: {
    color: theme.palette.success.main,
    position: 'absolute',
    left: 24,
    top: 4,
    fontWeight: 'bold'
  },
  lossText: {
    color: theme.palette.error.dark,
    position: 'absolute',
    left: 4,
    top: 22,
    fontWeight: 'bold',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)'
  },
  totalText: {
    position: 'absolute',
    right: 24,
    bottom: 0,
    fontWeight: 'bold'
  }
}))

const GradeIcon = ({ letterGrade, percentageGrade, counts }) => {
  const classes = useStyles({ color: letterGrade.color })
  const ambientBorder = `solid 2px ${letterGrade.color}`
  return (
    <div style={{ position: 'relative', padding: 22, textTransform: 'uppercase' }}>
      <Typography variant='caption' className={classes.winText}>Wins: {counts.won}</Typography>
      <Typography variant='caption' className={classes.lossText}>Losses: {counts.lost}</Typography>
      <div style={{ position: 'relative', padding: 1 }}>
        <div style={{ position: 'absolute', right: 0, bottom: 0, borderRight: ambientBorder, borderBottom: ambientBorder, borderRadius: '10%', height: 80, width: 85 }} />
        <div style={{ position: 'absolute', left: 0, top: 0, borderLeft: ambientBorder, borderTop: ambientBorder, borderRadius: '10%', height: 80, width: 85 }} />
        <div className={classes.iconRoot}>
          <Typography variant='h3' className={classes.iconBody}>{letterGrade.letter}</Typography>
          <Typography variant='subtitle2' className={classes.iconBody}>{parseFloat(percentageGrade).toFixed(0)}%</Typography>
        </div>
      </div>
      <Typography variant='caption' className={classes.totalText}>Open: {counts.open}</Typography>
    </div>
  )
}

export default GradeIcon
