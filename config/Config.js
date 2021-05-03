
import React from "react";
import Cookies from "js-cookie";

import Api from "./Api";

import { hideBanner, showBanner } from "../components/Banner";

export const courierDeliveryPrice = 700;
export const courierPaymentPrice = 200;
export const mailPaymentPrice = 300;

export function getTotalPrice(price, discount, saleDiscount, deliveryType, paymentType) {
    var total = 0;

    total += price;
    total += discount;
    total += saleDiscount;

    if (deliveryType === "courier" && price <= 10000) total += courierDeliveryPrice;
    if (deliveryType === "courier" && paymentType === "cash") total += courierPaymentPrice;
    if (deliveryType === "mail") total += mailPaymentPrice;

    return total;
}

export const redirect = (location, path) => {
    hideBanner();
}

export const showTransition = () => {
    var transition = document.getElementById("transition");

    transition.style.display = "flex";
    transition.style.transition = "none";
    transition.style.opacity = "1";
}

export const hideTransition = () => {
    var transiton = document.getElementById("transition");

    setTimeout(() => {
        transition.style.transition = "opacity 200ms";
        transition.style.opacity = "0";
        setTimeout(() => {
            transition.style.display = "none";
        }, 210);
    }, 1000);
}

export function removeStorageItem(name) {
    Cookies.remove(name);
}

export function getStorageItem(name) {
    if (!Cookies.get(name)) return null;
    
    return JSON.parse(Cookies.get(name));
}

export function setStorageItem(name, data) {
    Cookies.set(name, JSON.stringify(data));
}

export function isLogged() {
    if (getStorageItem("token")) {
        return true;
    }

    return false;
}

export function logout() {
    removeStorageItem("token");
}

export function addToCart(id) {
    var cart = getStorageItem("cart");

    cart.push(id);

    setStorageItem("cart", cart);
}

export function removeFromCart(id) {
    var cart = getStorageItem("cart");

    for (let i = 0; i < cart.length; i++) {
        if (cart[i] === id) {
            cart.splice(i, 1);
            setStorageItem("cart", cart);
            return;
        }
    }
}

export const diopterValues = () => {
    var values = [ "-" ];

    const start = -6.00;
    const end = 6.00;
    const interval = 0.25;

    for (let i = start; i <= end; i += interval) {
        values.push(i)
    }

    return values;
}

export const cylinderValues = () => {
    var values = [ "-" ];

    const start = -3.00;
    const end = 3.00;
    const interval = 0.25;

    for (let i = start; i <=end; i += interval) {
        values.push(i)
    }

    return values;
}

export const cylinderAxisValues = () => {
    var values = [ "-" ];

    const start = 0;
    const end = 180;
    const interval = 1;

    for (let i = start; i <= end; i += interval) {
        values.push(i)
    }

    return values;
}

export const distanceValues = () => {
    var values = [ "-" ];

    const start = 25;
    const end = 38;
    const interval = 0.5;

    for (let i = start; i <= end; i += interval) {
        values.push(i)
    }

    return values;
}