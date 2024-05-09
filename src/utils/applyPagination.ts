export const applyPagination = (documents: any, page: any, rowsPerPage: any) => {
    if (rowsPerPage === -1) {
        return documents;
    } else {
        return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
}
