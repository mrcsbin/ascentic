package com.backend.scent.controller;

import com.backend.scent.dto.ScentDTO;
import com.backend.scent.service.ScentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/scent")
public class ScentController {

    private final ScentServiceImpl scentService;

    @GetMapping("/list/{scentNote}")
    public List<ScentDTO> scentDTOList(@PathVariable("scentNote") String scentNote){
        return scentService.scentlist(scentNote);
    }
}
