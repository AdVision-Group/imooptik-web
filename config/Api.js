import React from "react";

export const API_URL = "https://coronashop.store:8080";

export default class Api extends React.Component {

    static async subscribeToNewsletter(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify(data);
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/contact/newsletter/subscribe", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async login(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/auth/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async register(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/auth/register", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async confirmRegister(secret) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify({
            registerSecret: secret
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/auth/confirm", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async editUser(data, token) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("auth-token", token);

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "PATCH",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/user/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async changePassword(data, token) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("auth-token", token);

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/user/password", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async tempUser(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify(data);
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/tempUser", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getTempUser(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/tempUser/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async profile(token) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("auth-token", token);
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/user/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async forgotPassword(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        //headers.append("auth-token", token);

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/auth/forgot", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async calendars() {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/booking/calendars", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async calendar(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/booking/calendars/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async bookings() {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/booking/bookings", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async booking(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/booking/bookings/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getValidTimes(id, data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify(data);
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/booking/calendars/" + id + "/dayInfo", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async createReservation(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        //headers.append("auth-token", token);

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/booking/userBookings", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getProducts(filters) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify(filters);
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/products/filter", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getDistinctProducts(filters) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify(filters);
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/products/filter/distinct", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getProduct(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/products/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getLenses(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify(data);
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/lenses/filter", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getLens(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/lenses/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async createCombinedProduct(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/combinedProducts", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getCombinedProduct(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/combinedProducts/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getBlogs(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        const body = JSON.stringify(data);

        var requestOptions = {
            method: "POST",
            headers: headers,
            body: body,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/blogs/filter", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getBlog(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/blogs/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getCoupon(code) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/coupons/" + code, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getOrder(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/orders/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async createOrder(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify({
            ...data
        });
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/orders", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async createPayment(orderId, data) {
        return fetch(API_URL + "/api/payments/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                orderId: orderId,
                ...data
            })
        })
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(error => {
            return error;
        });
    }

    static async sendMessage(data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");

        var raw = JSON.stringify(data);
        
        var requestOptions = {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/contact/form", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getImage(id) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/images/" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }

    static async getBrands(type) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Origin", "*");
        
        var requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        };
        
        return fetch(API_URL + "/api/store/products/" + type + "/filters", requestOptions)
            .then(response => response.json())
            .then(result => {
                return result;
            })
            .catch(error => {
                return error;
            });
    }
}