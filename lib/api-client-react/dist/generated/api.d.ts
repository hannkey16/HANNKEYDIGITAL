import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { HealthStatus, ListOrdersByEmailParams, OrderInput, OrderListResponse, OrderResponse, OrderUpdate, PaymentCreateInput, PaymentCreateResponse, PaymentStatusResponse, PromoInput, PromoResponse, WebhookInput, WebhookResponse } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateOrderUrl: () => string;
/**
 * @summary Create a new order
 */
export declare const createOrder: (orderInput: OrderInput, options?: Parameters<typeof customFetch>[1]) => Promise<OrderResponse>;
export declare const getCreateOrderMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<OrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<OrderInput>;
}, TContext>;
export type CreateOrderMutationResult = NonNullable<Awaited<ReturnType<typeof createOrder>>>;
export type CreateOrderMutationBody = BodyType<OrderInput>;
export type CreateOrderMutationError = ErrorType<void>;
/**
* @summary Create a new order
*/
export declare const useCreateOrder: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<OrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<OrderInput>;
}, TContext>;
export declare const getListOrdersByEmailUrl: (params: ListOrdersByEmailParams) => string;
/**
 * @summary List orders by customer email
 */
export declare const listOrdersByEmail: (params: ListOrdersByEmailParams, options?: Parameters<typeof customFetch>[1]) => Promise<OrderListResponse>;
export declare const getListOrdersByEmailQueryKey: (params?: ListOrdersByEmailParams) => readonly ["/api/orders", ...ListOrdersByEmailParams[]];
export declare const getListOrdersByEmailQueryOptions: <TData = Awaited<ReturnType<typeof listOrdersByEmail>>, TError = ErrorType<unknown>>(params: ListOrdersByEmailParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrdersByEmail>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listOrdersByEmail>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListOrdersByEmailQueryResult = NonNullable<Awaited<ReturnType<typeof listOrdersByEmail>>>;
export type ListOrdersByEmailQueryError = ErrorType<unknown>;
/**
 * @summary List orders by customer email
 */
export declare function useListOrdersByEmail<TData = Awaited<ReturnType<typeof listOrdersByEmail>>, TError = ErrorType<unknown>>(params: ListOrdersByEmailParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listOrdersByEmail>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetOrderUrl: (id: string) => string;
/**
 * @summary Get a single order
 */
export declare const getOrder: (id: string, options?: Parameters<typeof customFetch>[1]) => Promise<OrderResponse>;
export declare const getGetOrderQueryKey: (id: string) => readonly [`/api/orders/${string}`];
export declare const getGetOrderQueryOptions: <TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<void>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetOrderQueryResult = NonNullable<Awaited<ReturnType<typeof getOrder>>>;
export type GetOrderQueryError = ErrorType<void>;
/**
 * @summary Get a single order
 */
export declare function useGetOrder<TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<void>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateOrderUrl: (id: string) => string;
/**
 * @summary Update order fields
 */
export declare const updateOrder: (id: string, orderUpdate: OrderUpdate, options?: Parameters<typeof customFetch>[1]) => Promise<OrderResponse>;
export declare const getUpdateOrderMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateOrder>>, TError, {
        id: string;
        data: BodyType<OrderUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateOrder>>, TError, {
    id: string;
    data: BodyType<OrderUpdate>;
}, TContext>;
export type UpdateOrderMutationResult = NonNullable<Awaited<ReturnType<typeof updateOrder>>>;
export type UpdateOrderMutationBody = BodyType<OrderUpdate>;
export type UpdateOrderMutationError = ErrorType<unknown>;
/**
* @summary Update order fields
*/
export declare const useUpdateOrder: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateOrder>>, TError, {
        id: string;
        data: BodyType<OrderUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateOrder>>, TError, {
    id: string;
    data: BodyType<OrderUpdate>;
}, TContext>;
export declare const getCreatePaymentUrl: () => string;
/**
 * @summary Create a payment transaction for an order
 */
export declare const createPayment: (paymentCreateInput: PaymentCreateInput, options?: Parameters<typeof customFetch>[1]) => Promise<PaymentCreateResponse>;
export declare const getCreatePaymentMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPayment>>, TError, {
        data: BodyType<PaymentCreateInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createPayment>>, TError, {
    data: BodyType<PaymentCreateInput>;
}, TContext>;
export type CreatePaymentMutationResult = NonNullable<Awaited<ReturnType<typeof createPayment>>>;
export type CreatePaymentMutationBody = BodyType<PaymentCreateInput>;
export type CreatePaymentMutationError = ErrorType<void>;
/**
* @summary Create a payment transaction for an order
*/
export declare const useCreatePayment: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPayment>>, TError, {
        data: BodyType<PaymentCreateInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createPayment>>, TError, {
    data: BodyType<PaymentCreateInput>;
}, TContext>;
export declare const getGetPaymentStatusUrl: (orderId: string) => string;
/**
 * @summary Get payment status for an order
 */
export declare const getPaymentStatus: (orderId: string, options?: Parameters<typeof customFetch>[1]) => Promise<PaymentStatusResponse>;
export declare const getGetPaymentStatusQueryKey: (orderId: string) => readonly [`/api/payment/status/${string}`];
export declare const getGetPaymentStatusQueryOptions: <TData = Awaited<ReturnType<typeof getPaymentStatus>>, TError = ErrorType<void>>(orderId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPaymentStatus>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPaymentStatus>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPaymentStatusQueryResult = NonNullable<Awaited<ReturnType<typeof getPaymentStatus>>>;
export type GetPaymentStatusQueryError = ErrorType<void>;
/**
 * @summary Get payment status for an order
 */
export declare function useGetPaymentStatus<TData = Awaited<ReturnType<typeof getPaymentStatus>>, TError = ErrorType<void>>(orderId: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPaymentStatus>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getHandlePaymentWebhookUrl: () => string;
/**
 * @summary Pakasir payment webhook
 */
export declare const handlePaymentWebhook: (webhookInput: WebhookInput, options?: Parameters<typeof customFetch>[1]) => Promise<WebhookResponse>;
export declare const getHandlePaymentWebhookMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof handlePaymentWebhook>>, TError, {
        data: BodyType<WebhookInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof handlePaymentWebhook>>, TError, {
    data: BodyType<WebhookInput>;
}, TContext>;
export type HandlePaymentWebhookMutationResult = NonNullable<Awaited<ReturnType<typeof handlePaymentWebhook>>>;
export type HandlePaymentWebhookMutationBody = BodyType<WebhookInput>;
export type HandlePaymentWebhookMutationError = ErrorType<unknown>;
/**
* @summary Pakasir payment webhook
*/
export declare const useHandlePaymentWebhook: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof handlePaymentWebhook>>, TError, {
        data: BodyType<WebhookInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof handlePaymentWebhook>>, TError, {
    data: BodyType<WebhookInput>;
}, TContext>;
export declare const getValidatePromoUrl: () => string;
/**
 * @summary Validate a promo code
 */
export declare const validatePromo: (promoInput: PromoInput, options?: Parameters<typeof customFetch>[1]) => Promise<PromoResponse>;
export declare const getValidatePromoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof validatePromo>>, TError, {
        data: BodyType<PromoInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof validatePromo>>, TError, {
    data: BodyType<PromoInput>;
}, TContext>;
export type ValidatePromoMutationResult = NonNullable<Awaited<ReturnType<typeof validatePromo>>>;
export type ValidatePromoMutationBody = BodyType<PromoInput>;
export type ValidatePromoMutationError = ErrorType<unknown>;
/**
* @summary Validate a promo code
*/
export declare const useValidatePromo: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof validatePromo>>, TError, {
        data: BodyType<PromoInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof validatePromo>>, TError, {
    data: BodyType<PromoInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map