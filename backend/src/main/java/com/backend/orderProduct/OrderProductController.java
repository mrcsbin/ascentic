package com.backend.orderProduct;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class OrderProductController {
    private final OrderProductService orderProductService;

    @PostMapping("/finishorderprod")
    public OrderProduct insertOrderProduct(@RequestParam("orderId")Integer orderId,
                                           @RequestParam("optionNum") Integer optionNum, OrderProduct orderProduct) {
        return orderProductService.insetOrderProduct(orderId, optionNum, orderProduct);

    }
}
