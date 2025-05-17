import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => {
        if (response.data) {
          const { token } = response.data;
          if (token) {
            // Guardar el token en localStorage
            localStorage.setItem("token", token);
          }
        }

        return response; // Devolver la respuesta sin modificarla
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 🚀 Interceptor para incluir el token en todas las solicitudes
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token && config.headers) {
          config.headers.set("Authorization", `Bearer ${token}`);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, {
      ...config,
      headers: { ...config?.headers },
    });
  }

  async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const isFormData = data instanceof FormData;
    return this.instance.post<T>(url, data, {
      ...config,
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        ...config?.headers,
      },
    });
  }

  async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, {
      ...config,
      headers: { ...config?.headers },
    });
  }

  async patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, {
      ...config,
      headers: { ...config?.headers },
    });
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, {
      ...config,
      headers: { ...config?.headers },
    });
  }
}

const httpClient = new HttpClient(import.meta.env.VITE_API_URL); // Replace with your API base URL

export default httpClient;
