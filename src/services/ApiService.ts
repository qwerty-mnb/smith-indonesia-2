import type { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./JwtService";
import type { AxiosResponse, AxiosRequestConfig } from "axios";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;
  /**
   * @description initialize vue axios
   */
  public static init(app: App<any>) {
    const rootDomain = window.location.hostname.split('.').reverse().splice(0, 2).reverse().join('.');
    const axiosIns = axios.create({
      withCredentials: true,
      baseURL: import.meta.env.DEV ? String(import.meta.env.VITE_APP_API) : `https://api.${rootDomain}`,
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Gomo: import.meta.env.DEV ? "development" : "production",
      },
    });
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axiosIns);

    // Pre approved POST Request
    const approvedPOST = ["/auth/login", "/auth/register"];

    // Intercept Request and Add CSRF Token
    axiosIns.interceptors.request.use(async (req) => {

      if (["POST", "PUT", "PATCH", "DELETE"].includes(String(req.method).toUpperCase()) && !approvedPOST.includes(String(req.url))) {
        const csrfToken = await axiosIns.get("/auth/c").then(res => res.data);
        req.headers["x-csrf-token"] = csrfToken;
      }
      return req;
    });

    // Intercept Response Message
    /* axiosIns.interceptors.response.use(res => {

      const accessDenied = ["ACCESS_DENIED", "ACCESS_DENIED_2", "ACCESS_DENIED_3", "ACCESS_DENIED_4"];

      if (res.config.url !== "/v" && accessDenied.includes(res.data)) {
        window.location.href = "/";
      }

      return res;
    })  */
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params).catch((error) => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}`).catch((error) => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: AxiosRequestConfig): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the PATCH HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.patch(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource, params).catch((error) => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
}

export default ApiService;
