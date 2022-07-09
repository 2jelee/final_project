import React, {useEffect, useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import ListStyle from '../../../styles/ListStyle';
import {Header, Row, EtcButton} from '../../admin/EmpTableStyle';

function InnerRow({row, month}) {
    const [open, setOpen] = React.useState(false);
    console.log(row)

    return (
        <>
            <Row>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.empno}</TableCell>
                <TableCell>{row.empName}</TableCell>
                {month === null ?
                    <>
                        <TableCell>{15 - row.remainDay}</TableCell>
                        <TableCell>{row.remainDay}</TableCell>
                        <TableCell>{120 - row.remainHour}</TableCell>
                        <TableCell>{row.remainHour}</TableCell>
                    </> : <TableCell>{(row.count / month).toFixed(2)}</TableCell>
                }
            </Row>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit style={{paddingLeft: '20%'}}>
                        <Box sx={{ margin: 1 }}>
                            <h3 style={{"marginLeft":"10px", "textAlign":"initial"}}>
                                상세 이력
                            </h3>
                            <Table size="small" aria-label="detail-history">
                                <TableHead>
                                    {month ?
                                        <TableRow>
                                            <TableCell>날짜</TableCell>
                                            <TableCell>근태구분</TableCell>
                                            <TableCell>출근시간</TableCell>
                                            <TableCell>퇴근시간</TableCell>
                                        </TableRow> :
                                        <TableRow>
                                            <TableCell>연차구분</TableCell>
                                            <TableCell>시작 날짜</TableCell>
                                            <TableCell>종료 날짜</TableCell>
                                        </TableRow>
                                    }

                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <Row>
                                            {month === null ? null : <TableCell>{historyRow.date}</TableCell>}
                                            <TableCell>
                                                <EtcButton className={`${historyRow.etc}`}>{historyRow.etc}</EtcButton>
                                            </TableCell>
                                            <TableCell>{historyRow.start}</TableCell>
                                            <TableCell>{historyRow.end}</TableCell>
                                        </Row>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const CollapseList = (props) => {
    const rows = [];
    const [rows2, setrows] = useState([]);
    const state = props.state;
    console.log(state);
    let tmp = true;

    let month;
    state !== "attendanceProblem" ? month = null : month = new Date().getMonth();

    async function attendanceProblem(){
        const response = await axios.get("http://localhost:8080/report/list");
        response.data.map((item) => {
            rows.map((i) => {
                if (i.empno === item.empno) {
                    tmp = false;
                    i.count = i.count+1;
                    i.history.push({date: item.date, etc: item.etc, start: item.start, end: item.end});
                }
            })
            if(tmp) {
                rows.push({
                    empno: item.empno, empName: item.empName, count:1,
                    history: [{date: item.date, etc: item.etc, start: item.start, end: item.end}]
                });
            }
            tmp = true;
        })
        setrows(rows);
    }

    async function dVacationHistory () {
        const response = await axios.get("http://localhost:8080/report/dvacation");
        setrows(state);
        state.map((item) => {
            item.history = [];
            response.data.map((i) => {
                if(i.empno === item.empno){
                    item.history.push({etc: i.etc, start: i.start, end: i.end})
                }
            })
        })
    }

    useEffect(( ) => {
        if (rows2.length === 0) {
            if(state === "attendanceProblem") attendanceProblem();
            else dVacationHistory();
        }
    }, [rows2]);

    return (
        <ListStyle>
        {rows2.length !== 0 ? <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <Header>
                        <TableCell style={{"width":"10%"}}/>
                        {state !== "attendanceProblem" ? <>
                            <TableCell>사번</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>사용 연차</TableCell>
                            <TableCell>남은 연차</TableCell>
                            <TableCell>사용 시간</TableCell>
                            <TableCell>남은 시간</TableCell>
                            </> : <>
                            <TableCell style={{width:'30%'}}>사번</TableCell>
                            <TableCell style={{width:'30%'}}>이름</TableCell>
                            <TableCell style={{width:'30%'}}>평균</TableCell>
                        </>
                        }
                    </Header>
                </TableHead>
                <TableBody>
                    {rows2.map((row) => (
                        <InnerRow key={row.empName} row={row} month={month}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <h1>loading</h1>}
        </ListStyle>)
}

export default CollapseList;