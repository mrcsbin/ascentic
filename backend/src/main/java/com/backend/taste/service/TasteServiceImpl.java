package com.backend.taste.service;

import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.taste.entity.Taste;
import com.backend.taste.dto.TasteDTO;
import com.backend.taste.repository.TasteRepository;
import com.backend.taste.dto.TasteResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class TasteServiceImpl implements TasteService {
    public static final int TASTE_TEST_RESULT_LENGTH = 9;
    private final TasteRepository tasteRepository;

    @Override
    public TasteResultDTO tasteResProgress(TasteDTO tasteDTO) {
        // 테스트 코드를 위해서 임시로 memberId 설정
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
//        String currentMemberId = "kka12345";
        int[] countRes = findTestCheck(tasteDTO.getTasteTest1(), tasteDTO.getTasteTest2(), tasteDTO.getTasteTest3(), tasteDTO.getTasteTest4(), tasteDTO.getTasteTest5());
        List<String> result = findTestRes(countRes);
        String firstPlace = result.get(0);
        String secondPlace = result.get(1);
        String thirdPlace = result.get(2);


        if (currentMemberId == null) {
            return TasteResultDTO.builder()
                    .firstPlace("null")
                    .secondPlace("null")
                    .thirdPlace("null")
                    .build();
        }

        Taste taste = Taste.builder()
                .memberId(currentMemberId)
                .tasteAgree(tasteDTO.getTasteAgree())
                .tasteGender(tasteDTO.getTasteGender())
                .tasteAge(tasteDTO.getTasteAge())
                .tasteTest1(tasteDTO.getTasteTest1())
                .tasteTest2(tasteDTO.getTasteTest2())
                .tasteTest3(tasteDTO.getTasteTest3())
                .tasteTest4(tasteDTO.getTasteTest4())
                .tasteTest5(tasteDTO.getTasteTest5())
                .firstPlace(firstPlace)
                .secondPlace(secondPlace)
                .thirdPlace(thirdPlace)
                .build();

        Taste tasteRes = tasteRepository.save(taste);
        return TasteResultDTO.builder()
                .firstPlace(tasteRes.getFirstPlace())
                .secondPlace(tasteRes.getSecondPlace())
                .thirdPlace(tasteRes.getThirdPlace())
                .build();

    }

    @Override
    public TasteResultDTO getTestResult() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
//        String currentMemberId = "kka12345";

        return getTasteResultDTO(currentMemberId);
    }

    @Override
    public TasteResultDTO adminMemberTestResult(String memberId) {
        return getTasteResultDTO(memberId);
    }

    private TasteResultDTO getTasteResultDTO(String memberId) {
        Optional<Taste> findTaste = tasteRepository.findLastByMemberId(memberId);

        if (!findTaste.isPresent()) {
            return TasteResultDTO.builder()
                    .firstPlace("null")
                    .secondPlace("null")
                    .thirdPlace("null")
                    .build();
        } else {
            return TasteResultDTO.builder()
                    .firstPlace(findTaste.get().getFirstPlace())
                    .secondPlace(findTaste.get().getSecondPlace())
                    .thirdPlace(findTaste.get().getThirdPlace())
                    .build();
        }
    }

    private int[] findTestCheck(Integer test1, Integer test2, Integer test3, Integer test4, Integer test5) {
        int[] resCounts = new int[TASTE_TEST_RESULT_LENGTH];

        if (test1 == 1) { // 도시 선택(나무, 이끼, 파우더, 스파이시)
            resCounts[1]++;
            resCounts[2]++;
            resCounts[7]++;
            resCounts[8]++;
        } else if (test1 == 2) { // 자연 선택(애니멀, 꽃, 과일, 풀, 상큼)
            resCounts[0]++;
            resCounts[3]++;
            resCounts[4]++;
            resCounts[5]++;
            resCounts[6]++;
        }

        if (test2 == 1) { // 우아함(나무,애니멀,꽃)
            resCounts[1]++;
            resCounts[0]++;
            resCounts[3]++;
        } else if (test2 == 2) { // 시원함(이끼/스파이시/파우더)
            resCounts[4]++;
            resCounts[8]++;
            resCounts[7]++;
        } else if (test2 == 3) { // 발랄함(풀,상큼,과일)
            resCounts[2]++;
            resCounts[5]++;
            resCounts[6]++;
        }

        if (test3 == 1) { // 인상을 남길 수 있는 향(꽃,스파이시,풀,과일,나무)  ?
            resCounts[3]++;
            resCounts[8]++;
            resCounts[2]++;
            resCounts[6]++;
            resCounts[1]++;
        } else if (test3 == 2) { // 차분하고 부드러운 향(애니멀,이끼,상큼,파우더
            resCounts[0]++;
            resCounts[4]++;
            resCounts[5]++;
            resCounts[7]++;
        }

        if (test4 == 1) { // 본능형(상큼,스파이시,이끼)
            resCounts[5]++;
            resCounts[8]++;
            resCounts[4]++;
        } else if (test4 == 2) { // 감정형(애니멀,파우더,나무)
            resCounts[0]++;
            resCounts[7]++;
            resCounts[1]++;
        } else if (test4 == 3) { // 사고형(꽃,풀,과일)
            resCounts[3]++;
            resCounts[2]++;
            resCounts[6]++;
        }

        if (test5 == 1) { // 물(파우더)  ?
            resCounts[7] -= 5;
        } else if (test5 == 2) { // 풀
            resCounts[2] -= 5;
        } else if (test5 == 3) { // 시나몬, 스파이시
            resCounts[8] -= 5;
        } else if (test5 == 4) { // 과일
            resCounts[6] -= 5;
        } else if (test5 == 5) { // 남자스킨향,이끼
            resCounts[4] -= 5;
        }

        return resCounts;
    }

    private List<String> findTestRes(int[] resCounts) {
        String[] scentRes = {"Animal", "Woody", "Herbal&Green", "Floral", "Mossy", "Citrus", "Fruity", "Watery&Powdery", "Special"};

        return Arrays.stream(scentRes)
                .sorted(Comparator.comparingInt(s -> -resCounts[Arrays.asList(scentRes).indexOf(s)]))
                .collect(Collectors.toList());
    }
}
