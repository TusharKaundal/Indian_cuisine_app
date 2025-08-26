export const generatePageNumber = (currentPage, totalPages, blockSize = 5) => {
    const currentBlock = Math.floor((currentPage - 1) / blockSize);
    const start = currentBlock * blockSize + 1;
    const end = Math.min(start + blockSize, totalPages + 1);
    return Array.from({ length: end - start }, (_, i) => start + i);
};

export const getPaginateData = (data, page, limit) => {
    const startPage = (page - 1) * limit;
    const endPage = startPage + limit;
    return data.slice(startPage, endPage);
};
  