type IOptions = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: string;

}
const paginationSortingHelper = (options: IOptions) => {
    console.log(options);
    return options
}
export default paginationSortingHelper;