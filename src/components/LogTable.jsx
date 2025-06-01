import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

const columns = [
  { id: 'pid', label: 'Job ID', minWidth: 80 },
  { 
    id: 'description', 
    label: 'Description', 
    minWidth: 250 
  },
  {
    id: 'start',
    label: 'Start',
    minWidth: 170
  },
  {
    id: 'end',
    label: 'End',
    minWidth: 170
  },
  {
    id: 'duration',
    label: 'Duration',
    minWidth: 170
  },
    {
        id: 'indicator',
        label: 'Indicator',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(time, description, status, jobId) {
    console.log('Creating data row:', { time, description, status, jobId });
    // Using a static map to track start times for each jobId
    if (!createData.jobMap) {
        createData.jobMap = {};
    }
    const jobMap = createData.jobMap;

    let pid = jobId;
    let start = '';
    let end = '';
    let duration = '';
    let indicator = null;

    if (status === ' START') {
        jobMap[pid] = time; // store start time for this job
        console.log(`Job ${pid} started at ${time}, storing in jobMap.Returning null.`);
        return null;
    } else if (status === ' END') {
        start = jobMap[pid] || '';
        end = time;
        // Parse start and end times (HH:MM:SS) to seconds
        function toSeconds(t) {
            if (!t) return 0;
            const [h = 0, m = 0, s = 0] = t.split(':').map(Number);
            return h * 3600 + m * 60 + s;
        }
        if (start && end) {
            console.log(`Calculating duration for job ${pid}: start=${start}, end=${end}`);
            const diff = Math.abs(toSeconds(end) - toSeconds(start));
            const min = Math.floor(diff / 60);
            const sec = diff % 60;
            duration = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
            if (diff >= 600) {
                status = 'error';
                indicator = (
                    <Box display="flex" alignItems="center" color="error.main">
                        <CancelIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="error.main">{status}</Typography>
                    </Box>
                );
            } else if (diff >= 300) {
                status = 'warning';
                indicator = (
                    <Box display="flex" alignItems="center" color="warning.main">
                        <WarningAmberIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="warning.main">{status}</Typography>
                    </Box>
                );
            } else {
                status = 'ok';
                indicator = (
                    <Box display="flex" alignItems="center" color="success.main">
                        <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="success.main">{status}</Typography>
                    </Box>
                );
            }
        }
        console.log(`Row created for job ${pid}:`, { pid, description, start, end, duration, indicator });
        return { pid, description, start, end, duration, indicator, status };
    }
    return null;
}

export default function StickyHeadTable({ logData = [] }) {
    const [logRows, setLogRows] = useState([]);

    React.useEffect(() => {
        function parseLogLines(logData) {
            // Reset jobMap for each parse
            createData.jobMap = {};
            const rows = [];
            for (const line of logData) {
                const [time, description, status, jobId] = line.split(',');
                const row = createData(time, description, status, jobId);
                if (row) rows.push(row);
            }
            setLogRows(rows);
        }
        parseLogLines(logData);
    }, [logData]);

    function DownloadReport(event) {
        event.preventDefault();
        const headers = columns.map(col => col.label);
        let report = headers.join(', ') + '\n';
        logRows.forEach(logRow => {
            console.log('Adding row to report:', logRow);
            report += logRow.pid + ', ' + logRow.description + ', ' + logRow.start + ', ' + logRow.end + ', ' + logRow.duration + ', ' + logRow.status + '\n';
        });
        const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'log_report.csv');
    }

    return (
        <Paper
            sx={{
                maxWidth: 'calc(100vw - 2rem)',
                margin: 2,
                overflow: 'hidden',
                boxShadow: 3
            }}
        >
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{
                                        bgcolor: '#3A86FF',
                                        color: '#fff',
                                        borderColor: '#fff',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logRows.map((row, idx) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.pid + '-' + idx}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant='contained'
                tabIndex={-1}
                startIcon={<CloudDownloadIcon />}
                onClick={DownloadReport}
                sx={{
                    margin: 2,
                    bgcolor: '#3A86FF',
                    color: '#fff',
                    '&:hover': {
                        bgcolor: '#2D5BBF',
                    },
                }}
            >
                Download Report File
            </Button>
        </Paper>
    );
}