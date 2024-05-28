import axios from "axios";

export const generateAccessToken = async () => {
    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
        method: "post",
        data: "grant_type=client_credentials",
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET_KEY
        }
    });

    return response.data.access_token;
};

export const createOrder = async (items, amount, return_url, cancel_url) => {
    const accessToken = await generateAccessToken();

    const response = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    items: items,
                    amount: amount
                }
            ],
            application_context: {
                return_url,
                cancel_url,
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW"
            }
        })
    });

    console.log(response.data)

    return response.data.links.find(item => item.rel === "approve").href;
};