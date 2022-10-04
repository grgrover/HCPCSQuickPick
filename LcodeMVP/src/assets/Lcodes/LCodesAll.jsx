import React, { useEffect } from 'react';
import Select from '@mui/material/Select';
import { styled } from "@mui/material";
import PartialFoot from './PartialFoot.jsx'
import Grid from '@mui/material/Grid';
import Symes from './Symes.jsx'
import BelowKnee from './BelowKnee.jsx'
import AK from './AK.jsx';
import KD from './KD.jsx';
import HD from './HD';
import Endoskeletal from './Endoskeletal.jsx'
import IPOPEPOP from './IPOPEPOP.jsx'
import PrepSupply from './PrepSupply.jsx'
import EndoskeletalAdditions from './EndoskeletalAdditions.jsx'
import TestSocketAdditions from './TestSocketAdditions.jsx'
import Sockets from './Sockets.jsx'
import Suspension from './Suspension.jsx'
import ReplacementSockets from './ReplacementSockets.jsx'
import ProtectiveCovers from './ProtectiveCovers.jsx'
import EndoskeletalKnees from './EndoskeletalKnees.jsx'
import Vacuum from './Vacuum.jsx'
import ExoAdditions from './ExoAdditions.jsx'
import AnkleFootAdditions from './AnkleFootAdditions.jsx'
import EndoKneeAdditions from './ExoKneeAdditions.jsx'
import GasketSocks from './GasketSocks.jsx'

const LCodesAll = ({ lCodes, levelL, levelR, control }) => {
  var key = {
    'HD': 0,
    'AK': 1,
    'KD': 2,
    'BK': 3,
    'Symes': 4,
    'PF': 5
  }
  var showLevels = [];

  levelL === null ? showLevels[0] = '' : showLevels[0] = key[levelL]
  levelR === null ? showLevels[1] = '' : showLevels[1] = key[levelR]





  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          {showLevels.indexOf(5) > -1 &&
            <PartialFoot lCodes={lCodes}  control={control} />}
          {showLevels.indexOf(3) > -1 &&
            <BelowKnee lCodes={lCodes}  control={control} />}
          {showLevels.indexOf(1) > -1 &&
            <AK lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1) &&
            <Endoskeletal lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1) &&
            <PrepSupply lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1) &&
            <TestSocketAdditions lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1) &&
            <ReplacementSockets lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1) && <ProtectiveCovers lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1) &&
            <Vacuum lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1) &&
            <AnkleFootAdditions lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1 || showLevels.indexOf(5) > -1) &&
            <GasketSocks lCodes={lCodes}  control={control} />}
        </Grid>
        <Grid item xs={6}>
          {showLevels.indexOf(4) > -1 && <Symes lCodes={lCodes}  control={control} />}
          {showLevels.indexOf(2) > -1 && <KD lCodes={lCodes}  control={control} />}
          {showLevels.indexOf(0) > -1 && <HD lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1) && <IPOPEPOP lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1) && <EndoskeletalAdditions lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1) && <Sockets lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1) && <Suspension lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1) && <EndoskeletalKnees lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1) && <ExoAdditions lCodes={lCodes}  control={control} />}
          {(showLevels.indexOf(0) > -1 || showLevels.indexOf(1) > -1 || showLevels.indexOf(2) > -1 || showLevels.indexOf(3) > -1 || showLevels.indexOf(4) > -1) && <EndoKneeAdditions lCodes={lCodes}  control={control} />}
        </Grid>
      </Grid>
    </>
  )
}

export default LCodesAll;