import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

function LogImport ({ onLogFileParsed }) {
  
  const handleFile = file => {
    const reader = new FileReader()
    reader.onload = e => {
      const text = e.target.result
      // Split into lines and filter out empty lines
      const lines = text.split(/\r?\n/).filter(Boolean)
      onLogFileParsed(lines)
    }
    reader.readAsText(file)
  }

  const handleDrop = event => {
    console.log('File dropped:', event.dataTransfer.files)
    event.preventDefault()
    event.stopPropagation()
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleDragOver = event => {
    console.log('Drag over:', event.dataTransfer.files)
    event.preventDefault()
    event.stopPropagation()
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleInputChange = event => {
    console.log('File input changed:', event.target.files)
    const files = event.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: 2,
        backgroundColor: 'white'
      }}
    >
      <Card
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #e5e5e5',
          boxShadow: '8',
          background: 'white',
          m: 2
        }}
      >
        <CardActionArea
          sx={{
            height: '100%',
            '&[data-active]': {
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: 'action.selectedHover'
              }
            },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
          }}
        >
          <Box
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              border: '2px dotted #8d99ae',
              borderRadius: 2,
              p: 4,
              m: 2,
              minHeight: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <svg
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                cx='24'
                cy='24'
                r='20'
                stroke='#8d99ae'
                strokeWidth='2'
                strokeDasharray='4 4'
                fill='none'
              />
              <line
                x1='24'
                y1='16'
                x2='24'
                y2='32'
                stroke='#8d99ae'
                strokeWidth='2.5'
                strokeLinecap='round'
              />
              <line
                x1='16'
                y1='24'
                x2='32'
                y2='24'
                stroke='#8d99ae'
                strokeWidth='2.5'
                strokeLinecap='round'
              />
            </svg>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              align='center'
            >
              Drop your log file here
            </Typography>
          </Box>
        </CardActionArea>
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
          }}
        >
          <Typography variant='h5' component='div' align='center'>
            Drag and Drop Log File Here
          </Typography>
          <Typography variant='body2' color='text.secondary' align='center'>
            Or browse to select a file
          </Typography>
          <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Browse Files
            <VisuallyHiddenInput
              type='file'
              onChange={handleInputChange}
              multiple = {false}
              accept='.log,.txt,.csv'
            />
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LogImport
