package com.backend.order.dto.admin;

import com.backend.orderproduct.entity.OrderProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminOrderProdDto {
    private Integer prodNum; // 상품번호
    private String prodName; // 상품명
    private String optionName; // 옵션명
    private Integer prodPrice; // 금액
    private Integer prodCount; // 구매수량
    private String prodImgName; // 상품이미지
    private String orderState; // 주문 상태

    public static AdminOrderProdDto of(OrderProduct orderProduct) {
        return new AdminOrderProdDto(orderProduct.getOrderProdNum(),
                orderProduct.getProductOption().getProduct().getProdName(),
                orderProduct.getProductOption().getProdOption(),
                orderProduct.getProductOption().getProdPrice(),
                orderProduct.getProdCount(),
                orderProduct.getProductOption().getProduct().getImageSaveNameList().get((0)),
                orderProduct.getOrderState());
    }
}
