package com.backend.scent.service;

import com.backend.scent.dto.ScentDTO;
import com.backend.scent.entity.Scent;
import com.backend.scent.repository.ScentRepository;
import com.backend.subscribeproduct.dto.SbProductDTO;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ScentServiceImpl implements ScentService{

    private final ScentRepository scentRepository;

    @Override
    public List<ScentDTO> scentlist(String scentNote){
        List<Scent> scents;
        if (scentNote.equals("all")) {
            scents = scentRepository.findAll();
        } else {
            scents = scentRepository.findScentByScentNoteName(scentNote);
        }
        return scents.stream().map(
                scent -> {
                    return ScentDTO.of(scent);
                }).collect(Collectors.toList());
    }
}
