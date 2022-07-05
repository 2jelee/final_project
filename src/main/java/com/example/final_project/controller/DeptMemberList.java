package com.example.final_project.controller;

import com.example.final_project.dto.DeptMemberListDto;
import com.example.final_project.mapper.DeptMemberListMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class DeptMemberList {

    private final DeptMemberListMapper deptMemberMapper;


    @GetMapping("/deptmember")
    public ResponseEntity<?> deptMemberList(@RequestParam("empno") String empno) {
        System.out.println(empno);

        List<DeptMemberListDto> deptMemberList = deptMemberMapper.findDeptMemberList(empno);
        System.out.println(deptMemberList);

        return ResponseEntity.ok().body(deptMemberList);
    }
}