package com.example.final_project.controller;

import com.example.final_project.dto.EmpUpdateDto;
import com.example.final_project.dto.ProfileDto;
import com.example.final_project.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // 사원 정보 조회
    @GetMapping("/profile/{empno}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable String empno){
        ProfileDto profileDto = profileService.getProfile(empno);
        return ResponseEntity.ok().body(profileDto);
    }

    // 비밀번호 변경
    @PostMapping("/profile/updatePwd")
    public ResponseEntity updatePwd(@RequestBody EmpUpdateDto empUpdateDto) {
        profileService.updatePwd(empUpdateDto);
        return ResponseEntity.ok().build();
    }

    // 프로필 사진 변경
    @PostMapping("/profile/updateImg")
    public ResponseEntity updateProfile(@RequestBody EmpUpdateDto empUpdateDto){
        profileService.updateProfile(empUpdateDto);
        return ResponseEntity.ok().build();
    }
}
