import { Pagination } from '../types';
/**
 * @typedef PaginationProps
 * @type {Object}
 * @property {number} page: The page number.
 * @property {number} perPage: The number of item per page.
 * @property {function} setPage: Set the page number
 * @property {function} setPerPage: Set the per page number
 * @property {function} setPagination: Set page and perPage pagination numbers
 */
interface PaginationProps {
    page: number;
    perPage: number;
    pagination: Pagination;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    setPagination: (pagination: Pagination) => void;
}
declare const _default: (initialPagination?: {
    perPage?: number;
    page?: number;
}) => PaginationProps;
/**
 * Hooks to provide pagination state (apge and perPage)
 *
 * @example
 *
 * const { page, setpage, perPage, setPerPage } = usePagination(initialPerPage);
 *
 * @param {number} initialPagination the initial value per page
 * @returns {PaginationProps} The pagination props
 */
export default _default;
