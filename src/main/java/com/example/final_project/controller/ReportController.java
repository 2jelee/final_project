package com.example.final_project.controller;

import com.example.final_project.dto.ChartListDto;
import com.example.final_project.dto.ReportDto;
import com.example.final_project.mapper.ReportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportMapper reportMapper;

    @GetMapping("/report")
    public ResponseEntity<?> Report(@RequestParam("empno") String empno) {
        System.out.println(empno);
        LocalDate date = LocalDate.now();

        List<ReportDto> Attendancereport = reportMapper.findAttendance(empno);

        List<ReportDto> DeptMemberList = reportMapper.findAllDeptMemberList(empno);

        List<ReportDto> DayWorkList = reportMapper.findDayWork(empno, String.valueOf(date));

        List<ReportDto> DeptAttendance = reportMapper.findAllDeptAttendance();

        Attendancereport.addAll(DeptMemberList);
        Attendancereport.addAll(DayWorkList);
        Attendancereport.addAll(DeptAttendance);

        return ResponseEntity.ok().body(Attendancereport);
    }

    @GetMapping("/report/list")
    public ResponseEntity<List<ChartListDto>> attendanceProblemList(){

        List<ChartListDto> dto = reportMapper.findAttendanceProblem("01");
        return ResponseEntity.ok().body(dto);
    }
}