package com.microservices.cartservice.controller;

import com.microservices.cartservice.dto.Product;
import com.microservices.cartservice.entity.Cart;
import com.microservices.cartservice.service.CartService;

import org.springframework.web.bind.annotation.*;

@RestController
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // GET PRODUCT
    @GetMapping("/cart/product/{id}")
    public Product getProduct(@PathVariable int id) {

        return cartService.getProductById(id);
    }

    // ADD TO CART
    @PostMapping("/cart")
    public String addToCart(@RequestBody Cart cart) {

        return cartService.addToCart(cart);
    }
}