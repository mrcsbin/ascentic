package com.backend.taste;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
//통합 테스트 용도로 사용됨
//@SpringBootApplication을 찾아가 하위의 모든 Bean을 스캔하여 로드함
//그 후 Test용 Application Context를 만들어 Bean을 추가하고, MockBean을 찾아 교체
public class TasteServiceTest {
    @Autowired
    private TasteService tasteService;

    @Test
    void tasteResProgress() {
        TasteDTO tasteDTO = TasteDTO.builder()
                .tasteAgree(true)
                .tasteName("김!!")
                .tasteGender("male")
                .tasteAge(25)
                .tasteTest1(1)
                .tasteTest2(2)
                .tasteTest3(1)
                .tasteTest4(2)
                .tasteTest5(1)
                .build();

        String result = String.valueOf(tasteService.tasteResProgress(tasteDTO));

        assertEquals(result, "Woody");
    }

    @Test
    void tasteResProgress2() {
        TasteDTO tasteDTO = TasteDTO.builder()
                .tasteAgree(true)
                .tasteName("김!!")
                .tasteGender("male")
                .tasteAge(25)
                .tasteTest1(2)
                .tasteTest2(1)
                .tasteTest3(3)
                .tasteTest4(1)
                .tasteTest5(2)
                .build();

        String result = String.valueOf(tasteService.tasteResProgress(tasteDTO));

        assertEquals(result, "Woody");
    }

    @Test
    void getTestResult() {
        TasteResultDTO result = tasteService.getTestResult();

        TasteResultDTO Actual = TasteResultDTO.builder()
                .firstPlace("Citrus")
                .secondPlace("Animal")
                .thirdPlace("Mossy")
                .build();

        assertEquals(result, Actual);
    }
}
