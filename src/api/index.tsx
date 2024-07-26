import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

let headers: any = {
    "Content-Type": "application/json",
};

export const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
        ...headers,
    },
});

export const resetPassword = async (token: string, email: string, password: string) => {
    const response = await apiClient.post(`/reset-password`, {
        token,
        email,
        password,
    });
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await apiClient.post(`/forgot-password`, {
        email,
    });
};
export const logout = async () => {
    await apiClient.delete(`/logout`)
};

export const getQueryData = async (state: any) => {
    const [name, query, orderBy, order, page, perPage] = state?.queryKey

    let url = query ? `/${name}?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&search=${query}` :
        `/${name}?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}`
    const { data } = await apiClient.get(url);
    return data
};

export const getClientNotes = async (state: any) => {
    const [name, query, orderBy, order, page, perPage, clientId] = state?.queryKey
    let url = `/${name}/${clientId}/notes?perPage=${perPage}&page=${page}&order=${order}&orderBy=${orderBy}&search=${query}`
    const { data } = await apiClient.get(url);
    return data
};

export const getClientNote = async (state: any) => {
    const [name, clientId, noteId] = state?.queryKey
    let url = `/${name}/${clientId}/notes/${noteId}`
    const { data } = await apiClient.get(url);
    return data
};

export const bookAppointment = async ({ data }: any) => {
    return await apiClient.post(`/next/book-appointment`, data);
};

export const checkAppointmentAvailablity = async ({ data }: any) => {
    const res = await apiClient.get(`/next/check-appointment-availablity`);
    return res.data
};

export const appointmentStatusChange = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/book-appointments/${id}/status`,
        {
            status,
        });
};

export const deleteAppointment = async (data: any) => {
    const { id } = data
    await apiClient.delete(`/book-appointments/${id}`)
};

export const paymentForBookAppointment = async (data: any) => {
    const { id } = data
    await apiClient.post(`/book-appointments/send-payment/${id}`)
};


export const updateAppointment = async (data: any) => {
    const { id } = data
    await apiClient.patch(`/book-appointments/${id}`, data)
};

export const showAppointment = async (data: any) => {
    const id = data.queryKey[1]
    const res = await apiClient.get(`/book-appointments/${id}`)
    return res.data
};
export const fetchPaymentIntent = async ({ amt, cur, refId, cusId }: any) => {
    const response = await apiClient.get(`/create-stripe-intent?amt=${amt}&cur=${cur}&refId=${refId}&cusId=${cusId}`);
    return response.data;
};
export const paymentSuccess = async ({ refId, cusId, paymentId }: any) => {
    const response = await apiClient.get(`/payment-success?paymentId=${paymentId}&refId=${refId}&cusId=${cusId}`);
    return response.data;
};

export const cancePaymentIntent = async ({ id }: any) => {
    const response = await apiClient.get(`/cancel-stripe-intent?payment_intent=${id}`);
    return response.data;
};

export const getSingeQueryData = async (data: any) => {
    const [name, query, sortby, order, page, perPage, id] = data?.queryKey

    const url = query ? `/${name}/${id}/agents?perPage=${perPage}&page=${page}&order=${order}&search=${query}` :
        `/${name}/${id}/agents?perPage=${perPage}&page=${page}&order=${order}&orderBy=${sortby}`

    const response = await apiClient.get(url);
    return response.data;
};

export const toggleIsActive = async (data: any) => {
    const response = await apiClient.post(`/user-status-change`, data);
    return response?.data
};

export const getList = async (data: any) => {
    const [name] = data?.queryKey
    return await apiClient.get(`/${name}`);
};

export const showQueryData = async (data: any) => {
    const [name, id] = data?.queryKey
    return await apiClient.get(`/${name}/${id}`);
};

export const deleteById = async ({ name, id }: any) => {
    const response = await apiClient.delete(`/${name}/${id}`);
    return response
};

export const userRegisterForm = async (value: any) => {
    const { route, state } = value
    return await apiClient.post(`/${route}`, state);
}

export const searchUser = async (data: any) => {
    const [query] = data?.queryKey
    const response = await apiClient.get(`/user-list?search=${query}`);
    return response
};

export const userActiveStatusChange = async (id: number, status: boolean) => {
    const response = await apiClient.post(`/user-status-change`,
        {
            id,
            status,
        });
    return response;
};

export const userStatusChange = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/user-status-change/${id}`,
        {
            status,
        });
};

