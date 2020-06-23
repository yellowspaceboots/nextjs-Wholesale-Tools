import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { motion } from 'framer-motion'
import GradeIcon from './GradeIcon'
import InternalLink from './InternalLink'

const CustomerReportCard = ({ customer }) => {
  return (
    <Grid item>
      <motion.div whileHover={{ y: -10 }}>
        <Button
          href='/'
          as='/'
          component={InternalLink}
          onClick={(e) => e.stopPropagation()}
          style={{ borderRadius: '20px', display: 'flex', alignItems: 'flex-start' }}
        >
          <Grid
            item
            container
            direction='column'
            alignItems='center'
            justify='flex-start'
            spacing={1}
            style={{
              width: 180,
              paddingBottom: 5
            }}
          >
            <Grid item>
              <GradeIcon letterGrade={customer.letterGrade} percentageGrade={customer.percentageGrade === 10 ? 0 : customer.percentageGrade * 100} counts={customer.counts} />
            </Grid>
            <Typography variant='caption' color='textSecondary'>{customer.salesName}</Typography>
            <Grid item>
              <Typography variant='body2' color='textSecondary' align='center' style={{ textTransform: 'none', fontWeight: 'bold' }}>{customer.customerName}</Typography>
            </Grid>
          </Grid>
        </Button>
      </motion.div>
    </Grid>
  )
}

export default CustomerReportCard