export const userCanPublishChange = async (data: any) => {
    const { id, status } = data
    await apiClient.post(`/user-can-publish/${id}`,
        {
            status,
        });
};

apiClient.interceptors.response.use(
    function (response) {
        const { status, data } = response;
        if (status == 201 || status == 200) {
            toast.success(data?.message, { autoClose: 3000 });
        }
        if (status == 205) {
            toast.success(data?.message, { autoClose: 3000 });
        }
        return response;
    },
    function (error) {
        const { status, data } = error.response;
        if (status == 400 || status == 403 || status == 404 || status == 409) {
            toast.error(data.message, { autoClose: 3500 });
        }
        if (status == 401) {
            deleteCookie("access_token");
            deleteCookie("role");
            window.location.reload();
        }
        if (status == 500) {
            toast.error("Server Error!", { autoClose: 2500 });
        }
        if (status == 413) {
            toast.error("File size large!", { autoClose: 2500 });
        }
        if (status == 422) {
            toast.error("Please fill form !", { autoClose: 2500 });
        }
        return Promise.reject(error);
    }
);

export const getQuery = async (data: any) => {
    const [name, id] = data?.queryKey
    const response = await apiClient.get(`/${name}/${id}`);
    return response?.data
};
export const showById = async ({ name, id }: any) => {
    const response = await apiClient.get(`/${name}/${id}`);
    return response
};
export const postQuery = async (value: any) => {
    const { route, data } = value
    const response = await apiClient.post(`/${route}`, data);
    return response
};
export const addClient = async (data: any) => {

    const { id } = data
    // const formData: any = new FormData()
    // if (data.profile_image) {
    //     const keys = Object.keys(data?.profile_image);
    //     keys.forEach((key) => {
    //         formData.append(`profile_image`, data.profile_image[key])
    //     });
    // }
    let url = `/clients`
    const { username, email, active, phone, dob } = data
    if (id) {
        url = `/clients/${id}`
        const response = await apiClient.patch(url, { username, email, active, phone, dob }, {});
        return response.data
    } else {

    }

};

export const addClientNote = async (data: any) => {
    const { clientId, noteId, name, note } = data

    const formData: any = new FormData()
    let url = `/clients/${clientId}/notes`
    if (noteId) {
        url = `/clients/${clientId}/notes/${noteId}`
        const response = await apiClient.patch(url, { note, name });
        return response.data
    } else {
        const response = await apiClient.post(url, { note, name });
        return response.data
    }
};
export const deleteClientNote = async ({ clientId, noteId }: any) => {
    await apiClient.delete(`/clients/${clientId}/notes/${noteId}`);
};
export const sendContact = async (data: {
    name: string;
    email: string;
    phone: string | number;
    subject: string;
    message: string;
}) => {
    const response = await apiClient.post(`/next/contact-form-send-mail`, data);
    return response;
};

export const siteVisited = async (data: any) => {
    await apiClient.post(`/next/site-visit-count`, data);
};

apiClient.interceptors.request.use(async (config: any) => {
    if (config.method == 'delete') {
        let modal = Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ea432e6',
            cancelButtonColor: '#9F1853',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        })
        const { isConfirmed, dismiss } = await modal;
        if (isConfirmed) {
            return config
        }
    } else {
        return config
    }
}, (error) => {
    console.log(error, 'error')
    return Promise.reject(error)
})

